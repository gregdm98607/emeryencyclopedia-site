# FIGURE_ROLLOUT_PLAN.md

Durable plan for building original figures across all 43 Encyclopedia of Emery County chapters.
Re-read this at the start of every figure session and before any consequential decision.

---

## Goal & success criteria

Build every proposed figure across the 43 EEC chapters in the locked EEC figure system, and get
them onto emeryencyclopedia.com, without any chapter ever showing two figure styles side by side.

**Done means:**
- Every chapter's "Proposed Figures" list is either built or explicitly retired with a reason.
- Every shipped figure is one self-contained SVG, in the locked palette, with a cited source.
- Every `/images/chapters/ch*_figure_*` reference in committed MDX resolves to a tracked file
  (`incorporate-approved-figures.mjs` dry-run reports `0 missing`).
- The six legacy matplotlib figures are replaced.

**Constraints Greg set, which must not be quietly dropped:**
- SVG + PNG files now. Inline/live figures and per-figure pages are **backlog**, not this effort.
- Figure colors match site tokens exactly; figure *fonts* stay distinct (Archivo Black plates).
- Legacy six rebuilt **first**, as the pilot.
- **Chapter-at-a-time, on Greg's command.** Not scheduled, not autonomous. He initiates; one
  chapter's figures are built as a batch; he reviews the batch.
- Nothing is approved without an explicit ruling from Greg in chat.
- Density is deliberately unconstrained — it flexes by topic. Do not reintroduce a length rule.

---

## Task checklist

### Phase 0 — Foundations (one time)
- [x] Lock and validate the design system (2 review rounds)
- [x] Reconcile figure palette to `global.css` site tokens
- [x] Build + test SVG export with embedded fonts (verified rendering inside `<img>`)
- [x] Write `figure-curation/README.md` and `scripts/incorporate-approved-figures.mjs`
- [x] Write `FIGURE_SYSTEM.md` decision record
- [ ] Add `figure-curation/` to `.gitignore` (mirror the `image-curation/` entry)
- [ ] Build the **figure inventory**: parse all 43 chapter MDX files for "Proposed Figures"
      lists into one table (chapter, planning ID, subject, chart form, status). Until this
      exists the "~100 figures" number is a guess.
- [ ] Decide: does `eec-figures` delegate to `eec-branded-infographics`, or merge? Two skills
      claiming stage 9 will misfire.
- [ ] Raise the `FigureImage.astro` `variant="plate"` fix with Greg (shared with photos)

### Phase 1 — Pilot: rebuild the six legacy figures
Known-good data, already validated — low risk, and it proves the whole pipeline end to end.
- [ ] `ch02_figure_stratigraphic-column`
- [ ] `ch03_figure_dissolved-solids`
- [ ] `ch04_figure_precip-gradient`
- [ ] `ch04_figure_valley-comparison`
- [ ] `ch05_figure_elevation-profile`
- [ ] (confirm the sixth during inventory — `ch33_map_swell-canyoneering` is a map, not a figure)
- [ ] Run incorporate dry-run, confirm `0 missing`, commit, verify on the built site

**Gate:** do not start Phase 2 until Greg has approved the pilot batch and one rebuilt figure is
confirmed live and correct on the site.

### Phase 2 — Chapter-at-a-time rollout
Repeat per chapter, in whatever order Greg calls:
- [ ] Ch02 (F1, F3, F5 remain — F2 covered by the column rebuild, F4 already built)
- [ ] Ch17 (coal — highest-value, most data available)
- [ ] …remaining chapters, tracked in the inventory table

### Phase 3 — Backlog (explicitly not now)
- [ ] Inline figures as live Astro components / per-figure pages
- [ ] Revisit `FigureImage` wrapper styling
- [ ] Consider a figures index page across the whole encyclopedia

---

## Per-chapter session recipe

The repeatable unit of work. One chapter per session.

1. Read the chapter MDX. Pull its "Proposed Figures" list and the prose each figure supports.
2. For each figure: research the facts and sources **first**; pick the chart form from the shape
   of the data; confirm it isn't better served as a map (`eec-map`) or a photo
   (`eec-visual-research`).
3. Build each as one self-contained `<svg>`; render PNG + SVG; **look at the render** and fix.
4. Write the trio to `figure-curation/proposed/` as `chNN_figure_<slug>.{html,svg,png}`.
5. Present the whole chapter's batch to Greg together, with sources and any judgment calls.
6. On approval: move trio to `approved/`, add the `<FigureImage>` block to the MDX at the right
   paragraph, assign the next `Figure NN.n` in reading order and renumber below it.
7. `node scripts/incorporate-approved-figures.mjs` → confirm `0 missing` → `--write` → commit.
8. Update the inventory table and this plan's checklist.

---

## Findings & notes

**Repo layout.** Site at `C:\Dev\emeryencyclopedia-site` (Astro v6). Chapters are MDX in
`src/content/chapters/chNN.mdx`. Figures embed via `<FigureImage src alt caption credit />`,
which renders `<img>` plus a lightbox. Served figure root: `public/images/chapters/`.

**Why one `<svg>`.** SVG inside `<img>` is sandboxed — no external fonts/CSS, `<foreignObject>`
does not paint. An HTML composite can therefore only ship as raster. `render.py --svg` solves
the font half by base64-inlining Archivo Black + Libre Franklin; the author must supply the
other half by keeping the figure to a single root `<svg>`. **Verified working** in an isolated
`<img>` test.

**Asset naming already in use** (`image-curation/approved/`): `chNN_opensource_*`,
`chNN_generated_*`, `chNN_figure_*`, `chNN_map_*`. Figures already ship as `.png` + `.svg`
pairs — the new pipeline matches the existing convention rather than inventing one.

**Numbering.** `F1…F5` in chapter "Proposed Figures" lists are *planning IDs*. Display numbers
are `Figure NN.n`, sequential in reading order, shared with photographs. Placing a figure
renumbers everything below it.

**Two curation trees, deliberately.** `image-curation/` = sourced photos ("is this the right
picture, properly licensed"). `figure-curation/` = original graphics ("is this true, sourced,
and does it teach"). Different review questions, so different trees and different scripts.

**Site palette reconciliation.** Nine figure tokens now match `global.css` exactly. Gold
(`#D9A03C`) and purple (`#8B6BA3`) are figure-only extensions — the site has no equivalent hue
and six categorical colors need six separable ones.

**Pipeline state lives elsewhere** and is managed by the `eec-chapter-pipeline` scheduled skill:
`C:\Users\gregm\999_SECOND_BRAIN\_Obsidian\11_Systems\eec_pipeline_state.md`. Do not hand-edit.
Task board: `…\00_Inbox\EEC_Tasks.md`.

---

## Error log

**Compliance tests measured only the easy half (round 1).** Automated checks scored the skill
100% and the no-skill baseline 28%, but Greg preferred the *baseline* figures. The checks tested
brand fidelity, which the skill had solved, and said nothing about information design, which it
hadn't. *Conclusion: never treat a passing checklist as evidence a figure is good. Human review
of the actual rendered image is the real gate.*

**Bars for a time series (round 1).** The form heuristic conflated "quantity measured over time"
with "things that existed for a span," and produced bar charts for population and production.
*Conclusion: line/area for measurements, span bars for durations. Fixed in the skill.*

**Two false-positive compliance failures (round 2).** `&#183;` (middle-dot entity) parsed as hex
color `#118833`; sanctioned circular number chips tripped the no-rounded-corners rule. *Both
were checker bugs, fixed. Conclusion: verify a "regression" is real before rewriting anything.*

**Feedback export returned stale content.** The round-2 eval viewer restored the round-1 session
from browser storage and exported that instead of what Greg typed. *Conclusion: for a second
review round, confirm run IDs in `feedback.json` match the current iteration before acting on it
— or just take feedback in chat.*

**Project binding broke mid-session.** After the conversation moved projects, `project_info`
returned 404 (`session has no chat project binding`). *Conclusion: durable docs go to the repo
and the vault, not only to the Projects API.*

---

## Current status / next action

**Status:** Phase 0 nearly complete. Design system locked and reconciled; skill rebuilt and
packaged; SVG pipeline built and verified; curation workstream and decision record written and
being placed in the repo.

**Next action:** finish Phase 0 — add `figure-curation/` to `.gitignore`, then build the figure
inventory by parsing all 43 chapter MDX files, so the real figure count replaces the "~100"
guess. Then start Phase 1 (pilot) on Greg's command.
