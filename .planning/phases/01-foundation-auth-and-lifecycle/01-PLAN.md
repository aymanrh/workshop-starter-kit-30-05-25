# Phase 1: Foundation, Auth, and Lifecycle — Plan

**Created:** 2026-04-30
**Phase goal:** Users can securely access a private freelancer workspace whose records obey the fixed A/B/C stream model and shared lifecycle rules.
**Requirements covered:** FND-01, FND-02, FND-03, FND-04, FND-05, FND-06, FND-07

---

## Scope Note

This phase produces a working Next.js scaffold with localStorage-backed data, shared lifecycle logic, fixed streams, and status transitions. Supabase auth, RLS, and real database persistence are deferred to Milestone 2. The goal here is to validate the lifecycle model and A/B/C stream structure with a running UI before wiring real infrastructure.

---

## Tasks

### Task 1 — Project scaffold and type definitions
**Files:** `src/types/index.ts`, `src/app/layout.tsx`, `src/app/globals.css`

- Create Next.js App Router project with TypeScript and Tailwind CSS
- Define `Status` union type: `'active' | 'waiting' | 'blocked' | 'closed' | 'cancelled'`
- Define `StreamId` union type: `'A' | 'B' | 'C'`
- Define `WorkItem` interface: `id`, `title`, `notes`, `status`, `stream`, `createdAt`, `updatedAt`
- Define `Stream` interface: `id`, `name`, `description`, `items`

**Done when:** Types compile without errors and the dev server starts.

---

### Task 2 — Lifecycle logic module
**Files:** `src/lib/lifecycle.ts`

- Implement `canTransition(from, to)`: returns `false` if `from === to`, `false` if `from` is terminal, `true` otherwise
- Implement `getValidTransitions(from)`: returns all statuses valid to transition to from `from`
- Implement `statusLabel(status)`: human-readable label per status
- Implement `statusColor(status)`: Tailwind class string per status for visual distinction
- Use an exhaustive `Record<Status, boolean>` for terminal detection so adding a new status without updating the map is a TypeScript error

**Done when:** Unit tests for `canTransition` and `getValidTransitions` pass for all terminal and non-terminal cases.

---

### Task 3 — Mock data and localStorage persistence
**Files:** `src/lib/mockData.ts`, `src/lib/useWorkItems.ts`

- Seed three streams A, B, C with representative work items across all five statuses
- Implement `useWorkItems` hook backed by `localStorage` for read/write across page refreshes
- Expose `createItem`, `updateStatus` operations from the hook
- Use `WorkItem` and `StreamId` types throughout; no raw string status values

**Done when:** Items persist across browser refreshes and mock data covers all five statuses in at least one stream.

---

### Task 4 — Stream tabs and navigation
**Files:** `src/components/StreamTabs.tsx`, `src/app/streams/page.tsx`, `src/app/streams/[stream]/page.tsx`

- Render exactly three tabs: A, B, C
- Active tab highlights the selected stream
- `/streams` redirects to `/streams/A` as default
- Each stream page renders the items for that stream only
- No custom stream creation controls

**Done when:** Navigating between tabs shows only the correct stream's items; unknown stream params show an empty or redirect state.

---

### Task 5 — Work item card and status badge
**Files:** `src/components/WorkItemCard.tsx`, `src/components/StatusBadge.tsx`

- `StatusBadge` renders the status label with the correct Tailwind color class from `statusColor`
- `WorkItemCard` displays title, notes, stream badge, status badge, and a status change control
- Status change control shows only valid transitions (from `getValidTransitions`); terminal items show no transition options
- Changing status calls `updateStatus` from the hook

**Done when:** Cards for closed/cancelled items show no transition dropdown; active items show all four other statuses as options.

---

### Task 6 — Create work item form
**Files:** `src/components/CreateWorkItemForm.tsx`

- Form fields: title (required), notes (optional)
- New items default to `status: 'active'` and inherit the current stream from the URL param
- On submit: calls `createItem` from the hook and clears the form
- No date, priority, or owner fields in Phase 1

**Done when:** Submitting the form adds an item to the correct stream with `active` status and the item persists on refresh.

---

### Task 7 — Home page redirect
**Files:** `src/app/page.tsx`

- Root `/` redirects to `/streams/A`

**Done when:** Opening `http://localhost:3000` lands on stream A without a blank page.

---

### Task 8 — Unit tests
**Files:** `tests/unit/lifecycle.test.ts`

- Test `canTransition`: all non-terminal → non-terminal pairs return `true`
- Test `canTransition`: non-terminal → same status returns `false`
- Test `canTransition`: terminal → anything returns `false`
- Test `getValidTransitions`: terminal statuses return empty array
- Test `getValidTransitions`: `active` returns all four other statuses

**Done when:** `npm test` exits 0 with all lifecycle cases green.

---

### Task 9 — E2E tests
**Files:** `tests/e2e/streams.spec.ts`

- Assert three stream tabs A, B, C are visible
- Assert work items render with status badges
- Assert creating a new item adds it to the list
- Assert non-terminal status transition works (e.g. active → waiting)
- Assert terminal item shows no transition options

**Done when:** `npm run test:e2e` exits 0 against `localhost:3000`.

---

## Threat Model

| Risk | Mitigation |
|------|-----------|
| Terminal state bypass via direct hook call | `canTransition` is enforced in `updateStatus`; UI hides invalid options |
| localStorage data corruption | Parse errors caught and replaced with seed data on load |
| Stream param injection from URL | `StreamId` is a union type; unknown values fall through to empty/redirect state |

---

## Out of Scope for This Phase

- Supabase auth, RLS, or any real database
- Terminal outcome reason/timestamp fields (FND-06 satisfied at schema level in Phase 2)
- Activity event log (FND-07 wired in Phase 2)
- Outreach, blockers, delegation, or attention views
- Reminders, email, or background jobs
