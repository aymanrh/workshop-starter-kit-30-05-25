# Architecture Research

**Domain:** Focused freelancer productivity web app for three work streams and outreach tracking
**Researched:** 2026-04-30
**Confidence:** MEDIUM

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                            Product Shell                              │
│  Navigation: Today / Streams A-B-C / Outreach / Blockers / People     │
├──────────────────────────────────────────────────────────────────────┤
│                              Views                                    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│  │ Today Focus  │ │ Stream View  │ │ Outreach     │ │ Delegation   │ │
│  │ unified list │ │ A/B/C work   │ │ effort types │ │ follow-ups   │ │
│  └──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘ │
├─────────┴────────────────┴────────────────┴────────────────┴────────┤
│                         Domain Modules                                │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│  │ Work Items   │ │ Outreach     │ │ Blockers     │ │ Collaboration│ │
│  │ lifecycle    │ │ efforts      │ │ resolution   │ │ delegation   │ │
│  └──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘ │
├─────────┴────────────────┴────────────────┴────────────────┴────────┤
│                         Shared Services                               │
│  Status policy | Next-action scoring | Filtering | Validation | Audit │
├──────────────────────────────────────────────────────────────────────┤
│                           Data Layer                                  │
│  WorkRecord | StreamProfile | OutreachEffort | Blocker | Person       │
│  Assignment | ActivityEvent | ViewPreference                         │
└──────────────────────────────────────────────────────────────────────┘
```

The app should be organized as a small modular monolith: one deployable application, one coherent data store, and domain modules with clear boundaries. Splitting streams, outreach, blockers, and delegation into separate services would create coordination cost before the product has enough scale or validation to justify it.

The key architectural decision is to model every actionable thing as a `WorkRecord` with shared lifecycle fields, then attach type-specific detail for stream work or outreach. This supports the core value: one unified picture of what needs attention next.

### Component Responsibilities

| Component | Responsibility | Boundary |
|-----------|----------------|----------|
| Product Shell | Owns navigation, layout, global filters, and selected workspace/date context. | Does not mutate domain data directly; calls view/domain actions. |
| Today Focus View | Shows cross-domain next actions, overdue items, blocked items, and follow-ups. | Read-heavy aggregation over records; no separate data model. |
| Stream View | Presents stream A, B, or C with work items, deadlines, blockers, and next actions. | Can create stream work only under one of the three fixed stream keys. |
| Outreach View | Presents outreach efforts grouped by effort type or option, not pipeline stage. | Owns outreach-specific fields, but uses shared status and blocker rules. |
| Blocker Center | Lists active blockers, affected records, resolution notes, and unblocking actions. | Blockers reference records; blockers are not duplicated into task descriptions. |
| Delegation View | Tracks owners, collaborators, delegated assignees, handoff notes, and follow-up needs. | People/assignments are shared across streams and outreach. |
| Work Item Module | Owns stream work item creation, editing, lifecycle transitions, due dates, next action, and priority. | Cannot create outreach-specific data. |
| Outreach Module | Owns effort type, channel/option, target/context notes, cadence, and outcome. | Cannot behave like a CRM stage board. |
| Status Policy | Defines allowed statuses and terminal behavior. | Shared by stream work and outreach efforts. |
| Blocker Module | Owns blocker lifecycle, affected record links, resolution notes, and reopened blockers. | Does not own the parent record lifecycle except computed `isBlocked`. |
| Collaboration Module | Owns people, owners, collaborators, delegation state, handoff notes, and follow-up dates. | Does not own work content or outreach content. |
| Activity/Audit Module | Records status changes, assignment changes, blocker changes, and major note updates. | Append-only event history; not the source of current state for v1. |

## Recommended Domain Model

### Core Entities

| Entity | Purpose | Important Fields |
|--------|---------|------------------|
| `WorkRecord` | Shared actionable record for both stream work and outreach. | `id`, `kind`, `title`, `status`, `priority`, `dueAt`, `nextAction`, `ownerId`, `createdAt`, `updatedAt`, `closedAt`, `cancelledAt` |
| `StreamProfile` | Fixed stream definitions. | `key: A/B/C`, `name`, `description`, `sortOrder`, `color` |
| `StreamWorkDetail` | Stream-specific extension for a work record. | `recordId`, `streamKey`, `deliverable`, `clientContext`, `deadlineConfidence` |
| `OutreachEffortDetail` | Outreach-specific extension for a work record. | `recordId`, `effortType`, `channel`, `targetContext`, `plannedTouchCount`, `actualTouchCount`, `outcome` |
| `Blocker` | A blocker that can affect one or more records. | `id`, `title`, `status`, `severity`, `ownerId`, `resolutionNote`, `resolvedAt` |
| `RecordBlockerLink` | Many-to-many link between records and blockers. | `recordId`, `blockerId`, `impactNote`, `createdAt`, `clearedAt` |
| `Person` | Collaborator, delegate, client contact, or the freelancer. | `id`, `name`, `role`, `contactHint`, `isSelf` |
| `Assignment` | Ownership and delegation relationship. | `recordId`, `ownerId`, `delegateId`, `collaboratorIds`, `handoffNote`, `followUpAt`, `followUpNeeded` |
| `ActivityEvent` | Timeline of meaningful changes. | `entityType`, `entityId`, `eventType`, `actorId`, `from`, `to`, `note`, `createdAt` |

Use a flat, normalized shape for records, blockers, people, and assignments. Current React guidance favors state that avoids contradictions, duplication, and deep nesting; that same principle applies to the persisted app model. Blocker state should be represented once in `Blocker` plus links, not repeated as strings across records.

### Status Model

Use one shared status enum for actionable records:

| Status | Meaning | Terminal |
|--------|---------|----------|
| `active` | Work can move now. | No |
| `waiting` | Waiting for another person, date, or input but not blocked. | No |
| `blocked` | Progress is stopped by an explicit blocker. | No |
| `closed` | Finished or intentionally completed. | Yes |
| `cancelled` | Intentionally abandoned, declined, duplicate, or no longer relevant. | Yes |

Keep `closed` and `cancelled` distinct. Jira and Linear both separate workflow status from completion/resolution concepts, and Linear's default flow explicitly includes Done and Canceled categories. For this project, the distinction matters because outreach can be cancelled without being successful, and work can close without implying a sales or delivery win.

Derived flags should stay derived:

```typescript
type WorkStatus = "active" | "waiting" | "blocked" | "closed" | "cancelled";
type WorkKind = "stream_work" | "outreach_effort";
type StreamKey = "A" | "B" | "C";

type WorkRecord = {
  id: string;
  kind: WorkKind;
  title: string;
  status: WorkStatus;
  priority: "low" | "normal" | "high";
  dueAt?: string;
  nextAction?: string;
  ownerId: string;
  closedAt?: string;
  cancelledAt?: string;
};

const isTerminal = (record: WorkRecord) =>
  record.status === "closed" || record.status === "cancelled";
```

## Recommended Project Structure

This assumes a TypeScript web app, but the boundaries apply to any stack.

```
src/
├── app/                         # Routes, layouts, server/client composition
│   ├── today/                   # Unified next-action and attention view
│   ├── streams/[streamKey]/      # A/B/C stream views
│   ├── outreach/                # Outreach effort views
│   ├── blockers/                # Blocker center
│   └── people/                  # Collaborator/delegate management
├── domains/
│   ├── records/                 # Shared WorkRecord lifecycle, queries, validation
│   ├── streams/                 # Stream-specific rules and detail forms
│   ├── outreach/                # Outreach types, options, outcomes
│   ├── blockers/                # Blocker lifecycle and record links
│   ├── collaboration/           # People, assignment, delegation, follow-ups
│   └── activity/                # Audit/event history
├── components/
│   ├── record-list/             # Shared list/table/cards for work records
│   ├── status-control/          # Status picker and transition affordances
│   ├── blocker-panel/           # Embedded blocker summary and editor
│   └── assignment-panel/        # Owner/collaborator/delegate controls
├── services/
│   ├── nextAction.ts            # Attention scoring and unified view projection
│   ├── statusPolicy.ts          # Transition rules and terminal-state checks
│   └── filters.ts               # Shared filter/sort/group utilities
├── data/
│   ├── schema.ts                # Database schema or persistence types
│   ├── repositories/            # Query/mutation persistence adapters
│   └── seed.ts                  # Initial A/B/C streams and examples
└── tests/
    ├── domains/                 # Domain policy tests
    └── flows/                   # User workflow tests
```

### Structure Rationale

- **`domains/records`:** Centralizes lifecycle behavior so stream work and outreach do not drift into incompatible status systems.
- **`domains/streams`:** Keeps the exactly-three-stream constraint explicit and easy to enforce.
- **`domains/outreach`:** Protects the product decision that outreach is grouped by effort type/option, not CRM stages.
- **`domains/blockers`:** Makes blockers reusable across work and outreach, with resolution notes and links instead of duplicated text.
- **`domains/collaboration`:** Keeps people, ownership, and delegation separate from work content, which is important when one person owns a record while another is delegated a part of it.
- **`services/nextAction.ts`:** Gives the unified attention view one place to compute what matters next.

## Architectural Patterns

### Pattern 1: Shared Record With Domain-Specific Detail

**What:** Store common lifecycle fields in `WorkRecord`, then attach either `StreamWorkDetail` or `OutreachEffortDetail`.

**When to use:** Use for anything that appears in the unified next-action view and needs status, blockers, owner, due date, or next action.

**Trade-offs:** This adds one layer of indirection, but it prevents duplicated status, blocker, and delegation logic.

```typescript
type StreamWork = WorkRecord & {
  kind: "stream_work";
  detail: StreamWorkDetail;
};

type OutreachEffort = WorkRecord & {
  kind: "outreach_effort";
  detail: OutreachEffortDetail;
};
```

### Pattern 2: Explicit Status Transitions

**What:** Status changes go through a policy function instead of arbitrary field edits.

**When to use:** Use for `active`, `waiting`, `blocked`, `closed`, and `cancelled` changes.

**Trade-offs:** Slightly more ceremony, but it prevents impossible states such as `status = closed` with unresolved required blocker resolution workflow.

```typescript
function transitionRecord(
  record: WorkRecord,
  nextStatus: WorkStatus,
  context: { resolutionNote?: string; activeBlockerCount: number }
) {
  if (record.status === "closed" || record.status === "cancelled") {
    throw new Error("Terminal records must be reopened before editing status.");
  }

  if (nextStatus === "closed" && context.activeBlockerCount > 0) {
    throw new Error("Resolve or clear blockers before closing.");
  }

  return {
    ...record,
    status: nextStatus,
    closedAt: nextStatus === "closed" ? new Date().toISOString() : record.closedAt,
    cancelledAt: nextStatus === "cancelled" ? new Date().toISOString() : record.cancelledAt,
  };
}
```

### Pattern 3: Blockers as Linked Entities

**What:** A blocker is its own entity and links to affected records.

**When to use:** Use whenever a blocker has a cause, owner, resolution note, or affects more than one work/outreach record.

**Trade-offs:** More modeling than a checkbox, but avoids losing blocker history and enables a dedicated blocker center.

### Pattern 4: Delegation as Relationship, Not Ownership Replacement

**What:** Keep `ownerId` on the record and represent delegation separately through `Assignment.delegateId`, collaborators, handoff note, and follow-up date.

**When to use:** Use whenever the freelancer remains accountable but another person handles a piece of the work.

**Trade-offs:** Requires slightly richer UI, but avoids ambiguity. Linear's current delegation model similarly distinguishes assignment/responsibility from delegated execution.

### Pattern 5: Unified View as Projection

**What:** The Today Focus view is computed from records, blockers, assignments, due dates, and next actions.

**When to use:** Use for dashboards, counters, focus lists, and "needs attention" sections.

**Trade-offs:** The projection needs tests because ranking logic can become subjective. Keep it deterministic in v1.

```typescript
function attentionScore(record: WorkRecord, assignment?: Assignment) {
  let score = 0;
  if (record.status === "blocked") score += 100;
  if (assignment?.followUpNeeded) score += 75;
  if (record.dueAt && new Date(record.dueAt) < new Date()) score += 60;
  if (record.nextAction) score += 20;
  return score;
}
```

## Data Flow

### Request / Mutation Flow

```
[User Action]
    ↓
[Route/View Component]
    ↓
[Domain Action: records / streams / outreach / blockers / collaboration]
    ↓
[Validation + Status Policy + Permission/ownership checks]
    ↓
[Repository Mutation]
    ↓
[ActivityEvent append]
    ↓
[Revalidate affected views: Today, stream, outreach, blockers, people]
```

Data should flow downward from persisted records into views, and mutations should flow upward through domain actions. Views should not directly write arbitrary model fields because status, blocker, and delegation rules are cross-cutting.

### Read Model Flow

```
[Data Store]
    ↓
[Repositories]
    ↓
[Domain Queries]
    ↓
[View Projections]
    ├── Today Focus: records + blockers + assignments
    ├── Stream View: records filtered by streamKey
    ├── Outreach View: records grouped by effortType/channel
    ├── Blocker Center: blockers + affected records
    └── Delegation View: assignments + people + followUpAt
```

### Key Data Flows

1. **Create stream work:** user selects stream A/B/C -> create `WorkRecord(kind=stream_work)` -> create `StreamWorkDetail(streamKey)` -> create default `Assignment(owner=self)` -> append activity -> show in stream and Today if actionable.
2. **Create outreach effort:** user selects effort type/channel -> create `WorkRecord(kind=outreach_effort)` -> create `OutreachEffortDetail` -> append activity -> group by effort type in Outreach and rank in Today.
3. **Mark blocked:** user adds or links blocker -> create/update `Blocker` -> create `RecordBlockerLink` -> transition record to `blocked` -> append event -> record appears in Blocker Center and Today.
4. **Resolve blocker:** user adds resolution note -> set blocker `resolvedAt` -> clear affected links if resolved -> optionally transition records back to `active` or `waiting` -> append event.
5. **Delegate work:** user adds delegate/collaborators and handoff note -> update `Assignment` -> create follow-up date if needed -> append event -> record appears in Delegation View and Today near follow-up date.
6. **Close or cancel:** user selects terminal status -> status policy validates unresolved blockers and required notes -> set `closedAt` or `cancelledAt` -> remove from active attention lists but preserve history.

## Build Order Implications

### Recommended Phase Structure

1. **Domain Foundation and Local Persistence**
   - Build entities, fixed stream seed data, status policy, repositories, and basic tests.
   - Addresses: streams A/B/C, work records, statuses.
   - Avoids: retrofitting closed/cancelled/blocker semantics after UI exists.

2. **Core Workstream Management**
   - Build stream navigation, stream work item CRUD, due dates, next action, and status transitions.
   - Addresses: useful standalone work management before outreach complexity.
   - Dependency: requires `WorkRecord`, `StreamWorkDetail`, status policy.

3. **Outreach Effort Management**
   - Build outreach effort types/options, effort records, outcomes, and grouped outreach views.
   - Addresses: outreach without CRM pipeline assumptions.
   - Dependency: reuses `WorkRecord` lifecycle from phase 1.

4. **Blocker Center**
   - Build blocker creation, linking, blocked status transition, resolution notes, and blocker-focused view.
   - Addresses: explicit blocked work across streams and outreach.
   - Dependency: requires both workstream and outreach records to prove cross-domain linking.

5. **Collaboration and Delegation**
   - Build people, owners, delegates, collaborators, handoff notes, and follow-up needs.
   - Addresses: collaboration/delegation as first-class v1 behavior.
   - Dependency: requires records and blocker flows so follow-ups can be meaningful.

6. **Unified Today Focus View**
   - Build next-action projection, attention scoring, cross-domain filters, and summary counters.
   - Addresses: core product value: next useful action across streams, outreach, blockers, and delegated work.
   - Dependency: benefits from all earlier data sources being present.

### Ordering Rationale

The shared lifecycle model should come first because every later feature depends on it. Streams should come before outreach because the fixed A/B/C constraint is the simplest proving ground for `WorkRecord`. Outreach should come before blockers and delegation so those cross-cutting features can be tested against both domain types. The unified Today Focus view should come last among v1 functional phases because it is a projection over all other modules, not a separate source of truth.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k users | Modular monolith, single relational database or local-first store, simple indexed queries by status/due date/owner. |
| 1k-100k users | Add query indexes for `status`, `kind`, `streamKey`, `ownerId`, `dueAt`, and `followUpAt`; cache Today projections if needed. |
| 100k+ users | Consider materialized read models for attention views and activity feeds before splitting services. |

### Scaling Priorities

1. **First bottleneck:** The unified Today query can become expensive if it joins records, blockers, assignments, and people without indexes. Fix with targeted indexes and a projection query.
2. **Second bottleneck:** Activity history can grow quickly. Paginate by entity and archive old events before considering infrastructure changes.

## Anti-Patterns

### Anti-Pattern 1: Separate Task Models for Streams and Outreach

**What people do:** Build `StreamTask` and `OutreachTask` with separate status, blockers, owners, and due dates.

**Why it's wrong:** The unified next-action view becomes a brittle adapter layer, and status meanings drift.

**Do this instead:** Use one `WorkRecord` lifecycle with domain-specific detail tables/objects.

### Anti-Pattern 2: Treating Outreach as a CRM Pipeline

**What people do:** Force outreach into stages such as Lead -> Contacted -> Proposal -> Won/Lost.

**Why it's wrong:** The project explicitly wants outreach options/types like 1:1 conversations and LinkedIn posts, not a sales pipeline.

**Do this instead:** Group by `effortType`, `channel`, status, and next action.

### Anti-Pattern 3: Encoding Blockers as Free-Text Notes Only

**What people do:** Add "blocked because..." into descriptions.

**Why it's wrong:** There is no reliable blocker center, no resolution workflow, and no way to see what a blocker affects.

**Do this instead:** Model blockers as linked entities with owner, status, severity, and resolution note.

### Anti-Pattern 4: Replacing Owner With Delegate

**What people do:** When work is delegated, change the owner to the delegate and lose accountability context.

**Why it's wrong:** The freelancer still needs to know what they are responsible for following up on.

**Do this instead:** Keep owner and delegate as separate fields in `Assignment`.

### Anti-Pattern 5: Storing Dashboard Counters as Source of Truth

**What people do:** Persist counts like `blockedCount` or `nextActionCount` and update them manually.

**Why it's wrong:** Counters drift when records change through multiple workflows.

**Do this instead:** Derive counters from indexed records or a materialized projection that can be rebuilt.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Authentication | Keep user identity separate from `Person`; link self person to auth user. | Needed before multi-user collaboration, but v1 can start single-user. |
| Calendar | Future read/write integration for due dates and follow-ups. | Defer; manual dates are enough for v1. |
| LinkedIn/email | Future reference-only metadata or manual logging. | Do not automate sending in v1 per project scope. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Views -> Domains | Domain actions and query functions | Views call intent-level methods, not raw persistence writes. |
| Records -> Streams/Outreach | Shared record ID with detail extension | Records own lifecycle; details own domain fields. |
| Records -> Blockers | Link table/entity | One blocker can affect multiple records. |
| Records -> Collaboration | Assignment by record ID | Owner/delegate/collaborators are relationships, not embedded record blobs. |
| Domains -> Activity | Append event after successful mutation | Activity should observe changes, not drive current state in v1. |

## Sources

- React official docs, "Choosing the State Structure" - supports avoiding contradictory, redundant, duplicated, and deeply nested state: https://react.dev/learn/choosing-the-state-structure (HIGH)
- Linear docs, "Issue status" - current workflow categories include backlog/todo/in progress/done/canceled and reinforce explicit terminal categories: https://linear.app/docs/configuring-workflows (MEDIUM)
- Linear docs, "Issue relations" - supports modeling blocked/blocking relationships explicitly rather than burying them in notes: https://linear.app/docs/issue-relations/ (MEDIUM)
- Linear docs, "Assign and delegate issues" - supports separating assignment/responsibility from delegated execution: https://linear.app/docs/assigning-issues (MEDIUM)
- Atlassian Jira Cloud docs, "What are work item statuses, priorities, and resolutions?" - supports status/priority/resolution as core work-item fields: https://support.atlassian.com/jira-cloud-administration/docs/what-are-issue-statuses-priorities-and-resolutions/ (MEDIUM)
- Asana Help, "How to use & manage task fields" - supports assignee, due date, dependencies, description, comments, and collaborators as common task fields: https://help.asana.com/s/article/task-fields (MEDIUM)
- Asana Help, "Custom fields" - supports field-based workflow clarity without hardcoding all workflow dimensions into one pipeline: https://help.asana.com/s/article/custom-fields (MEDIUM)

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Component boundaries | HIGH | Directly derived from project requirements and common work-management patterns. |
| Data model | MEDIUM | Opinionated recommendation; should be validated against chosen persistence layer during stack planning. |
| Status model | MEDIUM | Supported by current Jira/Linear patterns and project requirements, but exact labels may need product validation. |
| Build order | HIGH | Dependencies are clear: shared lifecycle -> domain records -> cross-cutting blockers/delegation -> unified projection. |
| Collaboration/delegation | MEDIUM | Current tools support the distinction, but v1 UX needs validation with the freelancer's real collaboration patterns. |

---
*Architecture research for: Freelancer Workstream Toolkit*
*Researched: 2026-04-30*
