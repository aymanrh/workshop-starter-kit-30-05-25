# Requirements: Freelancer Workstream Toolkit

**Defined:** 2026-04-30
**Core Value:** The freelancer can always see the next useful action across work streams, outreach efforts, blockers, and delegated work.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [ ] **FND-01**: User can sign in and access a private workspace for their freelancer operations data.
- [ ] **FND-02**: Workspace data is scoped so only authorized workspace members can read or change records.
- [ ] **FND-03**: The system provides exactly three fixed work streams: A, B, and C.
- [ ] **FND-04**: The system uses a shared record lifecycle for stream work and outreach efforts.
- [ ] **FND-05**: The system supports controlled statuses: active, waiting, blocked, closed, and cancelled.
- [ ] **FND-06**: Closed and cancelled records are distinct terminal outcomes with timestamps and reason/outcome notes.
- [ ] **FND-07**: The system records meaningful activity events for status, ownership, blocker, and delegation changes.

### Workstreams

- [ ] **WRK-01**: User can view separate workstream spaces for A, B, and C.
- [ ] **WRK-02**: User can create, edit, and archive work items inside stream A, B, or C.
- [ ] **WRK-03**: User can set title, notes, due date, priority, status, next action, and owner for each work item.
- [ ] **WRK-04**: User can transition work items between active, waiting, blocked, closed, and cancelled states.
- [ ] **WRK-05**: User can filter workstream items by stream, status, owner, due date, priority, and next action date.
- [ ] **WRK-06**: User can distinguish planned work from unplanned or change-request work without adding invoicing.

### Outreach

- [ ] **OUT-01**: User can create outreach efforts by type or option, such as 1:1 conversation, LinkedIn post, referral, proposal, or community activity.
- [ ] **OUT-02**: User can track outreach effort status, progress notes, next action, follow-up date, and outcome.
- [ ] **OUT-03**: User can log manual outreach activity with date, type, summary, and related contact/context.
- [ ] **OUT-04**: User can close or cancel outreach efforts with distinct outcome or cancellation notes.
- [ ] **OUT-05**: User can view outreach grouped by effort type/option rather than CRM pipeline stage.
- [ ] **OUT-06**: User can filter outreach by effort type, status, follow-up date, blocked state, and terminal outcome.

### Blockers

- [ ] **BLK-01**: User can create blocker records with reason, owner-to-unblock, affected record, severity/type, and next check date.
- [ ] **BLK-02**: User can link blockers to workstream items or outreach efforts.
- [ ] **BLK-03**: User can see how long a blocker has been open and what action is needed to unblock it.
- [ ] **BLK-04**: User can resolve blockers with resolution notes and resolved date.
- [ ] **BLK-05**: The system prevents or clearly warns when closing records that still have open blockers.
- [ ] **BLK-06**: User can view a blocker center containing all active blockers across streams and outreach.

### Delegation

- [ ] **DLG-01**: User can create people/collaborator records for owners, delegates, collaborators, or client contacts.
- [ ] **DLG-02**: User can assign one accountable owner to each work item or outreach effort.
- [ ] **DLG-03**: User can add delegates or collaborators without creating multiple equal owners.
- [ ] **DLG-04**: User can add handoff notes, expected output, waiting-on state, and follow-up date for delegated work.
- [ ] **DLG-05**: User can view a delegation follow-up queue showing items waiting on other people.
- [ ] **DLG-06**: Collaborator access, if enabled, is scoped to authorized workspace records.

### Attention

- [ ] **ATT-01**: User can open a unified Today or Needs Attention view across streams, outreach, blockers, and delegated work.
- [ ] **ATT-02**: The attention view ranks records by overdue follow-up, due date, blocker age, waiting-on state, stale activity, and priority.
- [ ] **ATT-03**: User can see summary counters for active, waiting, blocked, closed, and cancelled work across domains.
- [ ] **ATT-04**: User can filter the attention view by stream, outreach type, status, blocked state, owner/collaborator, waiting-on, and date.
- [ ] **ATT-05**: User can identify stale items with no recent activity or next action.
- [ ] **ATT-06**: User can run a lightweight operating review showing recently closed, cancelled, blocked, delegated, stale, and upcoming items.
- [ ] **ATT-07**: User can create durable in-app reminders for next actions or follow-ups.

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Integrations

- **INT-01**: User can sync follow-up dates with an external calendar.
- **INT-02**: User can capture email or calendar activity automatically.
- **INT-03**: User can export records to external tools with terminal outcomes preserved.

### Automation

- **AUT-01**: User can receive email reminder digests through a transactional email provider.
- **AUT-02**: User can define simple automation rules for stale items or follow-up reminders.
- **AUT-03**: User can generate AI summaries or next-action suggestions from structured history.

### Sharing

- **SHR-01**: User can share a limited client or collaborator summary view.
- **SHR-02**: User can invite collaborators with role-specific permissions and visible activity history.

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Invoicing, payments, retainers, expenses, or accounting | Explicitly excluded so v1 stays focused on operational clarity |
| Full CRM sales pipeline or Kanban deal board | Outreach is effort-type/option based, not linear sales-stage based |
| Automated LinkedIn, email, or DM sending | Adds platform, deliverability, and compliance risk before the manual workflow is validated |
| Real-time team chat | Delegation needs structured handoffs and follow-ups, not a messaging platform |
| Unlimited projects or custom stream creation | v1 is intentionally constrained to streams A, B, and C |
| Client portal | Pulls the product toward agency collaboration and permissions complexity |
| Required time tracking | Risks dragging v1 back toward billing/invoicing workflows |
| AI as a core dependency | Structured workflow data should be validated before AI is added |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FND-01 | Phase 1 | Pending |
| FND-02 | Phase 1 | Pending |
| FND-03 | Phase 1 | Pending |
| FND-04 | Phase 1 | Pending |
| FND-05 | Phase 1 | Pending |
| FND-06 | Phase 1 | Pending |
| FND-07 | Phase 1 | Pending |
| WRK-01 | Phase 2 | Pending |
| WRK-02 | Phase 2 | Pending |
| WRK-03 | Phase 2 | Pending |
| WRK-04 | Phase 2 | Pending |
| WRK-05 | Phase 2 | Pending |
| WRK-06 | Phase 2 | Pending |
| OUT-01 | Phase 3 | Pending |
| OUT-02 | Phase 3 | Pending |
| OUT-03 | Phase 3 | Pending |
| OUT-04 | Phase 3 | Pending |
| OUT-05 | Phase 3 | Pending |
| OUT-06 | Phase 3 | Pending |
| BLK-01 | Phase 4 | Pending |
| BLK-02 | Phase 4 | Pending |
| BLK-03 | Phase 4 | Pending |
| BLK-04 | Phase 4 | Pending |
| BLK-05 | Phase 4 | Pending |
| BLK-06 | Phase 4 | Pending |
| DLG-01 | Phase 5 | Pending |
| DLG-02 | Phase 5 | Pending |
| DLG-03 | Phase 5 | Pending |
| DLG-04 | Phase 5 | Pending |
| DLG-05 | Phase 5 | Pending |
| DLG-06 | Phase 5 | Pending |
| ATT-01 | Phase 6 | Pending |
| ATT-02 | Phase 6 | Pending |
| ATT-03 | Phase 6 | Pending |
| ATT-04 | Phase 6 | Pending |
| ATT-05 | Phase 6 | Pending |
| ATT-06 | Phase 6 | Pending |
| ATT-07 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 38 total
- Mapped to phases: 38
- Unmapped: 0

---
*Requirements defined: 2026-04-30*
*Last updated: 2026-04-30 after initialization*
