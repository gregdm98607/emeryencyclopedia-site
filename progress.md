# Progress

## Session 2026-06-05 — Web Design Review (COMPLETE)
- Replaced prior completed plan ("find unsynced Cowork EEC decisions") with a master web-designer review.
- Read design system, layouts, nav, all live pages, data/census layer, search, interactive pages,
  and all components. Ran a clean production build (exit 0, 55 pages).
- Key verified findings:
  - Brand fonts never loaded (Georgia/system fallback site-wide).
  - Newsletter forms POST to nonexistent /api/subscribe (static build, no adapter) → always error.
  - Header/Footer/About chapter lists drifted from chapters.ts (wrong titles Parts IV–VI; ~20 finished
    chapters shown "coming soon" in footer). chapters.ts/TOC/ChapterCard are correct & data-driven.
  - ~10 orphaned components (incl. ChapterFooter prev/next, TableOfContents, CrossRef, FigureImage,
    engagement widgets) — chapters are .md so they can't be embedded; live chapter pages are bare.
  - ArticleLayout/ChapterLayout use CSS tokens absent from global.css; --mesa-red has 2 values.
  - explore map popup anchors no-op + stale chapter mappings; OSM/unpkg CDN concerns.
  - Ch01 advertises 12,847 words / 51 min vs ~5,300 actual.
  - Search works (content indexed); minor: no data-pagefind-body.
- Delivered 4-part review (Bugs / UX improvements / Roadmap / Wow) with severity + effort in chat.
- Findings detail in findings.md.

## Session 2026-06-05 — Quick wins implemented
- B1 fonts FIXED: self-hosted @fontsource (libre-baskerville 400/700, source-sans-3 400/600/700,
  jetbrains-mono 400) imported in global.css; 7 component `--font-body` overrides now include 'Source Sans 3'.
  Gotcha resolved: variable package family is "Source Sans 3 Variable" → switched to static package.
- B3 nav drift FIXED: Header (desktop + mobile) and Footer now generate the chapter index from
  CHAPTERS + getAllParts(); markup untouched, mega-menu capped with max-height + scroll.
- Build exit 0; verified @font-face families + corrected/removed titles + newly-linked chapters in dist.
- Files changed: global.css, Header.astro, Footer.astro, index/about/resources/explore/chapters[index]/
  [chapter].astro, ChapterCard.astro, package.json.
- Remaining recommended quick wins (not yet done): B2 newsletter endpoint, B4 ArticleLayout token names,
  B5 unify --mesa-red / dedupe :root tokens.
- FIXED dev-server crash (pre-existing, surfaced when previewing via `npm run dev`): SearchOverlay.astro
  `import('/pagefind/pagefind.js')` is now `const pagefindPath='/pagefind/pagefind.js'; import(/* @vite-ignore */ pagefindPath)`.
  Pagefind only exists post-build; dev now 404s gracefully (catch shows "Search is available after the site is built").
  Verified: dev `/` + `/chapters/16` → 200, no resolve error/overlay; prod build still exit 0.

## Session 2026-06-05 — Design-token + a11y hardening
- B4 FIXED: added the previously-undefined legacy aliases to global.css :root
  (--color-background, --color-text-muted, --color-border-light, --color-accent-primary,
  --color-alkali-flat) → live article page (ArticleLayout) colors now resolve.
- B5 FIXED: unified --mesa-red to #C85A54 (matches the visible UI); added --mesa-red-deep (#A0522D)
  for the hero/Part-III sienna; added --forest-green/--sky-blue/--canyon-bronze to global. Local
  component :root palette blocks now agree with global (redundant; safe to delete in a follow-up).
- Bonus a11y: prefers-reduced-motion reset + skip-to-content link (BaseLayout <main id=main-content>).
- Files changed: global.css, BaseLayout.astro.
- Verified via build (exit 0) + dist greps: single --mesa-red #C85A54, --color-accent-primary defined,
  reduced-motion + skip-link CSS emitted, skip link + #main-content in home HTML, article page builds.
- Still open: B2 newsletter endpoint; autoplay hero video needs JS to honor reduced-motion (CSS can't
  pause playback); optional cleanup = delete now-redundant local :root palette blocks (mind --sage-green
  #6B9B6F vs global #7A8B6F before removing).

## Session 2026-06-05 — :root dedup + search scoping (cleanup)
- Single source of truth: removed redundant local `:root` palette blocks from Header, Footer, about,
  resources, chapters/index, [chapter], index, ChapterCard, contact (replaced with a pointer comment).
  explore.astro trimmed to keep only its map-specific --sage-green: #5B7B6A. global.css is now the
  sole palette/font token source. Verified: `--sandstone:` exists only in global.css.
- --sage-green canonicalized to #6B9B6F in global (the value homepage/cards already showed; old global
  #7A8B6F only fed the unused .badge-available). No visual change (confirmed #6B9B6F still in built CSS).
- contact.astro body now uses var(--font-body) instead of a hardcoded system stack.
- Search: added data-pagefind-body to BaseLayout <main> and ArticleLayout <article> → nav/footer no
  longer indexed; "did not find a data-pagefind-body" warning gone; still 55 pages indexed.
- Files changed: global.css, BaseLayout, ArticleLayout, Header, Footer, about, resources,
  chapters/index, chapters/[chapter], index, ChapterCard, explore, contact.
- Verified: build exit 0, no errors.

## Session 2026-06-05 — MDX migration (reconnect orphaned components)
- Branch: feature/mdx-chapter-furniture (off quick-wins/design-system).
- Enabled @astrojs/mdx; collection globs accept .md + .mdx.
- Rebuilt chapters/[chapter].astro: sticky TOC + breadcrumb + .prose + ChapterFooter (prev/next + related)
  + figure lightbox, all inside BaseLayout. Component map wired so MDX chapters can use CrossRef/FigureImage/
  TriviaCallout/ScavengerHunt/FamilyActivity. data-pagefind-ignore on chrome.
- articles/[slug].astro passes the component map too.
- Converted castle-dale-1880 article to .mdx with a TriviaCallout + CrossRef(16) (also fixed stale Ch18 ref).
- Deleted superseded ChapterLayout.astro (orphaned, missing site nav, /part/ 404).
- Reconnected for all 43 chapters with no content edits: TableOfContents, ChapterFooter, figure lightbox.
- Verified build (exit 0) + dist greps + dev smoke test (chapter + article 200, no overlay).
- Follow-up: vault->site sync must emit .mdx for inline CrossRef/engagement in chapters (else .md/.mdx collision).

## Session 2026-06-05 — Vault→site sync update (MDX-aware)
- Located the sync pipeline: external scheduled skill ~/.claude/Scheduled/eec-site-publisher/SKILL.md
  (writes ch{NN}.md to the repo; git-auto-push deploys). Updated step 3 to be MDX-aware:
  capability-detected (.mdx only if @astrojs/mdx present, else .md), collision-safe (never both extensions
  for a chapter), MDX-safe prose (escape stray <,{), and engagement-aware (render vault Ch{NN}_engagement_sidebars
  as TriviaCallout/ScavengerHunt/FamilyActivity/FigureImage/CrossRef, no imports).
- Added scripts/migrate-chapters-to-mdx.mjs (scan + safe rename + flag). Dry-run: 29 MDX-safe, 14 flagged
  (14 embed raw HTML <figure> blocks — convert to <FigureImage/> first). A blind rename would have broken the build.
- Did NOT run the bulk rename (master lacks MDX until PR #8 merges; 14 need <figure> conversion first).
- Sequencing documented in task_plan.md.
