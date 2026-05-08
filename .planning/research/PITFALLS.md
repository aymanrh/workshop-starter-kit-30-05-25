# Pitfalls Research

**Domain:** Freelancer workstream and outreach operations web app
**Researched:** 2026-04-30
**Confidence:** MEDIUM-HIGH

Research combines current product documentation and guidance from Asana, Atlassian, Linear, Pipedrive, OWASP, and recent freelancer/project-management writing. Confidence is high for workflow/accountability/security patterns and medium for freelancer-specific product pitfalls because many sources discuss adjacent workflows rather than this exact combined product.

## Critical Pitfalls

### Pitfall 1: Turning Outreach Into a Generic CRM Pipeline

**What goes wrong:**
The product quietly becomes a sales CRM with linear stages like Lead -> Qualified -> Proposal -> Won/Lost. That conflicts with the project constraint that outreach is effort-type based: 1:1 conversations, LinkedIn posts, channel experiments, referrals, and similar options. Users end up force-fitting non-linear business-development work into stages that imply sales opportunity maturity.

**Why it happens:**
CRM pipeline UIs are familiar and visually tempting. Many outreach examples online assume prospects/deals, but this product is about tracking effort and next actions, not forecasting revenue.

**How to avoid:**
Model outreach as `effort_type`, `target/context`, `next_action`, `status`, `last_touch_at`, `follow_up_at`, `outcome`, and `notes`. Allow optional contact/company fields, but do not make deal value, stage probability, or CRM-style stage progression central to v1. The primary outreach question should be "what effort needs attention next?" not "what stage is this deal in?"

**Warning signs:**
- Roadmap includes "pipeline board" or "deal stages" before effort types are proven.
- Outreach statuses are named after buyer journey stages instead of action state.
- LinkedIn posts and 1:1 conversations require different hacks to fit the same board.
- Closed/cancelled outreach cannot explain why the effort ended.

**Phase to address:**
Phase 1 data model and Phase 3 outreach tracker. Validate with at least three effort types before adding any CRM-like visualization.

---

### Pitfall 2: Collapsing Workstream Items and Outreach Efforts Into One Generic Task

**What goes wrong:**
Delivery tasks, blockers, outreach efforts, and delegated work become the same generic "task" record with many nullable fields. The UI becomes ambiguous: a client deliverable, a LinkedIn post, a blocked approval, and a collaborator handoff all look identical even though they require different prompts, filters, and completion rules.

**Why it happens:**
A single table and universal form feel simpler in a greenfield app. The long-term cost appears later when every new workflow adds conditional logic, hidden fields, and confusing labels.

**How to avoid:**
Use a shared base concept for common fields (`title`, `status`, `next_action`, `due_at`, `owner_id`, timestamps), but keep domain-specific records or typed variants for `work_item`, `outreach_effort`, `blocker`, and `handoff/delegation`. Design forms by workflow, not by database convenience.

**Warning signs:**
- More than 30-40% of form fields are irrelevant for a given item type.
- Status labels need tooltips to explain what they mean in each context.
- Queries for "needs attention" are full of type-specific exceptions.
- Users cannot tell whether an item represents delivery work, sales activity, or a dependency.

**Phase to address:**
Phase 1 information architecture and schema. Revisit in Phase 2 unified dashboard to ensure the shared attention view does not erase context.

---

### Pitfall 3: Treating Blockers as a Status Instead of a First-Class Object

**What goes wrong:**
"Blocked" becomes just another status. The app can show that an item is blocked, but not why, by whom, since when, what resolution was attempted, or what should happen next. Blockers become stale labels rather than actionable constraints.

**Why it happens:**
Many task tools support a blocked status, so teams copy the surface behavior without modeling dependency details. Asana and Atlassian both emphasize identifying dependencies/blockers early, communicating them, and tracking handoffs because unmanaged dependencies delay delivery.

**How to avoid:**
Treat blockers as records linked to workstream items or outreach efforts. Minimum fields: `blocked_item_id`, `blocker_type` (client, collaborator, dependency, information, capacity, external), `description`, `owner_to_unblock`, `created_at`, `next_check_at`, `resolution_notes`, and `resolved_at`. Let items derive a blocked attention state from open blocker records.

**Warning signs:**
- The blocked list cannot be sorted by age or next check date.
- Blocker resolution notes have nowhere structured to live.
- Closing a blocked item loses evidence of how it was resolved.
- A user has to read every note to know what is needed from whom.

**Phase to address:**
Phase 1 schema and Phase 2 attention dashboard. Blocker age and next-check filters should be UAT criteria before polishing visuals.

---

### Pitfall 4: Blurring Closed, Done, Cancelled, and Archived

**What goes wrong:**
Terminal states are collapsed into "done" or hidden through archive behavior. Completed delivery, intentionally cancelled work, duplicate outreach, abandoned experiments, and no-response closures all become indistinguishable. The user loses operational learning: what worked, what was stopped, and what still deserves follow-up.

**Why it happens:**
Simple task apps optimize for completion. But this project explicitly requires closed and cancelled states, and outreach needs outcome memory. Linear's workflow model separates completed and canceled categories, which is a useful precedent for keeping terminal semantics distinct.

**How to avoid:**
Define a small status taxonomy with categories:
- Active: not started, active/in progress, waiting
- Blocked: derived or explicit with linked blocker
- Terminal success: closed/done
- Terminal stopped: cancelled, duplicate, no longer relevant

Require `closed_at` for closed items and `cancelled_at` plus `cancel_reason` for cancelled items. Keep terminal items searchable and reportable; do not auto-hide them from history.

**Warning signs:**
- Cancelled items disappear from all dashboards with no audit trail.
- "Closed" is used for both success and abandonment.
- Outreach reports count cancelled experiments as completed effort.
- Reopening a closed/cancelled item has undefined behavior.

**Phase to address:**
Phase 1 status model. Phase 2 filters/history. Phase 3 outreach outcomes.

---

### Pitfall 5: Missing the Single Next Action Across Streams

**What goes wrong:**
The app stores lots of work but fails at the core value: the freelancer cannot quickly see the next useful action across A, B, C, outreach, blockers, and delegation. It becomes another place to maintain records instead of a daily operating surface.

**Why it happens:**
Builders over-index on CRUD screens for each stream and under-design the cross-cutting "what should I do now?" view. Asana's prioritization guidance stresses task lists, priority methods, scheduling, and progress communication because raw lists alone create overwhelm.

**How to avoid:**
Make `next_action` and `next_action_due_at` first-class on work items, outreach efforts, blockers, and delegated follow-ups. Build a unified "Needs Attention" query before advanced reporting. Sort by overdue follow-up, due date, blocker age, delegated waiting, and manually pinned priority.

**Warning signs:**
- Home screen is just counts by status.
- User must visit A, B, C, outreach, and delegation separately every morning.
- Items can be active without a next action.
- Due dates exist but follow-up dates do not.

**Phase to address:**
Phase 2 unified dashboard should come immediately after Phase 1 data model. It is the product's main value proof.

---

### Pitfall 6: Delegation Without Ownership, Context, and Follow-Up

**What goes wrong:**
Delegated work is reduced to assigning a name. There is no handoff context, expectation, due/follow-up date, collaborator visibility, or re-assignment path. The freelancer either micromanages outside the tool or forgets to follow up until delivery risk appears.

**Why it happens:**
Solo freelancer tools assume one owner. Team tools often support assignment, but this product needs lightweight collaboration without becoming team chat. Asana's task model allows one assignee with collaborators, and its RACI guidance emphasizes one responsible/accountable person to avoid confusion.

**How to avoid:**
Each delegated item needs one accountable owner, optional collaborators, handoff notes, expected output, due date, follow-up date, and "waiting on" state. Store context where the work lives instead of relying on chat/email memory. Keep check-ins separate from taking ownership back.

**Warning signs:**
- Multiple owners can be equally responsible for the same task.
- Handoff notes live only in comments or external messages.
- Delegated items do not appear in the unified attention view.
- The freelancer cannot tell what is waiting on someone else versus waiting on themselves.

**Phase to address:**
Phase 1 ownership model and Phase 4 delegation/collaboration. If delegation is in v1, owner semantics must be in the first schema pass.

---

### Pitfall 7: No Boundary Between Delivery Work and Scope Creep

**What goes wrong:**
The app tracks tasks but fails to make unplanned client requests visible. Extra revisions, "quick" asks, and informal changes blend into normal workstream items. The freelancer loses the ability to see where delivery work is expanding beyond plan.

**Why it happens:**
Freelancers often handle client relationship, project management, and delivery at once. Recent freelancer guidance repeatedly identifies vague scope, informal requests, and missing change control as major causes of scope creep.

**How to avoid:**
Add fields that distinguish planned work from new/unplanned requests: `scope_bucket` (planned, change request, support/favor, internal), `requested_by`, `request_source`, and optional `approved_change` flag. Do not build invoicing in v1, but preserve operational evidence that a request changed the delivery workload.

**Warning signs:**
- A workstream's active count grows but nothing indicates why.
- Client-requested extras are indistinguishable from original deliverables.
- Cancelled work has no relationship to scope changes.
- User cannot review "what changed this week?"

**Phase to address:**
Phase 1 work item schema and Phase 5 review/reporting. Avoid invoicing features, but capture the data needed to protect capacity.

---

### Pitfall 8: Over-Customizing the Three-Stream Constraint Too Early

**What goes wrong:**
The app starts as A/B/C, then quickly adds unlimited projects, folders, nested boards, custom workflows, and reusable templates. V1 becomes a broad project management app instead of a focused freelancer cockpit.

**Why it happens:**
Customization feels like future-proofing. In reality, it delays validation of the specific constraint: exactly three named streams for v1.

**How to avoid:**
Hard-code or seed three streams named A, B, and C in v1. Allow display names only if needed, but avoid arbitrary stream creation, nested projects, or per-stream custom status workflows until the core attention model is proven.

**Warning signs:**
- Requirements include project templates before the three-stream workflow is usable.
- Navigation is built around generic "Projects" rather than A/B/C and Outreach.
- Every stream can have its own statuses in v1.
- The roadmap starts solving agency/team-scale portfolio problems.

**Phase to address:**
Phase 1 product frame and navigation. Keep this constraint visible in UAT.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| One `tasks` table for every concept | Fast CRUD scaffolding | Conditional UI, weak reporting, unclear semantics | Only if implemented as explicit typed records with validated type-specific fields |
| Status as free-text | Easy to add labels | Broken filters, inconsistent closed/cancelled behavior | Never for core status; use controlled enums plus optional tags |
| Blocker as boolean | Quick blocked indicator | No blocker age, owner, resolution history, or follow-up | Only for a throwaway prototype, not roadmap v1 |
| Multiple equal owners | Looks collaborative | Accountability gaps and missed handoffs | Avoid; use one accountable owner plus collaborators |
| Archiving terminal items immediately | Cleaner UI | Loss of learning and outcome analysis | Acceptable only with searchable archived history and reason fields |
| Dashboard after all CRUD is done | Faster early screens | Product misses core value until late | Avoid; unified attention query should be early |
| Outreach modeled from CRM templates | Familiar board UI | Wrong mental model for posts, conversations, and experiments | Avoid unless later evidence shows deal tracking is required |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| LinkedIn | Building automated posting/DM features in v1 | Track manual effort, content link, date posted, response/follow-up, and outcome; defer automation |
| Email/calendar | Assuming integration is required for follow-up value | Start with manual follow-up dates and exportable reminders; add integration only after workflow validation |
| Notifications | Sending generic reminders for every due item | Notify only on next-action due, stale blockers, delegated follow-ups, and overdue outreach touches |
| Future CRM export | Losing outcome semantics during export | Preserve effort type, terminal reason, last touch, and notes; do not flatten everything to "lead stage" |
| Collaboration invites | Giving collaborators broad account access | Share only assigned/delegated records or scoped views; use least privilege from the start |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Computing "needs attention" entirely client-side | Slow home screen, inconsistent counts across devices | Server/query-layer attention view with indexed due/follow-up/status fields | Hundreds to low thousands of records |
| Notes-only history | Search becomes required to understand state changes | Structured status/outcome/blocker events plus freeform notes | After several weeks of active use |
| No stale-item detection | Active list grows without closure | Track `last_activity_at`, blocker age, and next follow-up; surface stale active items | As soon as outreach volume grows |
| Per-record permission checks scattered across UI | Hidden data leaks or inconsistent access | Centralize record ownership/collaborator authorization server-side | First shared/delegated workflow |
| Overly broad dashboard queries | Counts become inaccurate and hard to explain | Define attention categories explicitly and test them | Once all streams plus outreach are present |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Treating collaborator access as full account access | Client names, outreach notes, and unrelated stream work leak to collaborators | Record-level permissions; collaborators see only assigned/delegated work |
| Trusting client-side filters for A/B/C or owner scoping | A user can access records by changing IDs or URLs | Enforce ownership and collaborator checks server-side; OWASP recommends deny-by-default and record ownership enforcement |
| Storing sensitive client context in unscoped comments | Private negotiation, blocker, or relationship notes exposed in shared views | Separate private notes from handoff notes; mark visibility explicitly |
| No audit trail for delegated/closed/cancelled changes | Disputes over who changed status or cancelled work | Store actor, timestamp, previous status, next status, and reason for terminal transitions |
| Future integrations requesting excessive OAuth scopes | Outreach/contact data exposed beyond need | Prefer manual tracking first; when integrating, request minimal scopes and document data use |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Dashboard shows counts instead of actions | User knows workload size but not what to do next | Unified attention list sorted by next action, due date, blocker age, and follow-up date |
| Same form for every item | Form feels bloated and irrelevant | Workflow-specific forms with shared fields underneath |
| Blocked status with no unblock prompt | Blockers become passive labels | Require owner-to-unblock, next check, and resolution notes |
| Closed/cancelled hidden too aggressively | User loses history and repeats mistakes | Keep terminal items filterable by outcome and reason |
| Outreach effort measured only by volume | User sends more but learns less | Track response, follow-up, outcome, and channel/type effectiveness |
| Delegation screen separate from delivery context | Handoffs lose connection to actual work | Show delegation fields inside the relevant work item and also in the unified attention view |
| Too many custom labels in v1 | User spends time designing the system | Provide a tight default taxonomy; add tags later only for filtering gaps |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Three streams:** A, B, and C exist, but cross-stream attention is verified.
- [ ] **Work item statuses:** Closed and cancelled are separate terminal states with timestamps and reasons where appropriate.
- [ ] **Outreach:** Supports at least 1:1 conversations, LinkedIn posts, and another channel without forcing a CRM stage.
- [ ] **Follow-ups:** Outreach and delegated work can each have next follow-up dates independent of delivery due dates.
- [ ] **Blockers:** Blocked items have blocker owner, description, next check, and resolution notes.
- [ ] **Delegation:** Every delegated item has one accountable owner, collaborators, handoff notes, and follow-up need.
- [ ] **Unified view:** Home/attention surface combines streams, outreach, blockers, and delegation in one actionable list.
- [ ] **History:** Terminal items remain searchable/filterable and are not silently deleted by archive behavior.
- [ ] **Permissions:** Collaborators cannot view unrelated stream or outreach records.
- [ ] **Scope signals:** Workstream items can distinguish planned work from unplanned client requests.

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Outreach became CRM pipeline | MEDIUM | Add effort-type fields, map old stages to status/outcome, create non-stage outreach views, deprecate deal-first language |
| Generic task model became bloated | HIGH | Introduce typed records or domain tables, migrate fields by item type, simplify forms, add contract tests for attention queries |
| Blockers are only statuses | MEDIUM | Create blocker records from currently blocked items, require owner/next-check on new blockers, add blocker resolution flow |
| Closed/cancelled are blurred | MEDIUM | Add terminal category and reason fields, migrate done-like states, create reports to separate completed from abandoned |
| Dashboard lacks next action | MEDIUM | Add next-action fields, backfill from titles/notes manually where needed, make attention query the primary home view |
| Delegation lacks ownership | MEDIUM | Enforce one accountable owner, convert extra assignees to collaborators, require handoff/follow-up fields on delegated items |
| Three-stream model sprawled | LOW-MEDIUM | Hide or freeze extra project creation, remap current records to A/B/C plus Outreach, defer customization |
| Permission model too broad | HIGH | Stop sharing features until record-level authorization is implemented; audit existing shared records and collaborator access |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Outreach becomes CRM pipeline | Phase 1 schema, Phase 3 outreach | Create three different effort types and verify none require deal stages |
| Generic task model erases domain context | Phase 1 schema/IA | Forms for work item, outreach, blocker, and delegation show only relevant fields |
| Blockers as passive status | Phase 1 blocker model, Phase 2 dashboard | Every blocked item has owner-to-unblock, next check, and resolution path |
| Closed/cancelled blur | Phase 1 status taxonomy | Closed and cancelled appear as distinct filters and cannot be confused in reports |
| Missing next action | Phase 2 unified attention view | User can answer "what needs attention next?" from one screen |
| Delegation without ownership | Phase 1 ownership model, Phase 4 delegation | Delegated items have one accountable owner plus handoff/follow-up details |
| Scope creep invisibility | Phase 1 work item fields, Phase 5 review | Unplanned client requests can be filtered and reviewed separately |
| Three-stream sprawl | Phase 1 navigation/product frame | App exposes A, B, C, and Outreach without generic project creation |
| Data leakage through collaboration | Phase 4 sharing/delegation | Authorization tests prove collaborators see only scoped records |
| Over-notification | Phase 5 polish | Notifications are tied to attention rules, not every status change |

## Sources

- Asana, "Project dependencies: Types, examples, and how to manage" (2025): https://asana.com/resources/project-dependencies
- Atlassian, "Project dependencies: Types & ways to manage them effectively": https://www.atlassian.com/agile/project-management/project-management-dependencies
- Linear Docs, "Issue status": https://linear.app/docs/configuring-workflows
- Asana, "Understanding tasks": https://help.asana.com/s/article/understanding-tasks
- Asana, "Why one assignee?" (2025): https://asana.com/resources/why-one-assignee
- Asana Help, "How to apply a RACI Matrix in Asana": https://help.asana.com/s/article/how-to-apply-a-raci-matrix-in-asana
- Asana, "How to delegate effectively" (2025): https://asana.com/resources/how-to-delegate
- Asana, "How to prioritize tasks at work" (2026): https://asana.com/resources/how-prioritize-tasks-work
- Pipedrive, "Sales Pipeline Management: A Complete Guide": https://www.pipedrive.com/en/blog/sales-pipeline-management
- Pipedrive, "The Problem With a Messy Pipeline": https://www.pipedrive.com/en/blog/stop-losing-best-leads
- Plutio, "How to Prevent Scope Expansion as a Freelancer" (2026): https://www.plutio.com/freelancer-magazine/scope-creep
- Plutio, "Project Management for Freelancers: The 2026 Playbook": https://www.plutio.com/freelancer-magazine/freelance-project-management
- OWASP, "A01:2021 Broken Access Control": https://owasp.org/Top10/en/A01_2021-Broken_Access_Control/

---
*Pitfalls research for: freelancer workstream and outreach operations web app*
*Researched: 2026-04-30*
