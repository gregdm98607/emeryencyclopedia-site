# EEC Figure System — Decision Record

Ratified 6 August 2026. This is the reference for anyone — human or agent — building original
figures for the Encyclopedia of Emery County. It records what was decided and, where it matters,
why, so the reasoning survives when the decisions are questioned later.

Companion files:
- Skill: `eec-branded-infographics` (installed; contains the full token spec and pattern library)
- Workstream: `C:\Dev\emeryencyclopedia-site\figure-curation\README.md`
- Plan: `FIGURE_ROLLOUT_PLAN.md`

---

## 1. What the system is

A locked visual language for original graphics, derived from three reference charts Greg
supplied (a stratigraphic column, a deep-time formation timeline, a dissolved-solids bar chart)
and validated across two build-and-review rounds.

The look, in one line: **warm paper ground, flat saturated color blocks each wearing a solid
dark outline, heavy poster-weight titles, small italic source lines.** It should read like ink
on paper. That is the reason behind every "never does" below — print has no shadows, no rounded
rectangles, and no gradients.

## 2. Tokens

Reconciled with `src/styles/global.css` so a figure never sits beside an almost-but-not-quite
matching page color. Nine values match site tokens exactly; two are figure-only extensions.

```
--color-background  #F7F3ED   site --sky-wash
--color-surface     #FFFFFF
--color-ink         #3B2F2F   site --canyon-shadow   (text AND outlines — one ink)
--color-accent      #C85A54   site --mesa-red        (UI only: eyebrows, callouts)
--color-muted       #7A7060   site --color-muted-text
--color-line        #3B2F2F   same as ink
--rule              #D1C7B8   site --color-border

--chart-1  #A0522D  sienna    site --mesa-red-deep
--chart-2  #5B8AC5  blue      site --sky-blue
--chart-3  #6B9B6F  green     site --sage-green
--chart-4  #D9A03C  gold      FIGURE-ONLY — site has no equivalent hue
--chart-5  #8B6BA3  purple    FIGURE-ONLY — site has no equivalent hue
--chart-6  #D4A574  sand      site --sandstone
```

Gold and purple exist because six categorical colors need six separable hues and the site
supplies only four usable ones. If they are ever added to `global.css`, use these exact values.

The UI accent and chart-1 are now genuinely different colors rather than one value doing two
jobs — an accent callout can sit beside a sienna data block without reading as related.

**Typography.** Archivo Black for display and figure titles; Libre Franklin for body, labels,
axes, captions. This deliberately differs from the site's Libre Baskerville + Source Sans 3.
*Decision: figures read as distinct plates, the way they do in a real reference book.* Colors
match the page; type does not, and that is intentional.

## 3. The rules

**Never:** round corners · drop shadows, glows, gradients · pure white as page ground (white is
for cards) · a data block without its outline · a chart color outside the locked six, or the six
reordered between figures · light or thin weights for headings · emoji or icon fonts as
information · a number without a source · a time series drawn as bars · a chart whose peaks and
troughs are left unexplained.

**Three ratified exceptions**, approved 6 Aug 2026, and the only ones:
1. **Tinted fills** — `fill-opacity` 0.15–0.25 on a locked color under a line chart; 0.10–0.14
   for phase bands. A tint of an existing color, not a gradient. Never on a data block or text.
2. **Lithologic patterns** — SVG `<pattern>` textures (stipple, dash, brick) built from locked
   colors, for rock units in cross-sections only. Printing conventions; add no new hue.
3. **Circular number chips** — round markers on diagrams and their key chips. A map marker is a
   different object from a data block.

## 4. Craft standards

Brand compliance is the floor, not the goal. A figure can pass every token check and still be a
thin graphic. The second failure is the more common one.

**Match the form to the shape of the information.** The distinction that matters most: a
quantity *measured* over time (population, tonnage) is a **line or area chart**; things that
*existed* for spans of time (formations, mines operating) are **span bars on a shared axis**.
Conflating these was the single biggest defect found in review.

**Make the chart teach.** Annotate turning points with their cause, not just their value. Band
the axis into named narrative phases. Point an arrow at the one non-obvious thing. Give real
scale — axes with units, distance bars, stated vertical exaggeration. Put Emery County's own
names on the artwork, not in a footnote. Derive comparisons ("+123% in one decade") rather than
restating raw values.

**Reconstruct, then record.** For anything geologic or process-driven, pair panel A (the living
system, with numbered callouts) with panel B (the record it left, scaled). Either alone is
markedly weaker.

**Density is deliberately unconstrained.** No page-length target. A single clean dataset
deserves a tight page; a century of coal across four towns earns a stick column, a production
curve, a seam table and four place histories. Judge by whether each element earns its space.
What to avoid is *stacking* — reaching for another full-width band when the content would sit
better in a rail beside something already there.

## 5. Delivery

Chapter figures are authored as **one self-contained `<svg>`** — title, drawing, legend, strip,
caption all as native SVG. This is forced by the site: `FigureImage.astro` embeds via `<img>`,
where an SVG is sandboxed (no external fonts or CSS, `<foreignObject>` does not render). An HTML
composite can only ever ship as a raster, which goes soft when a reader zooms a figure full of
10px labels.

Standalone infographic *pages* (posters, not chapter figures) stay HTML and ship as PNG.

Each chapter figure produces a trio: `.html` (editable source, never ships), `.svg` (**ships**),
`.png` (2× fallback). Named `chNN_figure_<slug>` where the slug is the subject, not the number.

Build: `python scripts/render.py fig.html --png fig.png --svg fig.svg --selector ".eec-figure"`

## 6. Open items

| Item | Status |
|---|---|
| Inline figures as live Astro components (responsive, selectable, accessible), or per-figure pages | **Backlog** — Greg's call, revisit after the file-based rollout |
| `FigureImage.astro` wrapper is off-system: `border-radius: 0.25rem`, `#e0e0e0` border, `#7a7a7a` caption | **Open** — needs a `variant="plate"` prop; component is shared with photos so don't change unilaterally |
| Six legacy matplotlib figures in the old style | **Pilot batch** — rebuild first (see plan) |
| `eec-figures` skill overlaps this one | **Open** — decide whether it delegates or merges |

## 7. Provenance

Built and validated in a Cowork session, 5–6 Aug 2026. Two review rounds against a no-skill
baseline. Round 1: 100% brand compliance vs 28% baseline, but Greg preferred the *baseline*
illustrations — which exposed that the compliance tests only measured the easy half. Round 2
rebuilt the craft guidance around that feedback. The lesson is worth keeping: **a passing
checklist is not evidence a figure is good.**
