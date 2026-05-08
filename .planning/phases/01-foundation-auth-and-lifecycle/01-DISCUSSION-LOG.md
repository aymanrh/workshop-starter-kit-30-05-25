# Phase 1: Foundation, Auth, and Lifecycle - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md - this log preserves the alternatives considered.

**Date:** 2026-04-30
**Phase:** 1-Foundation, Auth, and Lifecycle
**Areas discussed:** Lifecycle Semantics

---

## Area Selection

| Option | Description | Selected |
|--------|-------------|----------|
| Workspace access model | How strict workspace membership and collaboration foundations should be in phase 1; affects Supabase RLS, membership tables, and future scoped collaborator access. | |
| Lifecycle semantics | What active, waiting, blocked, closed, and cancelled mean at the shared foundation layer; affects status rules for stream work and outreach. | yes |
| Terminal outcome details | What reason/outcome data should be required when closing or cancelling records; affects schema, forms, and audit history. | |
| Activity history granularity | How detailed the foundational event log should be for status, ownership, blocker, and delegation changes; affects later inspection. | |
| Initial workspace experience | What a newly signed-in user should see in phase 1 before full workstream management exists. | |

**User's choice:** 2
**Notes:** User chose to discuss lifecycle semantics only.

---

## Lifecycle Semantics

### Status Meaning

| Option | Description | Selected |
|--------|-------------|----------|
| Strict shared meanings | active means progressing; waiting means paused on another person/date/event; blocked means cannot progress until a blocker is resolved; closed means completed with outcome; cancelled means intentionally abandoned. | yes |
| Looser meanings per record type | Workstream and outreach can interpret statuses differently. | |
| the agent decides | Planner/implementer chooses the approach. | |

**User's choice:** All recommended options.
**Notes:** Captured as D-01.

### Allowed Transitions

| Option | Description | Selected |
|--------|-------------|----------|
| Flexible non-terminal movement | Any non-terminal status can move to any other non-terminal status; any non-terminal status can close/cancel; closed/cancelled are terminal unless explicitly reopened later. | yes |
| Strict workflow | active -> waiting/blocked -> active -> closed/cancelled, with fewer direct jumps. | |
| the agent decides | Planner/implementer chooses the approach. | |

**User's choice:** All recommended options.
**Notes:** Captured as D-02 and D-03.

### Blocked Status Relationship

| Option | Description | Selected |
|--------|-------------|----------|
| Blocked exists now | blocked is a lifecycle status now, and later blocker records explain why; Phase 1 supports blocked before the full Blocker Center exists. | yes |
| Blocked waits for Phase 4 | blocked only becomes possible once first-class blocker records exist. | |
| the agent decides | Planner/implementer chooses the approach. | |

**User's choice:** All recommended options.
**Notes:** Captured as D-04.

### Waiting vs Blocked Distinction

| Option | Description | Selected |
|--------|-------------|----------|
| Keep a crisp distinction | waiting means not actionable but expected to resume; blocked means cannot move until an explicit impediment is resolved. | yes |
| Mostly the same | Treat waiting and blocked as mostly the same for v1, with wording differences only. | |
| the agent decides | Planner/implementer chooses the approach. | |

**User's choice:** All recommended options.
**Notes:** Captured as D-05.

---

## the agent's Discretion

- Workspace access model details.
- Terminal outcome detail validation beyond roadmap requirements.
- Activity history granularity.
- Initial signed-in workspace experience.
- Reopen behavior, unless planning determines it is required to satisfy terminal lifecycle semantics.

## Deferred Ideas

None.
