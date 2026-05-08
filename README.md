# Workshop Starter Kit — `03-milestone`

This branch shows a completed GSD phase 1 execution — a running Next.js app with unit tests, Playwright E2E tests, and a verification report.

Participants switch here after exploring the discussion context on `02-discussion`. The focus is on running the app, running the tests, and discussing what a human still owns in an AI-assisted delivery.

---

## Branch Map

```
00-empty  →  01-planning  →  02-discussion  →  03-milestone
  Start         GSD output      Phase context     Running app
  here                                          ← you are here
```

---

## What was built (Phase 1: Foundation, Auth & Lifecycle)

| Area | Details |
|------|---------|
| **App** | Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui |
| **Unit tests** | Vitest — `tests/unit/lifecycle.test.ts` (status logic, state transitions) |
| **E2E tests** | Playwright — `tests/e2e/streams.spec.ts` (core user flows) |
| **Verification** | `.planning/phases/01-foundation-auth-and-lifecycle/01-VERIFICATION.md` |

---

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Run the tests

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Open the Playwright HTML report
npm run report
```

---

## What to do on this branch

1. **Run the app** — does it match what your group described on `00-empty`?
2. **Run the tests** — watch them pass, then open the HTML report
3. **Read `01-VERIFICATION.md`** — this is where the AI documents what it couldn't verify; that's your role as a human
4. **UAT discussion:** the AI wrote the code AND the tests — what does a human still own?
5. **Ship + start milestone 2:**

```bash
/gsd ship
/gsd new-milestone
```

---

## Files in this branch

| File/Dir | Purpose |
|----------|---------|
| `src/` | Next.js app (app router, components, lib, types) |
| `tests/unit/` | Vitest unit tests |
| `tests/e2e/` | Playwright end-to-end tests |
| `.planning/phases/01-foundation-auth-and-lifecycle/01-VERIFICATION.md` | AI's own verification report — what it checked and what it couldn't |
| [`workshop.html`](workshop.html) | Step-by-step participant guide for this branch |
