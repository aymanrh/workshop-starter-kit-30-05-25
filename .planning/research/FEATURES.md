# Feature Research

**Domain:** Freelancer operations / lightweight CRM / outreach tracking toolkit
**Researched:** 2026-04-30
**Confidence:** MEDIUM-HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Three fixed work streams: A, B, C | Project context requires exactly three named streams; the product promise is cross-stream clarity rather than generic project sprawl. | LOW | Treat streams as first-class buckets, not user-created projects in v1. |
| Work items with title, notes, deadline, owner, status, and next action | Task tools such as Asana emphasize clear ownership, due dates, task descriptions, and "what by when"; lightweight CRMs emphasize follow-up tasks. | MEDIUM | This is the core record model. Avoid overbuilding subtasks unless needed for delegation. |
| Status model with active, blocked, closed, and cancelled | The project explicitly requires closed and cancelled terminal states; operational tools need distinguishable current, blocked, and terminal work. | MEDIUM | Make terminal states explicit and reportable. Do not collapse cancelled into closed/done. |
| Outreach efforts by type/option | The product is not a Kanban sales pipeline; users still need to track outreach actions such as 1:1 conversations, posts, referrals, communities, or proposals. | MEDIUM | Model effort type separately from status. Example: type = LinkedIn post, status = active/closed/cancelled. |
| Activity and interaction log | CRM tools commonly centralize notes, calls, emails, meetings, and history on contact or deal records. | MEDIUM | Manual log is enough for v1. Include date, type, summary, and related person/company if applicable. |
| Next-action dashboard | CRM and task tools compete on focusing users on due, overdue, assigned, or neglected activities. | MEDIUM | This is the highest-value v1 screen: sort across work streams, outreach, blockers, and delegated items. |
| Blocker tracking with resolution notes | Work tracking products highlight blocker visibility; the project explicitly requires blocker and resolution notes. | MEDIUM | Support blocker reason, blocked since, owner, unblock action, and resolution text/date. |
| Delegation/collaboration fields | The product must support collaborators, handoffs, and follow-up needs, even if not a real-time team tool. | MEDIUM | Include owner, collaborator(s), delegated-to, handoff note, waiting-on flag, and follow-up date. |
| Filtering and saved views | Users need to answer "what is active?", "what is blocked?", "what is waiting on someone?", and "what needs attention today?" without scanning everything. | MEDIUM | Minimum filters: stream, effort type, status, owner/collaborator, due date, blocker, terminal state. Saved views can wait until v1.x if needed. |
| Basic contact/context records | Outreach and client work need names, organizations, notes, last interaction, and related work/outreach items. | MEDIUM | Keep this lightweight. Do not become a full CRM database in v1. |
| Search | Once notes, blockers, contacts, and handoffs accumulate, users need fast retrieval. | LOW-MEDIUM | Text search across item title, notes, contacts, blocker notes, and activity summaries is enough. |
| Import/export or simple data portability | Freelancer users often start from spreadsheets/Notion; trust requires a way out. | MEDIUM | CSV import/export is enough. Avoid complex sync in v1. |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required in generic tools, but valuable for this specific product.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Attention Command Center | Shows one ranked list of the next useful actions across A/B/C streams, outreach, blockers, and delegated work. | MEDIUM-HIGH | Ranking should use due date, blocked age, waiting-on status, stale outreach, and terminal-state cleanup. |
| Non-Kanban outreach effort model | Fits freelancers who run varied business-development actions without forcing each action through a sales pipeline. | MEDIUM | Use effort types, cadence, outcome, and next action instead of stage columns. |
| Closed vs cancelled outcome analytics | Helps distinguish completed work from abandoned or intentionally stopped efforts. | MEDIUM | Track terminal reason and lightweight outcome notes; useful for deciding what outreach types to repeat. |
| Blocker aging and unblock prompts | Surfaces work that is stuck, not just work that is due. | MEDIUM | Show "blocked for X days", blocker owner, and unblock next action. |
| Delegation follow-up queue | Freelancers collaborating with contractors/clients need to know what is waiting on whom. | MEDIUM | More useful than generic assignment because it emphasizes handoff context and follow-up dates. |
| Outreach effort scorecard by type | Shows which effort types create useful conversations, closed opportunities, cancellations, or dead ends. | MEDIUM-HIGH | Keep metrics simple: count, active, closed, cancelled, blocked, last action, next action. |
| Context-preserving handoff notes | Reduces collaboration friction when delegating work or returning from client feedback loops. | LOW-MEDIUM | Structured handoff note plus related links/files is likely enough for v1. |
| Staleness detection | Flags active outreach/work items with no logged activity or next action for too long. | MEDIUM | A lightweight "needs attention" rule can deliver much of the value without AI. |
| Weekly operating review | Summarizes what closed, cancelled, became blocked, became stale, or needs delegation follow-up. | MEDIUM | Differentiates from plain task lists; can start as generated grouped views before any automation. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Full invoicing, payments, retainers, expenses, and accounting | Many freelancer suites bundle operations with finance. | Explicitly out of scope; it changes data model, compliance, support, and product positioning. | Allow manual "commercial note" or link to external finance tools later. |
| Kanban sales pipeline for outreach | Common CRM default; easy to visualize. | Conflicts with project direction. It pushes outreach into linear deal stages instead of effort types/options. | Use effort type + status + next action + outcome. |
| Automated email, DM, LinkedIn posting, or cold outreach sending | Appears efficient and differentiating. | Adds deliverability, platform policy, authentication, rate limiting, and reputational risk. | Manual activity tracking plus reminders and templates later. |
| Real-time team chat | Collaboration tools often add messaging. | Duplicates Slack/email and distracts from delegation tracking. | Handoff notes, owner/collaborator fields, comments, and follow-up reminders. |
| Unlimited custom workspaces/projects in v1 | Users may ask to generalize beyond A/B/C. | Dilutes the product's initial focus and makes the core dashboard harder to reason about. | Keep A/B/C fixed for launch; revisit after usage validates the model. |
| Heavy CRM objects: deals, companies, leads, lifecycle stages, scoring | Familiar from HubSpot/Pipedrive-style CRMs. | Turns the product into generic CRM and invites pipeline expectations. | Lightweight contacts/context records related to work items and outreach efforts. |
| AI assistant as a core v1 dependency | Current market heavily markets AI summaries, voice updates, and auto-populated CRMs. | Raises complexity before the workflow is validated; bad data model will make AI worse. | Build structured manual records first; add AI summaries after real usage patterns exist. |
| Client portal | Common in freelancer suites. | Pulls the product toward agency/project delivery and access control complexity. | Internal operating workspace first; export/share summary later if needed. |
| Time tracking as required workflow | Freelancer tools often bundle timers and billing. | Can distort the product toward invoicing/billing and add friction for users who only need operational clarity. | Optional estimate/effort field later, not required in v1. |

## Feature Dependencies

```text
Core item model
    ├──requires──> Three fixed streams
    ├──requires──> Status taxonomy
    ├──requires──> Owner/collaborator fields
    └──enables──> Next-action dashboard

Outreach effort model
    ├──requires──> Effort type taxonomy
    ├──requires──> Activity log
    ├──requires──> Status taxonomy
    └──enables──> Outreach scorecard by type

Blocker tracking
    ├──requires──> Core item model
    ├──requires──> Blocked status
    └──enables──> Blocker aging and unblock prompts

Delegation follow-up queue
    ├──requires──> Owner/collaborator/delegated-to fields
    ├──requires──> Handoff notes
    └──requires──> Follow-up date

Attention Command Center
    ├──requires──> Next action
    ├──requires──> Due/follow-up dates
    ├──requires──> Status taxonomy
    ├──requires──> Blocker tracking
    └──requires──> Activity timestamps

Kanban outreach pipeline
    └──conflicts──> Non-Kanban outreach effort model

Invoicing/payments
    └──conflicts──> v1 operating-tool focus
```

### Dependency Notes

- **Core item model before dashboards:** The dashboard is only useful if every work item and outreach effort has consistent status, next action, dates, and ownership.
- **Status taxonomy before blocker/delegation views:** Blocked, closed, and cancelled must be normalized early or reporting will become unreliable.
- **Activity log before staleness detection:** "Stale" requires a reliable last-touch timestamp; start with manual logging.
- **Outreach type before outreach analytics:** A scorecard is only meaningful if effort types are captured consistently.
- **Handoff fields before collaboration views:** A delegation queue needs more than assignee; it needs waiting-on, handoff context, and follow-up date.
- **Non-Kanban outreach conflicts with pipeline CRM:** Avoid deal-stage terminology and drag-to-stage UI in early phases.

## MVP Definition

### Launch With (v1)

Minimum viable product needed to validate the concept.

- [ ] Three fixed streams A, B, and C with work items.
- [ ] Work item fields: title, notes, status, deadline, next action, owner, collaborator/delegated-to.
- [ ] Outreach efforts by type/option with status, next action, activity log, and outcome notes.
- [ ] Status taxonomy including active, blocked, closed, and cancelled.
- [ ] Blocker record with reason, blocked since, unblock action, resolution note, and resolved date.
- [ ] Delegation/handoff fields: owner, collaborator, delegated-to, handoff note, waiting-on, follow-up date.
- [ ] Unified "needs attention" dashboard across work streams, outreach, blockers, and delegated work.
- [ ] Filters for stream, outreach type, status, blocked, waiting-on, owner/collaborator, and due/follow-up date.

### Add After Validation (v1.x)

Features to add once core usage is working.

- [ ] Saved views — add when users repeatedly apply the same filters.
- [ ] Weekly operating review — add after enough event/history data exists.
- [ ] Staleness detection — add once activity timestamps and next actions are reliable.
- [ ] CSV import/export — add when initial manual usage shows common spreadsheet migrations.
- [ ] Contact/context records — add if outreach and client notes become scattered across items.
- [ ] Lightweight templates for common outreach effort types — add after repeated patterns are known.

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] Calendar integration — useful, but requires sync complexity and conflict handling.
- [ ] Email/calendar activity capture — valuable after manual logging validates the workflow.
- [ ] AI summaries or AI next-action suggestions — depends on clean structured data.
- [ ] Shareable client/collaborator summaries — safer than a full portal, but still needs permissions.
- [ ] Automation rules — useful later, but premature before the status/outreach model stabilizes.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Three fixed streams A/B/C | HIGH | LOW | P1 |
| Core work item model | HIGH | MEDIUM | P1 |
| Status taxonomy with blocked/closed/cancelled | HIGH | MEDIUM | P1 |
| Outreach effort model by type | HIGH | MEDIUM | P1 |
| Next-action dashboard | HIGH | MEDIUM-HIGH | P1 |
| Blocker tracking | HIGH | MEDIUM | P1 |
| Delegation/handoff fields | HIGH | MEDIUM | P1 |
| Filtering | HIGH | MEDIUM | P1 |
| Activity log | MEDIUM-HIGH | MEDIUM | P1 |
| Contact/context records | MEDIUM | MEDIUM | P2 |
| Saved views | MEDIUM | MEDIUM | P2 |
| Blocker aging prompts | MEDIUM-HIGH | MEDIUM | P2 |
| Delegation follow-up queue | HIGH | MEDIUM | P2 |
| Outreach scorecard by type | MEDIUM-HIGH | MEDIUM-HIGH | P2 |
| Weekly operating review | MEDIUM-HIGH | MEDIUM | P2 |
| Calendar integration | MEDIUM | HIGH | P3 |
| AI summaries/suggestions | MEDIUM | HIGH | P3 |
| Client portal | LOW for v1 | HIGH | P3 / avoid for now |
| Invoicing/payments | Out of scope | HIGH | Anti-feature |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Competitor Feature Analysis

| Feature | Observed in Market | Our Approach |
|---------|--------------------|--------------|
| Contact/activity/task management | HubSpot centers contact records, activity logs, tasks, email/call notes, and follow-ups. Pipedrive emphasizes activities, reminders, due/overdue states, and custom activity types. | Borrow the activity/next-action discipline without adopting deal pipelines as the main model. |
| Project/task management | Asana highlights tasks, assignees, due dates, custom fields, views, status updates, and blocker visibility. | Borrow clear ownership, due dates, custom status, and blocker reporting; keep the scope constrained to A/B/C streams. |
| All-in-one freelancer suites | Frello, Plutio, Opero, Blokd, Freel, Retainero, and similar products frequently bundle projects, clients, Kanban, time tracking, invoices, retainers, files, portals, or finance. | Differentiate by staying lean: operational clarity, outreach effort tracking, blockers, and delegation without invoices or a generic agency suite. |
| AI-native freelancer ops | Tools such as Deskmantle, Tonomo, Oriv, and Opero market AI assistants, voice updates, auto-populated CRM, research, and automated outreach. | Defer AI until the workflow and data model are proven; avoid making AI the core value proposition for v1. |
| Scheduling/time focus | Shedle demonstrates freelancer value around priority, due date pressure, external blockers, and calendar sync. | Use priority/attention ideas, but do not require calendar/time tracking in v1. |

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Table stakes | HIGH | Strong agreement across official CRM/project-management docs and freelancer product pages: tasks, owners, dates, statuses, activities, reminders, filters, and shared context are expected. |
| Differentiators | MEDIUM-HIGH | Strongly derived from project constraints and market whitespace: non-Kanban outreach, blocker aging, terminal-state analytics, and delegation queues are more focused than broad freelancer suites. |
| Anti-features | HIGH | Directly supported by project out-of-scope decisions and market tendency to overbundle invoicing, portals, Kanban, AI, and automation. |
| Complexity | MEDIUM | Relative estimates are reliable for roadmap planning, but exact cost depends on chosen stack and persistence model. |

## Sources

- HubSpot Contact Management Software, accessed 2026-04-30: https://www.hubspot.com/products/crm/contact-management (HIGH confidence for contact records, activity logging, tasks, interaction history)
- HubSpot Task Management Software, accessed 2026-04-30: https://www.hubspot.com/products/task-management (HIGH confidence for CRM tasks, task queues, assignment, reminders)
- HubSpot CRM product page, accessed 2026-04-30: https://www.hubspot.com/products/crm (HIGH confidence for common CRM features and integrations)
- Pipedrive Activities and Goals, accessed 2026-04-30: https://www.pipedrive.com/en/features/activities-goals (HIGH confidence for activity types, reminders, due/overdue tracking, next activity)
- Asana Features, accessed 2026-04-30: https://asana.com/features (HIGH confidence for task/project management norms)
- Asana Project Management Features, accessed 2026-04-30: https://asana.com/features/project-management (HIGH confidence for project views, custom fields, blocker visibility, status updates)
- Asana Tasks, accessed 2026-04-30: https://asana.com/features/project-management/tasks (HIGH confidence for task ownership, due dates, descriptions, attachments)
- Asana Help: Project progress and status updates, accessed 2026-04-30: https://help.asana.com/s/article/project-progress-and-status-updates (HIGH confidence for status-update snapshots, blockers, stakeholder updates)
- Frello freelancer project management page, accessed 2026-04-30: https://frello.cloud/ (MEDIUM confidence for freelancer suite feature patterns)
- Plutio solutions page, last updated February 2026, accessed 2026-04-30: https://www.plutio.com/solutions (MEDIUM confidence for all-in-one freelancer/agency suite patterns)
- Opero freelance management page, accessed 2026-04-30: https://tryopero.com/ (MEDIUM confidence for current AI/all-in-one freelancer product positioning)
- Retainero CRM for agencies/freelancers page, accessed 2026-04-30: https://retainero.io/ (MEDIUM confidence for client/project/retainer/portal/Kanban bundling pattern)
- Shedle freelancer scheduling page, accessed 2026-04-30: https://www.shedle.io/ (MEDIUM confidence for freelancer scheduling, priority, blockers, and calendar-sync patterns)

---
*Feature research for: freelancer operations / lightweight CRM / outreach tracking toolkit*
*Researched: 2026-04-30*
