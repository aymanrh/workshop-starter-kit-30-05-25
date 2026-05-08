# Workshop Starter Kit — `02-discussion`

This branch shows the output of `/gsd discuss-phase 1` — the phase context and research GSD produces before any code is written.

Participants switch here after exploring the planning output on `01-planning`. The key discussion question: **what did the AI decide on its own, and is that what you intended?**

---

## Branch Map

```
00-empty  →  01-planning  →  02-discussion  →  03-milestone
  Start         GSD output      Phase context     Running app
  here                        ← you are here      + tests + ship
```

---

## What GSD generated

Phase discussion files live in `.planning/phases/01-foundation-auth-and-lifecycle/`:

| File | Purpose |
|------|---------|
| `01-CONTEXT.md` | Decisions captured for the phase — what gets built, what doesn't, what was left to the agent's discretion |
| `01-DISCUSSION-LOG.md` | Full log of the questions asked and answers given during the discussion |
| `01-RESEARCH.md` | Technical research GSD ran to inform the phase plan |

---

## What to do on this branch

1. **Open `01-CONTEXT.md`** — focus on the "agent's discretion" section; this is where surprises come from
2. **Compare decisions** — what did your group decide vs. what did the AI fill in on its own?
3. **BA / Tester lens** — what gaps do you spot? What's missing from the context that could cause the wrong thing to be built?

> **Key insight:** `CONTEXT.md` is your Gherkin before the Gherkin. Everything left to the agent's discretion is a test case you don't yet have.

Then switch to `03-milestone` to see the running app:

```bash
git checkout 03-milestone
```

---

## Files in this branch

| File | Purpose |
|------|---------|
| [`workshop.html`](workshop.html) | Step-by-step participant guide for this branch |
