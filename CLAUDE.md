<!-- GSD:project-start source:PROJECT.md -->
## Project

**Freelancer Workstream Toolkit**

A focused freelancer operating toolkit for managing three separate work streams, called A, B, and C, alongside outreach efforts. It helps a freelancer see what needs attention across client/project work, outreach options, blockers, and delegated or collaborative tasks without turning v1 into an invoicing or accounting product.

The product is for a freelancer who wants one practical workspace for delivery and business development: active work streams, outreach effort tracking, progress/status, blockers, and collaboration handoffs.

**Core Value:** The freelancer can always see the next useful action across work streams, outreach efforts, blockers, and delegated work.

### Constraints

- **Scope**: No invoices in v1 - the first release is about operating the work, not financial administration.
- **Workflow model**: Exactly three named work streams for v1 - this keeps the initial product focused and easy to reason about.
- **Outreach model**: Outreach is option/type based rather than a Kanban pipeline - the UI and data model should avoid assuming linear CRM stages.
- **Collaboration**: Delegation support must be present in v1 - the tool should not assume the freelancer always works alone.
- **Status design**: Closed and cancelled are required terminal states - completion and intentional abandonment must be distinguishable.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why Recommended | Confidence |
|------------|---------|---------|-----------------|------------|
| Next.js App Router | 16.2.4 | Full-stack React app, route handlers, server components, server actions, deployment target | Best fit for a small-to-medium productivity SaaS because it keeps UI, authenticated reads/writes, and API endpoints in one codebase. The app needs dashboards, forms, list/detail screens, and lightweight backend behavior, not a separately scaled API service. | HIGH |
| React | 19.2.5 | UI runtime | Current React baseline used by Next.js. Use server components by default and client components only for interactive filters, forms, optimistic updates, and reminder controls. | HIGH |
| TypeScript | 6.0.3 | Type safety across UI, data models, status enums, and form schemas | This domain has many small state distinctions: active/blocked/closed/cancelled, stream A/B/C, owner/collaborator roles, outreach effort types. TypeScript catches drift before status logic leaks into the UI. | HIGH |
| Supabase Postgres | Managed current | Primary relational database | The data is relational and structured: work items, outreach efforts, blockers, owners, collaborators, comments/notes, reminders, and status history. Postgres handles this cleanly without forcing a generic document model. | HIGH |
| Supabase Auth + Row Level Security | Managed current, `@supabase/supabase-js` 2.105.1, `@supabase/ssr` 0.10.2 | Authentication, cookie-based SSR sessions, row-scoped authorization | Use Supabase Auth because it is integrated with Postgres RLS. Collaboration/delegation means data access must be scoped by membership/ownership, and RLS provides defense in depth when browser-accessible APIs are used. | HIGH |
| Vercel | Managed current | Hosting for Next.js app and route handlers | Lowest-friction deployment for Next.js. The app's expected load is modest; operational simplicity matters more than custom infrastructure. | MEDIUM |
| Inngest | `inngest` 4.2.6 | Background workflows for reminders, follow-up nudges, overdue checks, email scheduling, retryable jobs | Reminders should not depend on users opening the app or on fragile ad hoc cron code. Inngest integrates with Next.js via an `/api/inngest` route and supports durable background functions and local dev visibility. | MEDIUM |
| Resend | 6.12.2 | Transactional reminder and follow-up emails | Good fit for simple reminder emails and activity digests. Do not build email sending into v1 beyond app-generated reminders; outreach sending is explicitly out of scope. | HIGH |
### Supporting Libraries
| Library | Version | Purpose | When to Use | Confidence |
|---------|---------|---------|-------------|------------|
| Tailwind CSS | 4.2.4 | Utility styling | Use for dense operational UI: tables, side panels, filters, badges, status chips, forms, responsive layouts. | HIGH |
| shadcn/ui | CLI/package current via `shadcn`; components based on Radix UI + Tailwind | Component source for dialogs, dropdowns, tabs, buttons, forms, popovers, command menus | Use as copied component source, not as a black-box component package. It fits a focused internal-tool style and avoids designing basic controls from scratch. | HIGH |
| lucide-react | 1.14.0 | Icons | Use for action buttons, status/filter affordances, reminder controls, collaborator indicators. | HIGH |
| React Hook Form | 7.74.0 | Form state | Use for create/edit work item, outreach effort, blocker, handoff, and reminder forms where validation and field state matter. | HIGH |
| Zod | 4.4.1 | Runtime validation and inferred TypeScript types | Use for server action inputs, route handler bodies, form validation, status enums, stream identifiers, and reminder payloads. | HIGH |
| TanStack Query | 5.100.6 | Client-side server-state cache and optimistic updates | Use only for interactive client-heavy views: "needs attention" dashboard, filters, inline status changes, and collaborator assignment updates. For simple server-rendered pages, fetch directly in server components. | HIGH |
| date-fns | 4.1.0 | Date formatting and date math | Use for due dates, follow-up dates, stale blocker age, and reminder schedule display. Avoid heavy date libraries unless timezone scheduling becomes a real product requirement. | HIGH |
| Supabase generated database types | Supabase CLI generated | Database type safety | Generate `Database` types from the schema and use them with `createClient<Database>()`. This is the lightweight alternative to adding an ORM before the data model stabilizes. | MEDIUM |
| `@vercel/analytics` | 2.0.1 | Basic product analytics | Use after first deploy to see which views/actions are actually used. Keep event tracking minimal and product-focused. | MEDIUM |
### Development Tools
| Tool | Purpose | Notes | Confidence |
|------|---------|-------|------------|
| ESLint | 10.2.1 | Static linting | Use Next.js defaults, TypeScript rules, and import hygiene. Avoid large custom lint configs during v1. | HIGH |
| Vitest | 4.1.5 | Unit tests for status logic, reminder selection, authorization helpers, and schema validators | Good for fast tests around pure business rules: next-action ranking, terminal state behavior, blocker state transitions. | HIGH |
| Testing Library React | 16.3.2 | Component tests | Use selectively for form behavior and important dashboard widgets. Do not snapshot the whole app. | HIGH |
| Playwright | 1.59.1 | End-to-end tests | Use for core flows: sign in, create work item, mark blocked, add delegation metadata, schedule reminder, close/cancel effort. | HIGH |
| Supabase local development | Current CLI/docker stack | Local database, auth, migrations, seed data | Use when implementation begins. Keep seed data aligned with the three fixed streams and outreach types. | MEDIUM |
## Installation
# Create app
# Core app/data/auth
# UI
# Background jobs and email
# Analytics
# Dev/test
## Alternatives Considered
| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Next.js App Router | Remix / React Router framework mode | Choose Remix/React Router if the team strongly prefers action/loader conventions and self-hosting over the Next/Vercel ecosystem. For this project, Next has better full-stack SaaS defaults and Supabase examples. |
| Supabase Postgres/Auth/RLS | Neon Postgres + Auth.js | Choose this if you want vendor separation and are comfortable implementing authorization in the app/service layer. For collaboration metadata, Supabase RLS is the simpler secure default. |
| Supabase generated types, no ORM in v1 | Prisma 7.8.0 | Prisma is excellent for app-owned server-only relational access, but it adds a second abstraction while the schema is still being discovered and can undermine an RLS-first mental model if used casually with direct DB connections. Add it later only if complex reporting or service-layer queries justify it. |
| Supabase generated types, no ORM in v1 | Drizzle ORM 0.45.2 | Drizzle is lighter than Prisma and good for SQL-shaped TypeScript, but v1 can avoid ORM complexity. Consider Drizzle later if SQL migrations and query typing become painful. |
| Inngest | Vercel Cron + custom job tables | Use Vercel Cron only for very simple daily scans. Inngest is better once reminders need retries, delayed work, event history, and local run inspection. |
| Resend | SendGrid / Postmark | Use Postmark for strict transactional-email deliverability requirements at higher volume. Resend is simpler for MVP reminder emails. |
| shadcn/ui + Tailwind | Material UI / Ant Design | Use MUI/AntD if the product needs a broad enterprise component suite immediately. For this app, they create too much visual and API weight. |
| TanStack Query selectively | Global client state store such as Redux/Zustand | Use Zustand only for purely local UI preferences. Do not use Redux for server data in this app; it adds ceremony without solving the main problem. |
## What NOT to Use
| Avoid | Why | Use Instead |
|-------|-----|-------------|
| A full CRM pipeline package | Outreach is explicitly effort-type/option based, not a linear sales pipeline. Pipeline assumptions will distort the product model. | Custom `outreach_efforts` with `type`, `status`, `next_action`, `blocked_reason`, `closed_reason`, and `cancelled_reason`. |
| Generic project-management clone architecture | Unlimited projects, boards, automations, and custom fields will bloat v1 and hide the core three-stream operating model. | Hard-code the v1 stream model as A/B/C in seed/config and type it as a constrained enum. |
| `@supabase/auth-helpers-nextjs` | Supabase documentation says auth helpers are deprecated and bug fixes/features focus on `@supabase/ssr`. Using both can create auth issues. | `@supabase/ssr` with separate browser/server clients and Next.js proxy/session refresh. |
| MongoDB/document-first storage | The domain is relationship-heavy and status-query-heavy. You will need joins for blockers, collaborators, reminders, and "needs attention" views. | Postgres tables with normalized relations and targeted views/indexes. |
| Prisma as the default v1 abstraction | It is not needed to validate the model and can make developers forget which authorization path is enforced by RLS versus server-side service logic. | Supabase client + generated DB types + SQL migrations. Revisit Prisma/Drizzle after schema stabilizes. |
| Real-time chat/messaging stack | Team chat is out of scope and would pull the product toward collaboration software instead of delegation metadata. | Structured notes, handoff fields, owner/collaborator records, reminder events. |
| Automated LinkedIn/email sending libraries | Automated outreach sending is out of scope and introduces compliance, account-risk, and deliverability complexity. | Manual outreach tracking plus optional reminder emails to the app user. |
| Heavy workflow/BPM engines | The workflow is status and next-action tracking, not enterprise process orchestration. | Explicit statuses, small event log, and Inngest functions for reminders/digests. |
## Stack Patterns by Variant
- Use Supabase Auth even if there is only one user, because collaboration and delegation metadata are v1 requirements.
- Implement `workspace_members`, `profiles`, and ownership policies early; do not retrofit authorization after user data exists.
- Use server components for initial dashboards and server actions/route handlers for mutations.
- Add invite flows and membership roles before adding shared comments or activity feeds.
- Keep RLS policies centered around `workspace_id` membership.
- Track delegated ownership separately from record creator: `created_by`, `owner_id`, `delegated_to_id`, and `collaborator_ids`/join table mean different things.
- Store reminders in Postgres with due timestamps and visible states.
- Defer Resend until email reminders are required.
- Still model reminders as records, not transient UI notifications, so Inngest can process them later.
- Do not switch stacks immediately.
- First improve responsive UI and notification emails.
- Only consider React Native/Expo after the web workflow is validated.
## Version Compatibility
| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| Next.js 16.2.4 | React 19.2.5, TypeScript 6.0.3 | Verified via official Next.js docs and npm registry lookup. Use App Router. |
| Supabase SSR 0.10.2 | Supabase JS 2.105.1 | Use `@supabase/ssr` for cookie-based browser/server clients. Docs note the package is beta/unstable, but Supabase recommends it over deprecated auth helpers. |
| Zod 4.4.1 | TypeScript 6.0.3 | Zod docs state Zod 4 is stable and is tested against TypeScript 5.5+. |
| Tailwind CSS 4.2.4 | Next.js App Router | Official Tailwind Next.js guide uses Tailwind 4 and `@tailwindcss/postcss`. |
| Inngest 4.2.6 | Next.js App Router route handlers | Official quick start exposes functions through `/api/inngest` using `serve` from `inngest/next`. |
| Playwright 1.59.1 | Next.js dev server | Use Playwright webServer config to launch the app for E2E tests. |
## Recommended Data/Module Shape
| Module | Backing Tech | Responsibility |
|--------|--------------|----------------|
| `lib/supabase/*` | `@supabase/ssr`, Supabase JS | Browser/server clients, session refresh, typed database access. |
| `features/workstreams` | Next.js server components/actions, Zod | Stream A/B/C views, work items, statuses, next actions. |
| `features/outreach` | Next.js server components/actions, Zod | Outreach effort types/options, progress, terminal outcomes, blockers. |
| `features/delegation` | Supabase tables/RLS, forms | Owners, collaborators, handoff notes, follow-up responsibilities. |
| `features/reminders` | Postgres, Inngest, Resend | Reminder records, due scans, email/in-app notification state. |
| `features/attention` | Postgres views/RPC or server queries, TanStack Query selectively | Unified "what needs attention" dashboard across streams, outreach, blockers, and delegated work. |
## Sources
- Next.js official docs, accessed 2026-04-30: latest version 16.2.4, App Router, server/client components, testing guides. Confidence: HIGH. https://nextjs.org/docs
- React official blog/docs, accessed 2026-04-30. Confidence: HIGH. https://react.dev/blog
- npm registry lookups via `npm view`, accessed 2026-04-30: `next` 16.2.4, `react` 19.2.5, `typescript` 6.0.3, `@supabase/supabase-js` 2.105.1, `@supabase/ssr` 0.10.2, `zod` 4.4.1, `react-hook-form` 7.74.0, `@tanstack/react-query` 5.100.6, `inngest` 4.2.6, `resend` 6.12.2, `tailwindcss` 4.2.4, `vitest` 4.1.5, `@playwright/test` 1.59.1. Confidence: HIGH.
- Supabase Next.js and server-side auth docs, accessed 2026-04-30: `@supabase/ssr`, cookie-based SSR clients, auth helper deprecation, Next.js auth setup. Confidence: HIGH. https://supabase.com/docs/guides/auth/server-side/nextjs and https://supabase.com/docs/guides/troubleshooting/how-to-migrate-from-supabase-auth-helpers-to-ssr-package-5NRunM
- Supabase Row Level Security docs, accessed 2026-04-30: RLS requirements for exposed schemas and policy patterns. Confidence: HIGH. https://supabase.com/docs/guides/database/postgres/row-level-security
- Tailwind CSS official Next.js installation guide, accessed 2026-04-30: Tailwind 4.2 docs and Next.js install path. Confidence: HIGH. https://tailwindcss.com/docs/installation/framework-guides/nextjs
- shadcn/ui official Next.js install docs, accessed 2026-04-30. Confidence: HIGH. https://ui.shadcn.com/docs/installation/next
- Zod official docs, accessed 2026-04-30: Zod 4 stable, TypeScript-first validation, TypeScript compatibility. Confidence: HIGH. https://zod.dev/
- TanStack Query official React docs, accessed 2026-04-30: server-state fetching/caching/synchronizing role. Confidence: HIGH. https://tanstack.com/query/latest/docs/framework/react/overview
- Inngest official Next.js quick start, accessed 2026-04-30: Next.js route-handler integration, durable background functions, local dev server. Confidence: HIGH. https://www.inngest.com/docs/getting-started/nextjs-quick-start
- Resend official Next.js docs, accessed 2026-04-30: Next.js route handler sending through Node SDK and React email templates. Confidence: HIGH. https://resend.com/docs/send-with-nextjs
- Vitest and Playwright official docs, accessed 2026-04-30. Confidence: HIGH. https://vitest.dev/guide/ and https://playwright.dev/docs/intro
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
