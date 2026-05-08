# Freelancer Workstream Toolkit

## What This Is

A focused freelancer operating toolkit for managing three separate work streams, called A, B, and C, alongside outreach efforts. It helps a freelancer see what needs attention across client/project work, outreach options, blockers, and delegated or collaborative tasks without turning v1 into an invoicing or accounting product.

The product is for a freelancer who wants one practical workspace for delivery and business development: active work streams, outreach effort tracking, progress/status, blockers, and collaboration handoffs.

## Core Value

The freelancer can always see the next useful action across work streams, outreach efforts, blockers, and delegated work.

## Requirements

### Validated

(None yet - ship to validate)

### Active

- [ ] User can manage three distinct work streams: A, B, and C.
- [ ] User can create and track work items, deadlines, statuses, blockers, and next actions inside each work stream.
- [ ] User can manage outreach efforts by type or option, such as 1:1 conversations, LinkedIn posts, and other channels.
- [ ] User can track progress and status for every effort, including active, blocked, closed, and cancelled states.
- [ ] User can record blockers and resolution notes for workstream items and outreach efforts.
- [ ] User can manage delegated or collaborative work, including owners, collaborators, handoff notes, and follow-up needs.
- [ ] User can view a unified picture of what needs attention next across streams, outreach, blockers, and delegated work.

### Out of Scope

- Invoices, payments, and accounting - explicitly deferred so v1 focuses on operational clarity.
- Full CRM sales pipeline/Kanban board - outreach is modeled as effort types/options, not a stage-based sales board.
- Automated email, DM, or LinkedIn sending - v1 can track outreach manually without external sending integrations.
- Team chat or real-time messaging - collaboration support is task/delegation oriented, not a communication platform.

## Context

The initial idea is a freelancer toolkit to manage different work streams and outreach efforts. The desired workstream model is intentionally constrained to three separate streams named A, B, and C, which keeps v1 concrete and avoids a sprawling project management system.

Outreach is not a Kanban pipeline. It should support different outreach options or effort types, for example 1:1 conversations and LinkedIn posts. Each effort needs progress/status tracking, including closed and cancelled outcomes, plus blocker tracking.

Delegation and collaboration are first-class concerns. The freelancer may work with others, assign or delegate pieces of work, track collaborator responsibilities, and preserve handoff/follow-up context.

## Constraints

- **Scope**: No invoices in v1 - the first release is about operating the work, not financial administration.
- **Workflow model**: Exactly three named work streams for v1 - this keeps the initial product focused and easy to reason about.
- **Outreach model**: Outreach is option/type based rather than a Kanban pipeline - the UI and data model should avoid assuming linear CRM stages.
- **Collaboration**: Delegation support must be present in v1 - the tool should not assume the freelancer always works alone.
- **Status design**: Closed and cancelled are required terminal states - completion and intentional abandonment must be distinguishable.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Model v1 around streams A, B, and C | User wants three separate work streams rather than unlimited project spaces | - Pending |
| Exclude invoicing from v1 | Keeps the first release focused on work management and outreach | - Pending |
| Model outreach as effort types/options | User explicitly does not want a Kanban pipeline for outreach | - Pending |
| Include collaboration/delegation in v1 | User wants space to manage work with others, not only solo execution | - Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check - still the right priority?
3. Audit Out of Scope - reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-30 after initialization*
