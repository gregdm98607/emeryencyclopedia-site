# MDX Component Reference — Canonical

**This file is the single source of truth for engagement/content component props.**
Generated from the actual `interface Props` in `src/components/` and `src/components/engagement/` on 2026-07-10.
Skills (eec-chapter-draft, eec-engagement-pass, eec-site-publisher) must link here, not duplicate prop tables — duplicated specs have already drifted once (`PhotoAssignment` was documented with nonexistent `location`/`guidance` props).

All components are available in chapter MDX without imports (component map in `src/pages/chapters/[chapter].astro`).

Required props are marked **(req)**. String arrays use `{["a", "b"]}` JSX syntax.

## Engagement components (`src/components/engagement/`)

### `<TriviaCallout>`
- `text` **(req)** — the trivia fact
- `source` — attribution line

### `<ScavengerHunt>`
- `title` **(req)**
- `location` **(req)**
- `items` **(req)** — `string[]`
- `hashtag`

### `<FamilyActivity>`
- `title` **(req)**
- `ageRange` **(req)**
- `duration` **(req)**
- `description` **(req)**
- `materials` — `string[]`

### `<PhotoAssignment>`
- `title` **(req)**
- `subject` **(req)**
- `where` **(req)** ← NOT `location`
- `lookFor` **(req)** ← NOT `guidance`
- `story` **(req)**
- `tip`
- `hashtag`

### `<FieldItinerary>`
- `site` **(req)**
- `tagline` **(req)**
- `gettingThere` **(req)**
- `timeNeeded` **(req)**
- `bestSeason` **(req)**
- `whatToBring` **(req)**
- `onTheGround` **(req)**
- `gps`
- `seeAlso` — `string[]`

### `<Factbox>`
- `title` **(req)**
- `headers` **(req)** — `string[]`
- `rows` **(req)** — `string[][]`
- `note`

## Content components (`src/components/`)

### `<FigureImage>`
- `src` **(req)**, `alt` **(req)**
- `caption`, `credit`, `width`, `height`
- `annotations` — `Annotation[]`

### `<CrossRef>`
- `chapter` **(req)** — chapter number (integer)

### `<DataTable>` (slot-based — wraps a markdown table)
- `caption`, `note`, `id`
- Leave a blank line between `<DataTable>` and the first `|` row (MDX requirement).

## Chapter collection schema (`src/content/chapters/`)
Required frontmatter: `title`, `chapter`, `part`, `status`, `description`. Any `.md`/`.mdx` file placed in this directory MUST satisfy the schema — planning docs go in `backlog/`, never here.
