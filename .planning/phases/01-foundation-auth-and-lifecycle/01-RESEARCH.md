# Phase 1: Foundation, Auth, and Lifecycle - Research

**Researched:** 2026-04-30
**Domain:** Next.js App Router + Supabase Auth/RLS foundation for workspace-scoped lifecycle records
**Confidence:** HIGH for stack/auth/RLS patterns, MEDIUM-HIGH for exact foundation schema shape

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
## Implementation Decisions

### Lifecycle Semantics
- **D-01:** Use strict shared lifecycle meanings across all foundational record types. `active` means progressing; `waiting` means paused on another person, date, or event; `blocked` means progress cannot continue until an impediment is resolved; `closed` means completed with an outcome; `cancelled` means intentionally abandoned.
- **D-02:** Allow flexible movement among non-terminal statuses. Any non-terminal status can move to any other non-terminal status, and any non-terminal status can become `closed` or `cancelled`.
- **D-03:** Treat `closed` and `cancelled` as terminal states unless an explicit reopen capability is added later. Reopening behavior is not part of the locked decision for Phase 1.
- **D-04:** Include `blocked` as a lifecycle status in the foundation. Later first-class blocker records will explain blocked state in more detail, but Phase 1 should already support the status.
- **D-05:** Keep `waiting` and `blocked` meaningfully distinct. `waiting` means not currently actionable but expected to resume; `blocked` means an explicit impediment must be resolved before the record can progress.

### Claude's Discretion
- Workspace membership table shape, Supabase RLS policy details, auth UI flow, initial signed-in workspace screen, terminal outcome field validation, and activity event granularity are left to downstream research and planning, as long as they satisfy the roadmap and requirements.
- If implementation needs default status behavior, use `active` as the normal created/default state unless planning finds a stronger codebase or product reason otherwise.

### Deferred Ideas (OUT OF SCOPE)
## Deferred Ideas

None - discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FND-01 | User can sign in and access a private workspace for their freelancer operations data. | Use Supabase Auth with `@supabase/ssr`, server/browser clients, and Next.js Proxy token refresh. |
| FND-02 | Workspace data is scoped so only authorized workspace members can read or change records. | Use `workspace_members` as the RLS authorization root; enable RLS on every exposed table; policies use `to authenticated` and membership `exists` checks. |
| FND-03 | The system provides exactly three fixed work streams: A, B, and C. | Seed `workspace_streams` with exactly A/B/C per workspace and constrain stream keys with a database enum/check plus unique `(workspace_id, key)`. |
| FND-04 | The system uses a shared record lifecycle for stream work and outreach efforts. | Use shared `work_records` lifecycle fields with `kind` distinguishing `stream_work` and `outreach_effort`; detail tables can be added or stubbed by later phases. |
| FND-05 | The system supports controlled statuses: active, waiting, blocked, closed, and cancelled. | Use a Postgres enum/check and matching Zod/TypeScript constants; do not use free-text statuses. |
| FND-06 | Closed and cancelled records are distinct terminal outcomes with timestamps and reason/outcome notes. | Use database constraints tying `status` to `closed_at`/`closed_outcome` or `cancelled_at`/`cancel_reason`; reject ambiguous terminal states. |
| FND-07 | The system records meaningful activity events for status, ownership, blocker, and delegation changes. | Add append-only `activity_events` with workspace, actor, entity, event type, before/after payloads, and optional note. |
</phase_requirements>

## Summary

Phase 1 should build the secure spine of the product, not a broad CRUD app. The planner should treat Supabase Auth, workspace membership, RLS, fixed stream seeding, lifecycle constraints, and activity logging as one foundation because later workstream, outreach, blocker, delegation, and attention phases all depend on those contracts.

The recommended data model is a small RLS-first relational core: `profiles`, `workspaces`, `workspace_members`, `workspace_streams`, `work_records`, and `activity_events`. `work_records` should carry the shared lifecycle for both `stream_work` and `outreach_effort`, while later phases add richer domain detail tables. Store terminal outcome fields directly on the shared record so closed/cancelled semantics cannot drift between domains.

**Primary recommendation:** Use Next.js App Router with Supabase Auth/RLS and database-enforced lifecycle/workspace constraints before building feature-specific management screens.

## Project Constraints (from CLAUDE.md)

- The product is a focused freelancer operating toolkit for three work streams A, B, and C plus outreach, blockers, and delegation.
- No invoices, payments, or accounting in v1.
- Exactly three named work streams for v1; avoid unlimited projects or custom stream creation.
- Outreach is effort/type based, not a CRM/Kanban sales pipeline.
- Delegation support must be present in v1; do not assume the freelancer always works alone.
- Closed and cancelled are required terminal states and must remain distinguishable.
- Recommended stack is Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui, Supabase Auth/Postgres/RLS, and generated Supabase database types.
- Authorization should be workspace-membership centered and enforced with Supabase RLS.
- Do not use `@supabase/auth-helpers-nextjs`; use `@supabase/ssr`.
- Do not default to Prisma/Drizzle in v1; use Supabase client, generated database types, and SQL migrations.
- Before file-changing implementation work, use the GSD workflow entry points unless the user explicitly bypasses them.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 16.2.4, modified 2026-04-29 | Full-stack React app, routing, server components, server actions, route handlers | Official App Router supports the server/client composition needed for authenticated workspace views. |
| React | 19.2.5, modified 2026-04-28 | UI runtime | Current Next.js baseline. |
| TypeScript | 6.0.3, modified 2026-04-16 | Type safety for lifecycle/status/workspace contracts | Prevents drift between stream keys, statuses, event types, and UI forms. |
| `@supabase/supabase-js` | 2.105.1, modified 2026-04-29 | Typed Supabase client | Integrates Auth, Postgres, and RLS-backed browser/server data access. |
| `@supabase/ssr` | 0.10.2, modified 2026-04-23 | Cookie-aware Supabase clients for SSR | Official Supabase SSR path for Next.js server/browser clients and cookie sessions. |
| Supabase CLI package `supabase` | 2.95.6, modified 2026-04-28 | Migrations, local stack, generated types | Official path for schema migrations and `database.types.ts`; can run through `npx`. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Tailwind CSS | 4.2.4, modified 2026-04-29 | Utility CSS | Initial application shell and dense workspace UI. |
| shadcn CLI/package | 4.6.0, modified 2026-04-28 | Install copied UI components | Auth forms, buttons, dialogs, tabs, selects, tables. |
| lucide-react | 1.14.0, modified 2026-04-29 | Icons | Navigation and compact action/status controls. |
| Zod | 4.4.1, modified 2026-04-30 | Runtime validation and inferred types | Status transitions, terminal notes, route/server action inputs. |
| React Hook Form | 7.74.0, modified 2026-04-25 | Form state | Sign-in, workspace setup, terminal-state forms. |
| `@hookform/resolvers` | 5.2.2, modified 2025-09-14 | Zod integration for forms | Connect React Hook Form to Zod schemas. |
| date-fns | 4.1.0, modified 2025-08-03 | Date formatting/math | Display terminal timestamps and activity history dates. |
| Vitest | 4.1.5, modified 2026-04-23 | Unit tests | Lifecycle policy, Zod validators, activity event construction. |
| Playwright | 1.59.1, modified 2026-04-30 | E2E tests | Sign-in and RLS smoke flows if validation is enabled later. |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Supabase Auth/RLS | Auth.js + app-layer authorization | More app control, but loses database-level defense in depth and increases risk of workspace leakage. |
| SQL migrations + generated types | Prisma or Drizzle | Useful later for richer query ergonomics, but adds abstraction before the RLS-first schema stabilizes. |
| Fixed `workspace_streams` seed/config | User-created projects | Violates the v1 constraint; defer customization. |
| Shared lifecycle enum | Per-domain status enums | Easier local wording, but breaks FND-04/FND-05 and makes attention filters unreliable. |

**Installation:**

```bash
npx create-next-app@latest . --typescript --eslint --tailwind --src-dir --app --import-alias="@/*"
npm install @supabase/supabase-js @supabase/ssr zod react-hook-form @hookform/resolvers date-fns
npm install lucide-react
npx shadcn@latest init
npm install -D supabase vitest @playwright/test
```

**Version verification:** Versions above were verified with `npm view <package> version time.modified` on 2026-04-30.

## Architecture Patterns

### Recommended Project Structure

```text
src/
├── app/
│   ├── (auth)/login/           # Sign-in screen
│   ├── (workspace)/layout.tsx  # Authenticated workspace shell
│   ├── (workspace)/page.tsx    # Initial signed-in workspace overview
│   └── auth/callback/          # Supabase auth callback route if using email/OAuth
├── components/ui/              # shadcn/ui copied components
├── lib/
│   ├── supabase/               # browser/server client factories and proxy update helper
│   ├── auth/                   # requireUser, requireWorkspace helpers
│   └── db.types.ts             # generated Supabase types
├── domains/
│   ├── lifecycle/              # status constants, terminal validation, transition helpers
│   ├── workspace/              # workspace/member queries and stream bootstrap
│   └── activity/               # event type constants and append helpers
├── features/
│   └── foundation/             # initial overview and setup UI
└── tests/
    ├── lifecycle/
    └── rls/
```

### Pattern 1: Supabase SSR Clients

**What:** Create separate browser and server Supabase clients in `src/lib/supabase`, plus a Next.js `proxy.ts` to refresh auth cookies.
**When to use:** Every authenticated page, server action, and route handler.
**Example:**

```typescript
// Source: Supabase SSR docs
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );
}
```

### Pattern 2: Workspace Membership as Authorization Root

**What:** Every workspace-owned table carries `workspace_id`; RLS checks membership through `workspace_members`.
**When to use:** All reads/writes of streams, records, and activity events.
**Example:**

```sql
-- Source: Supabase RLS docs, adapted to workspace membership
create policy "members can read workspace records"
on public.work_records
for select
to authenticated
using (
  exists (
    select 1
    from public.workspace_members wm
    where wm.workspace_id = work_records.workspace_id
      and wm.user_id = (select auth.uid())
  )
);
```

### Pattern 3: Database-Enforced Shared Lifecycle

**What:** Use one controlled status set and constraints tying terminal statuses to their required fields.
**When to use:** `work_records` and any later table that participates in the shared lifecycle.
**Example:**

```sql
create type public.record_status as enum (
  'active',
  'waiting',
  'blocked',
  'closed',
  'cancelled'
);

create type public.record_kind as enum (
  'stream_work',
  'outreach_effort'
);

create table public.work_records (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  kind public.record_kind not null,
  title text not null check (char_length(trim(title)) > 0),
  status public.record_status not null default 'active',
  owner_member_id uuid references public.workspace_members(id),
  closed_at timestamptz,
  closed_outcome text,
  cancelled_at timestamptz,
  cancel_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (status = 'closed' and closed_at is not null and nullif(trim(closed_outcome), '') is not null and cancelled_at is null and cancel_reason is null)
    or
    (status = 'cancelled' and cancelled_at is not null and nullif(trim(cancel_reason), '') is not null and closed_at is null and closed_outcome is null)
    or
    (status in ('active', 'waiting', 'blocked') and closed_at is null and closed_outcome is null and cancelled_at is null and cancel_reason is null)
  )
);
```

### Pattern 4: Fixed Stream Seed With Constraints

**What:** Represent streams as fixed per-workspace rows keyed by A/B/C, not user-created projects.
**When to use:** Workspace bootstrap after sign-up and any stream-scoped query.
**Example:**

```sql
create table public.workspace_streams (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  key text not null check (key in ('A', 'B', 'C')),
  name text not null check (name in ('A', 'B', 'C')),
  sort_order int not null check (sort_order between 1 and 3),
  primary key (workspace_id, key),
  unique (workspace_id, sort_order)
);

insert into public.workspace_streams (workspace_id, key, name, sort_order)
values
  (:workspace_id, 'A', 'A', 1),
  (:workspace_id, 'B', 'B', 2),
  (:workspace_id, 'C', 'C', 3);
```

### Pattern 5: Append-Only Activity Events

**What:** Log meaningful state changes without making activity history the source of current state.
**When to use:** Status, owner, blocker, delegation, and terminal outcome changes.
**Example:**

```sql
create type public.activity_event_type as enum (
  'status_changed',
  'owner_changed',
  'blocker_changed',
  'delegation_changed'
);

create table public.activity_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  actor_user_id uuid references auth.users(id),
  entity_table text not null,
  entity_id uuid not null,
  event_type public.activity_event_type not null,
  before jsonb,
  after jsonb,
  note text,
  created_at timestamptz not null default now()
);
```

### Anti-Patterns to Avoid

- **Client-side authorization filters:** UI filtering by workspace is not security. Enforce membership in RLS.
- **Free-text status fields:** They will break FND-04/FND-05 and make terminal states ambiguous.
- **One generic `tasks` table with nullable everything:** Use shared lifecycle fields, but preserve typed `kind` and later detail tables.
- **Treating streams as projects:** Do not add stream creation, deletion, custom workflow, or nested project concepts in Phase 1.
- **Using Next.js Proxy as full authorization:** Proxy can redirect unauthenticated users, but record access must be enforced in server helpers and RLS.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Authentication/session cookies | Custom auth, password storage, JWT refresh | Supabase Auth + `@supabase/ssr` | Avoids security-critical auth implementation and works across server/client rendering. |
| Row-level authorization | Per-page workspace filters | Supabase RLS policies | Protects data even if a browser client or API call is manipulated. |
| Schema/type drift | Manual TypeScript DB types | Supabase generated types | Types reflect the actual database schema. |
| Lifecycle validation | Scattered UI conditionals | DB constraints + Zod + domain transition helper | Prevents invalid terminal records from entering the database. |
| UI primitives | Custom dialogs/forms/selects | shadcn/ui + Tailwind | Faster consistent internal-tool UI with accessible primitives. |

**Key insight:** Phase 1 is mostly about durable contracts. Anything implemented only in UI code will be bypassed by future server actions, route handlers, or direct Supabase client calls.

## Common Pitfalls

### Pitfall 1: RLS Tables Without Matching Grants and Policies
**What goes wrong:** Tables exist, but users cannot read/update them, or worse, exposed tables are accessible too broadly.
**Why it happens:** Raw SQL migrations require explicit RLS enablement, grants, and policies.
**How to avoid:** For each public table, include `alter table ... enable row level security`, grants for intended roles, select/insert/update policies, and RLS tests.
**Warning signs:** App only works with service-role keys or server-only bypasses.

### Pitfall 2: Recursive Workspace Member Policies
**What goes wrong:** Policies on `workspace_members` query `workspace_members` in ways that recurse or become slow.
**Why it happens:** Membership is both the protected table and the authorization source.
**How to avoid:** Keep `workspace_members` policies simple; consider a private `security definer` helper such as `private.is_workspace_member(workspace_id uuid)` if policies become complex. Do not put security-definer helpers in exposed schemas.
**Warning signs:** RLS errors mentioning infinite recursion or membership queries timing out.

### Pitfall 3: Auth Session Trusted From Cookies Alone
**What goes wrong:** Server code treats a spoofable cookie session as proof of identity.
**Why it happens:** Supabase SSR cookies make sessions available, but server validation still matters.
**How to avoid:** Use Supabase's current guidance: protect server routes/data with validated auth claims/user calls, not raw `getSession()` inside server code.
**Warning signs:** Route guards only check whether cookie names exist.

### Pitfall 4: Terminal States Without Database Constraints
**What goes wrong:** A record can be `closed` without an outcome, `cancelled` without a reason, or both `closed_at` and `cancelled_at`.
**Why it happens:** Terminal requirements are implemented only in form code.
**How to avoid:** Add database check constraints and matching Zod schemas. Use one transition action that writes status, timestamp, note, and activity event together.
**Warning signs:** Manual SQL or later server actions can create ambiguous terminal records.

### Pitfall 5: Activity History as Unstructured Notes
**What goes wrong:** The user cannot inspect meaningful status/ownership/blocker/delegation history.
**Why it happens:** Comments are easier to build than event logs.
**How to avoid:** Record structured `activity_events` for the four required change categories, with actor, timestamp, before/after, and note.
**Warning signs:** Activity feed cannot filter status changes or explain who changed ownership.

## Code Examples

Verified patterns from official sources:

### Zod Lifecycle Constants

```typescript
export const recordStatuses = [
  "active",
  "waiting",
  "blocked",
  "closed",
  "cancelled",
] as const;

export const recordStatusSchema = z.enum(recordStatuses);

export const terminalTransitionSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("closed"),
    outcome: z.string().trim().min(1),
  }),
  z.object({
    status: z.literal("cancelled"),
    reason: z.string().trim().min(1),
  }),
]);
```

### Status Transition Helper

```typescript
type RecordStatus = (typeof recordStatuses)[number];

export function assertCanTransition(current: RecordStatus, next: RecordStatus) {
  if (current === "closed" || current === "cancelled") {
    throw new Error("Terminal records cannot change status without a future reopen flow.");
  }

  return next;
}
```

### Workspace-Scoped Query Helper

```typescript
export async function requireWorkspace(workspaceId: string) {
  const supabase = await createClient();
  const { data: claims, error } = await supabase.auth.getClaims();

  if (error || !claims?.claims.sub) {
    redirect("/login");
  }

  const { data: membership } = await supabase
    .from("workspace_members")
    .select("id, role")
    .eq("workspace_id", workspaceId)
    .eq("user_id", claims.claims.sub)
    .single();

  if (!membership) {
    notFound();
  }

  return { supabase, userId: claims.claims.sub, membership };
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@supabase/auth-helpers-nextjs` | `@supabase/ssr` with browser/server clients | Supabase docs now direct SSR users to `@supabase/ssr`; local stack research marks auth helpers deprecated | Planner should not install auth helpers. |
| `middleware.ts` terminology in Next.js | `proxy.ts` terminology in Next.js 16 | Next.js Proxy docs updated 2026-03-31 | Use `proxy.ts` naming for new Next.js 16 projects. |
| RLS policies without explicit role scope | Policies `to authenticated` plus `(select auth.uid())` | Current Supabase RLS performance guidance | Better clarity and performance. |
| Views assuming underlying RLS applies | `security_invoker = true` views on Postgres 15+ | Current Supabase RLS docs | Important for later attention views and dashboards. |

**Deprecated/outdated:**

- `@supabase/auth-helpers-nextjs`: avoid; use `@supabase/ssr`.
- Browser-exposed service-role keys: never use; service keys bypass RLS and must remain server-only/admin-only.
- Client-only workspace filters: not authorization.

## Open Questions

1. **Auth method for first implementation**
   - What we know: Supabase supports multiple sign-in methods; Phase 1 only requires sign-in and private workspace access.
   - What's unclear: Whether to use email magic link, email/password, or OAuth.
   - Recommendation: Plan the simplest Supabase-supported email flow first, with UI isolated so providers can change later.

2. **Workspace creation rule**
   - What we know: The product is likely private and single-freelancer first, but workspace membership must exist for future collaboration.
   - What's unclear: Whether every new user auto-creates one workspace or accepts invites later.
   - Recommendation: Phase 1 should auto-create one workspace and three streams for the first signed-in user; invite flows can be deferred.

3. **Owner model before Phase 5 people/delegation**
   - What we know: Activity must record ownership changes in Phase 1, and delegation is v1.
   - What's unclear: Whether `owner_member_id` is enough until people/collaborator records exist.
   - Recommendation: Use workspace member ownership now; add `people`/delegation detail later without changing `work_records.status`.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Node.js | Next.js app and tooling | yes | v24.14.1 | None needed |
| npm | Package install and `npx` CLIs | yes | 11.11.0 | None needed |
| git | GSD doc commit and source control | yes | 2.39.5 | None needed |
| Docker | Supabase local stack | no | - | Install Docker Desktop or use a remote Supabase project for early schema work |
| Supabase CLI global | Migrations/types/local stack | no | - | Use `npx supabase@2.95.6`, but local stack still needs Docker |
| Vercel CLI global | Optional deployment | no | - | Use Vercel dashboard/Git integration or `npx vercel` later |

**Missing dependencies with no fallback:**

- Docker is required for `supabase start` local development. Without Docker, local Supabase auth/database testing is blocked unless the planner uses a remote Supabase project.

**Missing dependencies with fallback:**

- Supabase CLI global is missing; use `npx supabase@2.95.6`.
- Vercel CLI global is missing; deployment can wait or use `npx vercel`.

## Sources

### Primary (HIGH confidence)

- Supabase SSR client docs - cookie-based server/browser clients, Next.js Proxy token refresh, and `getClaims()` guidance: https://supabase.com/docs/guides/auth/server-side/creating-a-client
- Supabase RLS docs - enabling RLS, authenticated policies, `with check`, view `security_invoker`, service key warnings, and performance recommendations: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase generated types docs - CLI-generated TypeScript types from local or linked schemas: https://supabase.com/docs/guides/api/rest/generating-types
- Supabase local development docs - migrations, `db reset`, `migration up`, `db push`: https://supabase.com/docs/guides/local-development/overview
- Next.js App Router docs - project structure, server/client components, route conventions: https://nextjs.org/docs/app
- Next.js Proxy docs - Middleware renamed to Proxy in Next.js 16 and current use cases: https://nextjs.org/docs/app/getting-started/proxy
- npm registry lookups on 2026-04-30 - package versions and publish modified timestamps for all Standard Stack entries.

### Secondary (MEDIUM confidence)

- Existing project research in `.planning/research/STACK.md`, `.planning/research/ARCHITECTURE.md`, and `.planning/research/PITFALLS.md`.
- OWASP Broken Access Control guidance cited by project research for deny-by-default and record ownership enforcement.

### Tertiary (LOW confidence)

- None used for prescriptive findings.

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - verified against npm registry and official Next.js/Supabase docs on 2026-04-30.
- Architecture: MEDIUM-HIGH - module boundaries are strongly supported by project research; exact schema may need implementation adjustment once Supabase migrations are written.
- Pitfalls: HIGH for auth/RLS/lifecycle pitfalls; MEDIUM for future delegation owner shape because later phases may expand collaborator access.

**Research date:** 2026-04-30
**Valid until:** 2026-05-30 for stack versions; 2026-05-14 for Supabase/Next.js SSR details because both are fast-moving.
