# Workshop Starter Kit — `01-planning`

This branch shows the output of `/gsd new-project` — the planning files GSD generates after you answer the setup questions.

In the workshop, participants switch here immediately after starting the project on `00-empty`, so they can explore a complete planning output without waiting for generation to finish.

---

## Branch Map

```
00-empty  →  01-planning  →  02-discussion  →  03-milestone
  Start         GSD output      Phase context     Running app
  here       ← you are here      + decisions       + tests + ship
```

---

## What GSD generated

All planning files live in `.planning/`:

| File | Purpose |
|------|---------|
| `.planning/PROJECT.md` | Project name, problem statement, target user, success criteria |
| `.planning/ROADMAP.md` | Phased delivery plan — what gets built in which order |
| `.planning/REQUIREMENTS.md` | Detailed feature requirements derived from the project answers |
| `.planning/research/SUMMARY.md` | Executive summary of the research findings |
| `.planning/research/PITFALLS.md` | Known risks, failure modes, and things to avoid |
| `.planning/research/ARCHITECTURE.md` | Recommended architecture and system design |
| `.planning/research/STACK.md` | Technology stack recommendation with rationale |
| `.planning/research/FEATURES.md` | Feature breakdown and prioritisation |

---

## What to do on this branch

1. **Open `.planning/PITFALLS.md` first** — most valuable for non-technical participants; surfaces risks immediately
2. **Read `.planning/ROADMAP.md`** — this is your spec; the AI will write code against it, not against memory
3. **Run the phase discussion** to move to the next step:

```bash
/gsd discuss-phase 1
```

Then switch to `02-discussion` to explore the output.

```bash
git checkout 02-discussion
```

---

## Files in this branch

| File | Purpose |
|------|---------|
| [`workshop.html`](workshop.html) | Step-by-step participant guide for this branch |
