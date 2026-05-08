# Roadmap: Freelancer Workstream Toolkit

## Overview

This roadmap delivers a focused freelancer operations cockpit in six coarse phases. It starts with the private workspace, fixed A/B/C stream constraint, shared record lifecycle, controlled statuses, closed/cancelled semantics, and activity history that every later workflow depends on. It then proves stream work, outreach options, blockers, delegation, and finally the unified attention surface that lets the freelancer see the next useful action across all work.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation, Auth, and Lifecycle** - Users have a private workspace with fixed streams, shared record lifecycle, controlled statuses, terminal outcomes, and activity history.
- [ ] **Phase 2: Workstream Management** - Users can manage stream work inside A, B, and C with status transitions, fields, filters, and planned-vs-change distinction.
- [ ] **Phase 3: Outreach Effort Management** - Users can manage outreach as effort types/options with manual activity, follow-ups, outcomes, and non-pipeline grouping.
- [ ] **Phase 4: Blocker Center** - Users can create, link, age, resolve, and review blockers across workstream and outreach records.
- [ ] **Phase 5: Delegation and Collaboration Follow-Up** - Users can manage people, accountable owners, collaborators, handoff context, waiting-on work, and scoped access.
- [ ] **Phase 6: Attention Command Center and Operating Review** - Users can see ranked next actions, counters, filters, stale items, operating review, and durable reminders across the toolkit.

## Phase Details

### Phase 1: Foundation, Auth, and Lifecycle
**Goal**: Users can securely access a private freelancer workspace whose records obey the fixed A/B/C stream model and shared lifecycle rules.
**Depends on**: Nothing (first phase)
**Requirements**: FND-01, FND-02, FND-03, FND-04, FND-05, FND-06, FND-07
**Success Criteria** (what must be TRUE):
  1. User can sign in and see only records authorized for their workspace.
  2. User sees exactly three fixed work streams named A, B, and C.
  3. Stream work and outreach records share the same active, waiting, blocked, closed, and cancelled lifecycle.
  4. User can tell closed records from cancelled records, including when each terminal state happened and the recorded reason or outcome.
  5. User can inspect meaningful activity history for status, ownership, blocker, and delegation changes.
**Plans**: TBD
**UI hint**: yes

### Phase 2: Workstream Management
**Goal**: Users can manage operational work items end-to-end inside streams A, B, and C.
**Depends on**: Phase 1
**Requirements**: WRK-01, WRK-02, WRK-03, WRK-04, WRK-05, WRK-06
**Success Criteria** (what must be TRUE):
  1. User can move between separate stream spaces for A, B, and C.
  2. User can create, edit, archive, and review work items inside a selected stream.
  3. User can set title, notes, due date, priority, status, next action, and owner on each work item.
  4. User can transition work items across active, waiting, blocked, closed, and cancelled states without losing terminal outcome details.
  5. User can filter stream work by stream, status, owner, due date, priority, next action date, and planned versus unplanned/change-request work.
**Plans**: TBD
**UI hint**: yes

### Phase 3: Outreach Effort Management
**Goal**: Users can track business-development work as outreach efforts grouped by option or type rather than as a CRM pipeline.
**Depends on**: Phase 2
**Requirements**: OUT-01, OUT-02, OUT-03, OUT-04, OUT-05, OUT-06
**Success Criteria** (what must be TRUE):
  1. User can create outreach efforts for options such as 1:1 conversation, LinkedIn post, referral, proposal, or community activity.
  2. User can record outreach status, progress notes, next action, follow-up date, and outcome.
  3. User can log manual outreach activity with date, type, summary, and related contact or context.
  4. User can close or cancel outreach efforts with distinct outcome or cancellation notes.
  5. User can view and filter outreach by effort type, status, follow-up date, blocked state, and terminal outcome without using pipeline stages.
**Plans**: TBD
**UI hint**: yes

### Phase 4: Blocker Center
**Goal**: Users can manage blockers as first-class records linked to stream work or outreach efforts.
**Depends on**: Phase 3
**Requirements**: BLK-01, BLK-02, BLK-03, BLK-04, BLK-05, BLK-06
**Success Criteria** (what must be TRUE):
  1. User can create blockers with reason, owner-to-unblock, affected record, severity/type, and next check date.
  2. User can link blockers to either workstream items or outreach efforts.
  3. User can see how long each blocker has been open and what action is needed to unblock it.
  4. User can resolve blockers with resolution notes and resolved date.
  5. User is prevented or clearly warned before closing records that still have open blockers, and can review all active blockers in one blocker center.
**Plans**: TBD
**UI hint**: yes

### Phase 5: Delegation and Collaboration Follow-Up
**Goal**: Users can preserve accountability and handoff context for delegated or collaborative work.
**Depends on**: Phase 4
**Requirements**: DLG-01, DLG-02, DLG-03, DLG-04, DLG-05, DLG-06
**Success Criteria** (what must be TRUE):
  1. User can create people records for owners, delegates, collaborators, or client contacts.
  2. User can assign exactly one accountable owner to each work item or outreach effort.
  3. User can add delegates or collaborators separately from the accountable owner.
  4. User can record handoff notes, expected output, waiting-on state, and follow-up date for delegated work.
  5. User can open a delegation follow-up queue and, when collaborator access is enabled, collaborators can access only authorized workspace records.
**Plans**: TBD
**UI hint**: yes

### Phase 6: Attention Command Center and Operating Review
**Goal**: Users can rely on one unified view to decide what needs attention next across streams, outreach, blockers, and delegated work.
**Depends on**: Phase 5
**Requirements**: ATT-01, ATT-02, ATT-03, ATT-04, ATT-05, ATT-06, ATT-07
**Success Criteria** (what must be TRUE):
  1. User can open a unified Today or Needs Attention view across streams, outreach, blockers, and delegated work.
  2. User can see records ranked by overdue follow-up, due date, blocker age, waiting-on state, stale activity, and priority.
  3. User can see summary counters for active, waiting, blocked, closed, and cancelled work across domains.
  4. User can filter the attention view by stream, outreach type, status, blocked state, owner/collaborator, waiting-on, and date.
  5. User can identify stale items, run an operating review of recent and upcoming work, and create durable in-app reminders for next actions or follow-ups.
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation, Auth, and Lifecycle | 0/TBD | Not started | - |
| 2. Workstream Management | 0/TBD | Not started | - |
| 3. Outreach Effort Management | 0/TBD | Not started | - |
| 4. Blocker Center | 0/TBD | Not started | - |
| 5. Delegation and Collaboration Follow-Up | 0/TBD | Not started | - |
| 6. Attention Command Center and Operating Review | 0/TBD | Not started | - |
