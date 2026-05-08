# Project Research Summary

**Project:** Freelancer Workstream Toolkit
**Domain:** Freelancer operations / lightweight CRM / outreach tracking toolkit
**Researched:** 2026-04-30
**Confidence:** MEDIUM-HIGH

## Executive Summary

The Freelancer Workstream Toolkit should be built as a focused operations cockpit for one freelancer managing three fixed work streams, outreach efforts, blockers, reminders, and delegation follow-up. Expert patterns from project management and CRM products point to clear ownership, due dates, activity history, controlled statuses, blocker visibility, and next-action queues, but this product should not become a generic CRM, project management suite, or freelancer finance platform.

The recommended approach is a small full-stack Next.js modular monolith backed by Supabase Postgres/Auth/RLS, with a shared actionable `WorkRecord` lifecycle and type-specific detail for stream work and outreach efforts. Build the data model and status policy first, then prove the product's main value through a unified Today/Needs Attention view that ranks next actions across streams, outreach, blockers, and delegated work.

The biggest risks are model drift and scope expansion: outreach turning into a sales pipeline, blockers becoming passive labels, closed/cancelled states being blurred, delegation losing accountability, and the A/B/C stream constraint dissolving into generic projects. Mitigate these risks by enforcing typed records, explicit statuses, first-class blocker and assignment entities, record-level permissions, and UAT that verifies the user can answer "what needs attention next?" from one screen.

## Key Findings

### Recommended Stack

Use Next.js App Router with React and TypeScript for a single deployable product that combines dense operational UI, authenticated reads/writes, route handlers, and background-job entry points. Use Supabase Postgres/Auth/RLS as the data and authorization foundation because the product is relationship-heavy and needs workspace/member/record scoping from the first schema pass.

Reminders and notifications should be modeled as durable records, then processed with Inngest and Resend when email reminders become part of the MVP or v1.x. Use Tailwind CSS, shadcn/ui, and lucide-react for a restrained internal-tool UI; use Zod, React Hook Form, Supabase generated types, selective TanStack Query, Vitest, and Playwright for validation and confidence around workflow rules.

**Core technologies:**
- Next.js App Router 16.2.4 + React 19.2.5 + TypeScript 6.0.3: full-stack app foundation with typed UI and server behavior.
- Supabase Postgres/Auth/RLS: relational data, SSR auth, and row-scoped authorization for collaboration/delegation.
- Tailwind CSS + shadcn/ui + lucide-react: dense, familiar operational UI without building basic controls from scratch.
- Zod + React Hook Form: shared validation for forms, server actions, status enums, and reminder payloads.
- Inngest + Resend: durable reminder workflows and transactional email once notification needs are validated.
- Vitest + Playwright: unit coverage for policies/projections and E2E coverage for core freelancer workflows.

### Expected Features

**Must have (table stakes):**
- Three fixed streams A/B/C with work items, not unlimited projects.
- Work items with title, notes, status, deadline, next action, owner, and collaborator/delegation metadata.
- Shared status taxonomy including active, waiting, blocked, closed, and cancelled.
- Outreach efforts by type/option with activity log, next action, follow-up date, and outcome notes.
- First-class blocker records with reason, owner-to-unblock, next check, resolution note, and resolved date.
- Delegation/handoff fields with accountable owner, delegate/collaborators, handoff note, waiting-on state, and follow-up date.
- Unified needs-attention dashboard and filters for stream, outreach type, status, blocker, owner/collaborator, waiting-on, and date.

**Should have (competitive):**
- Attention Command Center with deterministic ranking across due dates, blocker age, stale outreach, waiting-on status, and priority.
- Blocker aging and unblock prompts.
- Delegation follow-up queue.
- Closed vs cancelled outcome analytics.
- Outreach effort scorecard by type.
- Weekly operating review after enough event/history data exists.
- Staleness detection once activity timestamps and next actions are reliable.

**Defer (v2+):**
- Calendar integration and email/calendar activity capture.
- AI summaries or next-action suggestions.
- Shareable client/collaborator summaries or portal features.
- Automation rules.
- Invoicing, payments, retainers, expenses, time tracking as required workflow, automated outreach sending, and full CRM pipeline features.

### Architecture Approach

Build a modular monolith with one coherent relational data model. The central pattern is a shared `WorkRecord` for every actionable stream item or outreach effort, plus domain-specific detail tables/objects. Cross-cutting modules such as status policy, blockers, assignments, activity events, filtering, and next-action scoring should be shared services rather than duplicated inside stream and outreach screens.

**Major components:**
1. Product Shell: navigation, layout, global filters, and selected workspace/date context.
2. Records Domain: shared lifecycle, status transitions, common fields, and repositories.
3. Streams Domain: exactly-three-stream work item rules and detail forms.
4. Outreach Domain: effort type/channel/outcome behavior without CRM pipeline stages.
5. Blocker Domain: blocker lifecycle, linked affected records, and resolution workflow.
6. Collaboration Domain: people, ownership, delegation, handoff notes, and follow-up needs.
7. Activity/Audit Domain: append-only history for major changes.
8. Today Focus Projection: deterministic attention scoring over records, blockers, assignments, and dates.

### Critical Pitfalls

1. **Turning outreach into a generic CRM pipeline** — model outreach by effort type, target/context, next action, follow-up, status, outcome, and notes; avoid deal stages and stage-board language in v1.
2. **Collapsing all concepts into one generic task** — use a shared lifecycle, but keep stream work, outreach, blockers, and delegation as typed workflows with relevant forms.
3. **Treating blockers as only a status** — create blocker entities with owner, description, age, next check, links, and resolution notes.
4. **Blurring closed, done, cancelled, and archived** — keep terminal states distinct, timestamped, reasoned, searchable, and reportable.
5. **Missing the single next action across streams** — make next action and follow-up date first-class and build the attention projection early.
6. **Delegation without accountability** — enforce one accountable owner, separate delegate/collaborators, and require handoff/follow-up context.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation, Auth, and Domain Model
**Rationale:** Every later feature depends on consistent lifecycle, ownership, authorization, and three-stream constraints.
**Delivers:** Next.js/Supabase project setup, workspace/user/profile model, RLS baseline, fixed A/B/C streams, `WorkRecord`, stream/outreach detail skeletons, status policy, activity events, seed data, and policy tests.
**Addresses:** Three fixed streams, status taxonomy, owners/collaborators, closed/cancelled semantics.
**Avoids:** Generic task bloat, blurred terminal states, broad collaborator access, and early stream sprawl.

### Phase 2: Core Workstream Management and Early Attention View
**Rationale:** Stream work is the simplest proving ground for shared records, and the product value should be visible before all modules are complete.
**Delivers:** A/B/C navigation, work item CRUD, due dates, next actions, status transitions, basic filters, and a first Today/Needs Attention list over workstream items.
**Addresses:** Work item model, filtering, next-action dashboard foundation.
**Avoids:** Building CRUD screens without proving the daily operating surface.

### Phase 3: Outreach Effort Management
**Rationale:** Outreach reuses the shared lifecycle while validating the non-Kanban model against multiple effort types.
**Delivers:** Outreach effort types/options, manual activity log, last touch/follow-up fields, outcome notes, terminal reasons, and grouped outreach views.
**Addresses:** Outreach by type/option, activity history, outreach outcomes.
**Avoids:** CRM pipeline drift, deal-stage terminology, and automated outreach complexity.

### Phase 4: Blocker Center
**Rationale:** Blockers must be structured before the dashboard and history harden around passive status labels.
**Delivers:** Blocker records, record-blocker links, owner-to-unblock, severity/type, next check, resolution notes, blocked transition behavior, and blocker-focused filters.
**Addresses:** Blocker tracking, resolution notes, blocker aging prompts.
**Avoids:** Notes-only blockers, impossible close-with-open-blocker states, and untestable blocker age logic.

### Phase 5: Delegation and Collaboration Follow-Up
**Rationale:** Delegation depends on stable records and should distinguish accountability from assigned/delegated execution.
**Delivers:** People, accountable owner, delegate/collaborators, handoff notes, waiting-on state, follow-up date, scoped collaborator access, and delegation queue.
**Addresses:** Collaboration fields, handoffs, follow-up needs, record-level permissions.
**Avoids:** Multiple equal owners, lost handoff context, and collaborator data leakage.

### Phase 6: Full Attention Command Center and Operating Review
**Rationale:** Once streams, outreach, blockers, and delegation all emit structured signals, the unified projection can become the primary product surface.
**Delivers:** Cross-domain attention scoring, summary counters, saved/filterable views if validated, stale item detection, weekly operating review, and optional in-app/email reminder processing.
**Addresses:** Unified dashboard, scorecards, staleness, blocker/delegation follow-up, weekly review.
**Avoids:** Dashboard counters as source of truth, over-notification, and reporting that cannot explain closed vs cancelled outcomes.

### Phase Ordering Rationale

- Put lifecycle, authorization, status, and stream constraints first because retrofitting them after real data exists is expensive and risky.
- Build a minimal attention view during core workstream management so the product does not become a collection of maintenance forms.
- Add outreach before blockers/delegation so cross-cutting workflows can be validated against both delivery work and business-development effort.
- Add blockers and delegation as first-class entities before the final dashboard so the attention model can rank real operational constraints.
- Delay reminders, analytics, saved views, and weekly review until the structured activity and next-action data are reliable.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1:** Supabase RLS, SSR auth, schema migrations, generated types, and workspace/member policy design need implementation-specific validation.
- **Phase 5:** Scoped collaborator access and delegation UX need extra care because security and accountability bugs are high impact.
- **Phase 6:** Inngest/Resend reminder design, attention scoring, and weekly review rules need product-specific thresholds and notification policy.

Phases with standard patterns (skip research-phase unless requirements change):
- **Phase 2:** CRUD, status controls, filters, and basic workstream views follow established Next.js/Supabase patterns.
- **Phase 3:** Manual outreach tracking is straightforward if the non-pipeline model is protected.
- **Phase 4:** Linked blocker records and resolution workflows are well understood once the schema is fixed.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Based on official docs and current package/version checks for Next.js, React, Supabase, Tailwind, shadcn/ui, Zod, TanStack Query, Inngest, Resend, Vitest, and Playwright. Reminder provider choice is medium until volume/cost is known. |
| Features | MEDIUM-HIGH | Strong agreement across CRM, project-management, and freelancer-suite patterns; differentiators are derived from project constraints and market whitespace. |
| Architecture | MEDIUM | Component boundaries and build order are high-confidence, but the exact data model should be validated while implementing Supabase schema/RLS. |
| Pitfalls | MEDIUM-HIGH | Workflow, accountability, blocker, and security pitfalls are well supported; freelancer-specific scope-creep findings come from adjacent but relevant sources. |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- Reminder scope and provider economics: validate whether v1 needs email reminders or only durable in-app reminders before committing to Inngest/Resend workflows.
- Collaboration depth: decide whether collaborators log in during v1 or whether delegation metadata is initially internal-only; this affects RLS and invite flows.
- Attention scoring thresholds: define deterministic rules with real examples so the Today view feels useful and explainable.
- Stream labels: confirm whether A/B/C are literal labels or configurable display names while preserving exactly three fixed streams.
- Scope creep fields: decide whether `scope_bucket`, `requested_by`, and `approved_change` belong in v1 work items or in the later operating review phase.
- CSV import/export and contacts: validate with early usage whether data portability and lightweight contact/context records should move into v1 or remain v1.x.

## Sources

### Primary (HIGH confidence)
- Next.js official docs — App Router, server/client components, testing, current version.
- React official docs/blog — current React baseline and state-structure guidance.
- Supabase docs — Next.js SSR auth, `@supabase/ssr`, auth helper migration, and Row Level Security.
- Tailwind CSS, shadcn/ui, Zod, TanStack Query, Inngest, Resend, Vitest, and Playwright official docs — integration and usage patterns.
- npm registry checks accessed 2026-04-30 — current package versions listed in STACK.md.
- HubSpot, Pipedrive, and Asana product/help docs — task, activity, owner, reminder, contact, blocker, and project-management expectations.
- OWASP Broken Access Control — record ownership and deny-by-default access control principles.

### Secondary (MEDIUM confidence)
- Linear and Atlassian Jira docs — status categories, blocker relationships, delegation, and issue/work-item modeling precedents.
- Freelancer suite product pages such as Frello, Plutio, Opero, Retainero, and Shedle — current market tendency toward all-in-one bundles, AI positioning, calendar focus, and freelancer workflow claims.
- Asana and Atlassian dependency/delegation/scope guidance — blocker, handoff, and accountability patterns relevant to this domain.

### Detailed Research Files
- `.planning/research/STACK.md`
- `.planning/research/FEATURES.md`
- `.planning/research/ARCHITECTURE.md`
- `.planning/research/PITFALLS.md`

---
*Research completed: 2026-04-30*
*Ready for roadmap: yes*
