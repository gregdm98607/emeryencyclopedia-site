# Encyclopedia of Emery County — Project Guide

## Site Architecture

Astro v6 static site. All 43 chapters live as MDX files in `src/content/chapters/`. Chapter pages are rendered by `src/pages/chapters/[chapter].astro`, which passes a component map to MDX so chapters can use engagement components without per-file imports.

**Available MDX components (no import needed in .mdx files):**
`CrossRef`, `FigureImage`, `TriviaCallout`, `ScavengerHunt`, `FamilyActivity`, `Factbox`, `PhotoAssignment`, `FieldItinerary`, `DataTable`

**Design tokens:** `src/styles/global.css` — uses CSS custom properties (`--sandstone`, `--canyon-shadow`, `--deep-sky`, `--sage-green`, `--mesa-red`, etc.). Always use tokens, never raw hex in component styles.

---

## Authoring Conventions

### Tables

Three patterns exist — use the simplest that meets your need:

**Pattern 1 — Plain markdown pipe table (default)**
```markdown
| Location | Habitat | Primary Targets |
|---|---|---|
| The Wedge Overlook | Open sagebrush | Pronghorn, raptors |
```
`global.css` styles all `.prose table` automatically: zebra rows, sandstone header tint, 2px warm border, `0.875rem` font, horizontal scroll on mobile. No component needed.

**Pattern 2 — `<DataTable>` for captioned / attributed tables**
```mdx
<DataTable
  caption="Table 34-A — Wildlife Hotspots of Emery County"
  note="Source: BLM field surveys 2019–2023."
>

| Location | Habitat | Primary Targets |
|---|---|---|
| The Wedge Overlook | Open sagebrush | Pronghorn, raptors |

</DataTable>
```
Leave a blank line between `<DataTable>` and the first `|` row — MDX requires this.

**Pattern 3 — `<Factbox>` for sidebar data boxes**
Use for engagement sidebars and pulled-out fact sets, not inline reference tables.

Full reference: `docs/authoring/table-standards.md`

### MDX Authoring Rules

- Do NOT use Markdown autolinks (`<https://...>`) — they are invalid in MDX. Use bare URLs or `[text](url)`.
- Raw `<tag>` HTML in MDX is parsed as JSX. Use `&lt;` for literal angle brackets, or backtick-quote them.
- Clear `.astro` cache (`rm -rf node_modules/.astro`) for an authoritative build — the local cache can mask MDX errors that CI catches.

### Engagement Sidebars

Every published chapter requires `ChNN_engagement_sidebars.md` in the Obsidian vault with ≥4 elements. Sidebars are then wired inline into the `.mdx` chapter file using the engagement components above. The `eec-engagement-pass` skill handles this pass.

---

## Workflow

Chapter pipeline: **stub → draft → fact-check → revised → final → published**

- Pipeline state: `C:\Users\gregm\999_SECOND_BRAIN\_Obsidian\11_Systems\eec_pipeline_state.md`
- Task board: `C:\Users\gregm\999_SECOND_BRAIN\_Obsidian\00_Inbox\EEC_Tasks.md`
- Drive index: `C:\Users\gregm\999_SECOND_BRAIN\_Obsidian\05_Projects\Emery_County_Encyclopedia\Zero_Draft\Drive_Index.md`

The `eec-chapter-pipeline` scheduled skill advances chapters and is budget-aware. Do not manually edit pipeline state — let the skill manage it.

---

## Build & Deploy

```bash
npm run build      # Astro static build → dist/
npm run dev        # Dev server (Vite, hot reload)
```

Always verify `exit 0` with cache cleared before reporting a clean build. Deployment is via Vercel (auto on merge to master).
