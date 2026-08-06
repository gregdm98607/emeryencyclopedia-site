# Repeatable figure-session prompts

Copy-paste these to start a figure session. They are written to work in a **fresh** session with
no memory of the design conversation — everything needed is either named here or lives in files
the agent will read.

---

## The main one — build a chapter's figures

```
Figure pass on Ch__.

Read C:\Dev\emeryencyclopedia-site\FIGURE_ROLLOUT_PLAN.md and FIGURE_SYSTEM.md first, then
use the eec-branded-infographics skill.

Build every figure in this chapter's "Proposed Figures" list that isn't already done:
research the facts and sources first, pick the chart form from the shape of the data, and
author each one as a single self-contained <svg> so it can ship as true vector.

Write each as a trio to figure-curation/proposed/ named chNN_figure_<slug>.{html,svg,png},
render both formats, look at the renders, and fix what drifted before showing me.

Present the whole chapter's batch together with sources and any judgment calls. Don't move
anything to approved/ or touch the MDX until I've ruled on them.
```

Fill in the chapter number and go. Everything else is fixed.

---

## Approve and publish a reviewed batch

```
Approved: <list the figures, or "all of them">. Rejected: <list, or "none">.

Move the approved trios to figure-curation/approved/ and the rejected ones to rejected/.
Add each approved figure to the chapter MDX with <FigureImage>, placed right after the
paragraph that first makes its point. Assign the next Figure NN.n in reading order and
renumber anything below it. Write real alt text (what's depicted, for someone who can't see
it) — not a copy of the caption.

Then run node scripts/incorporate-approved-figures.mjs, confirm 0 missing, run it with
--write, and show me the diff before committing.
```

---

## Pilot batch (run once, first)

```
Start Phase 1 of FIGURE_ROLLOUT_PLAN.md — rebuild the six legacy matplotlib figures in the
current EEC figure system. Their data is already validated, so don't re-research it; pull the
numbers from the existing figures and their chapter prose, and rebuild the graphics.

Same trio output and same review gate as a normal figure pass. Show me all six together.
```



## Notes on making these fire reliably

- **Say "figure pass on ChNN."** That phrasing is in the skill's trigger description, so it
  routes correctly even in a session that knows nothing about this work.
- **The plan file is the memory.** Naming it in the prompt is what lets a fresh session pick up
  weeks later without re-deriving any of it. If you only remember one line, remember
  "Read FIGURE_ROLLOUT_PLAN.md first."
- **Keep the review gate explicit.** The "don't touch the MDX until I've ruled" clause is what
  stops an eager session from publishing something you haven't seen.
- **One chapter per session.** These figures are research-heavy; batching two chapters produces
  a review pile too big to actually review, which is how backlogs start.
