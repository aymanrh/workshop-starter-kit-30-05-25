# Phase 1: Foundation, Auth, and Lifecycle - Context

**Gathered:** 2026-04-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 1 delivers the secure private workspace foundation for the Freelancer Workstream Toolkit: sign-in, authorized workspace access, exactly three fixed streams named A, B, and C, shared lifecycle statuses, distinct terminal outcomes, and meaningful activity history. Full workstream item management, outreach management, blocker center workflows, delegation queues, and attention dashboards are later phases.

</domain>

<decisions>
## Implementation Decisions

### Lifecycle Semantics
- **D-01:** Use strict shared lifecycle meanings across all foundational record types. `active` means progressing; `waiting` means paused on another person, date, or event; `blocked` means progress cannot continue until an impediment is resolved; `closed` means completed with an outcome; `cancelled` means intentionally abandoned.
- **D-02:** Allow flexible movement among non-terminal statuses. Any non-terminal status can move to any other non-terminal status, and any non-terminal status can become `closed` or `cancelled`.
- **D-03:** Treat `closed` and `cancelled` as terminal states unless an explicit reopen capability is added later. Reopening behavior is not part of the locked decision for Phase 1.
- **D-04:** Include `blocked` as a lifecycle status in the foundation. Later first-class blocker records will explain blocked state in more detail, but Phase 1 should already support the status.
- **D-05:** Keep `waiting` and `blocked` meaningfully distinct. `waiting` means not currently actionable but expected to resume; `blocked` means an explicit impediment must be resolved before the record can progress.

### the agent's Discretion
- Workspace membership table shape, Supabase RLS policy details, auth UI flow, initial signed-in workspace screen, terminal outcome field validation, and activity event granularity are left to downstream research and planning, as long as they satisfy the roadmap and requirements.
- If implementation needs default status behavior, use `active` as the normal created/default state unless planning finds a stronger codebase or product reason otherwise.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project and Requirements
- `.planning/ROADMAP.md` - Phase 1 goal, requirements, and success criteria.
- `.planning/REQUIREMENTS.md` - FND-01 through FND-07, shared lifecycle, terminal outcome, and activity history requirements.
- `.planning/PROJECT.md` - Product boundaries, v1 constraints, and out-of-scope decisions.
- `.planning/STATE.md` - Current project status and implementation concerns.

### Research Context
- `.planning/research/STACK.md` - Recommended stack, especially Next.js App Router, Supabase Auth, Supabase RLS, generated types, and no ORM by default.
- `.planning/research/SUMMARY.md` - Research synthesis for the initial project direction.
- `.planning/research/ARCHITECTURE.md` - Architectural context if planning needs deeper structure guidance.
- `.planning/research/PITFALLS.md` - Risks around auth, RLS, lifecycle, and foundation design.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- No application source files exist yet. The repo currently contains planning artifacts and `CLAUDE.md`.
- `CLAUDE.md` embeds stack research and project constraints that should guide initial scaffolding.

### Established Patterns
- Recommended stack is Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui, Supabase Auth/Postgres/RLS, and generated Supabase database types.
- Authorization should be workspace-membership centered and enforced with Supabase RLS.
- The v1 stream model is fixed as exactly A, B, and C; do not introduce custom stream creation.
- Outreach should remain effort/type based, not a CRM pipeline.

### Integration Points
- Foundation work should establish auth/session handling, workspace membership, fixed stream seed/config, shared lifecycle enums or constraints, terminal state fields, and activity event storage for later feature modules.
- Future phases will depend on this lifecycle for stream work, outreach efforts, blockers, delegation, and attention views.

</code_context>

<specifics>
## Specific Ideas

- The user selected the recommended lifecycle semantics for all lifecycle questions.
- No external product references were provided.

</specifics>

<deferred>
## Deferred Ideas

None - discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation-auth-and-lifecycle*
*Context gathered: 2026-04-30*
