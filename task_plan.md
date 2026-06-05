# Task Plan: Master Web Designer Review — emeryencyclopedia-site

## Goal
Act as a master web designer and review the EEC (Encyclopedia of Emery County) Astro site.
Deliver four categorized outputs:
1. **Bugs** — broken/incorrect/risky code, a11y defects, responsive breaks, SEO/meta gaps.
2. **User functional improvements** — UX/usability wins for real visitors.
3. **Roadmap items** — larger enhancements to grow the site.
4. **Wow factors** — delight/differentiation to add to the backlog.

## Scope
- Astro v6 static site. Source in `src/` (components, layouts, pages, content, data, styles).
- Review design system (global.css), layouts, nav (Header/Footer), homepage, chapter & article
  templates, search, engagement components, data pipeline (census), config (astro.config, content.config).
- Where possible, build/run the site to catch real errors and view rendered output.

## Phases
- [x] Phase 1: Orient — structure, package.json, configs.
- [x] Phase 2: Read core design files — global.css, BaseLayout, Header, Footer, index, Hero.
- [x] Phase 3: Read templates & key pages — Chapter/Article layouts, chapters index, explore, geology, resources, search.
- [x] Phase 4: Read engagement components, data layer, content config, sample chapters.
- [x] Phase 5: Build the site (exit 0, 55 pages); verified prose-in-HTML + word-count drift.
- [x] Phase 6: Synthesize findings into 4 categories with severity + effort; report delivered in chat.

## Implementation — Quick Wins (2026-06-05)
- [x] B1 Fonts: installed @fontsource/{libre-baskerville, source-sans-3, jetbrains-mono} (self-hosted,
      no CDN); `@import`ed in global.css; aligned 7 component `--font-body` overrides to include 'Source Sans 3'.
      Caught + fixed the @fontsource-variable family-name mismatch ("Source Sans 3 Variable" → switched to static).
- [x] B3 Nav drift: Header mega-menu + mobile menu and Footer chapter index now generate from
      CHAPTERS + getAllParts() (single source of truth). Markup unchanged; only data source swapped.
      Added max-height/scroll to mega-menu (now lists all 43). Footer availability derived from status.
- Verified: build exit 0; @font-face families "Source Sans 3"/Libre Baskerville/JetBrains Mono present;
  corrected titles in dist, stale titles gone, ch20/22/23 now linked.
- [x] Dev-server crash (pre-existing): SearchOverlay `import('/pagefind/pagefind.js')` failed to resolve
      under `astro dev` (the astro.config `external` only applies to build). Fixed with a
      non-analyzable specifier + `/* @vite-ignore */`. Verified: dev home + /chapters/16 return 200,
      no resolve error / no Vite error overlay; production build still exit 0.
- [x] B4 token names: global.css now defines the legacy aliases ArticleLayout/data pages referenced but
      that were undefined (--color-background, --color-text-muted, --color-border-light,
      --color-accent-primary, --color-alkali-flat) → live article page colors resolve correctly.
- [x] B5 --mesa-red unified: canonical value set to #C85A54 (what the live UI already used); added
      --mesa-red-deep (#A0522D) for the hero/Part-III sienna; added missing palette tokens
      (--forest-green/--sky-blue/--canyon-bronze) to global so component :root dupes now AGREE (safe to
      remove later; left in place this pass). No live regression (global --mesa-red only fed --color-cta,
      consumed solely by orphaned PipelineTracker).
- [x] Bonus a11y (additive, CSS/markup-only): prefers-reduced-motion reset (animations/transitions/
      smooth-scroll) + skip-to-content link wired into BaseLayout (<main id="main-content" tabindex="-1">).
- Verified: build exit 0; built CSS shows single --mesa-red:#C85A54 + --color-accent-primary defined;
  prefers-reduced-motion + .skip-link emitted; skip link + #main-content in dist/index.html; article page builds.
- [x] Cleanup — :root dedup: removed redundant local palette blocks from 9 files (Header/Footer/about/
      resources/chapters-index/[chapter]/index/ChapterCard/contact); explore trimmed to its map accent;
      global.css is now the single token source (--sandstone only in global). --sage-green canonicalized
      to #6B9B6F (no visual change). contact body now var(--font-body).
- [x] Cleanup — search scoping: data-pagefind-body on BaseLayout <main> + ArticleLayout <article>;
      nav/footer no longer indexed; warning gone; 55 pages still indexed. Build exit 0.

## Errors
| Error | Attempt | Resolution |
|-------|---------|------------|
| Source Sans 3 not applying after first build | 1 | @fontsource-variable registers family "Source Sans 3 Variable"; switched to static @fontsource/source-sans-3 (family "Source Sans 3") so existing refs resolve. |

## Implementation — MDX Migration / reconnect orphaned components (2026-06-05)
- [x] Installed @astrojs/mdx ^6.0.2; added mdx() to astro.config integrations; collection globs now **/*.{md,mdx}.
- [x] Rebuilt src/pages/chapters/[chapter].astro into a two-column layout inside BaseLayout (keeps site Header/Footer):
      sticky TableOfContents (from render() headings), fixed breadcrumb (no /part/ 404), .prose body using the
      global design system, ChapterFooter (prev/next + related), and a figure lightbox for .prose images.
      Passes a components map {CrossRef, FigureImage, TriviaCallout, ScavengerHunt, FamilyActivity} to <Content/>
      so MDX chapters can use them with no per-file imports. Search hygiene: data-pagefind-ignore on breadcrumb/TOC/footer.
- [x] articles/[slug].astro also passes the components map to <Content/>.
- [x] Demo: converted castle-dale-1880.md -> .mdx and added a <TriviaCallout/> + <CrossRef chapter={16}/>
      (the CrossRef also fixed a stale "Chapter 18" reference; companion is Ch16).
- [x] Deleted superseded orphaned src/layouts/ChapterLayout.astro (it lacked the site Header/Footer and had a /part/ 404).
- Reconnected for ALL chapters with zero content changes: TableOfContents, ChapterFooter (prev/next+related), figure lightbox.
  CrossRef + engagement widgets are now usable in any .mdx (proven live on the article).
- Verified: build exit 0; ch2 shows toc-sidebar + chapter-nav + Related Reading + breadcrumb; TOC anchors match heading ids;
  prev/next -> /chapters/1 and /chapters/3; article renders trivia-callout + crossref ("Ch16: Mormon Colonization");
  pagefind 55 pages; dev smoke test /chapters/2 + /articles/castle-dale-1880 -> 200, no overlay.
- FOLLOW-UP (operational): the vault->site sync writes chNN.md. To use CrossRef/engagement INLINE in the 43 chapters,
  the sync must emit .mdx (or run a converter); otherwise a .md + .mdx with the same chapter number would collide.
  Until then, .md chapters still get the auto furniture (TOC/prev-next/lightbox).

## Implementation — Vault→Site Sync (MDX) (2026-06-05)
- [x] Updated the external sync pipeline `~/.claude/Scheduled/eec-site-publisher/SKILL.md` (step 3) to be MDX-aware:
      - Writes `ch{NN}.mdx` when the site supports MDX (detects `@astrojs/mdx` in package.json), else legacy `.md`.
        → capability-gated, so it stays on `.md` until the MDX PR (#8) is merged to master; no premature breakage.
      - Collision-safe: after writing one extension, deletes the sibling (`.md`/`.mdx`) so a chapter never has both
        (two entries with the same `chapter:` number break the build).
      - MDX-safety guidance: escape literal `<`/`{` in prose; keep real component tags + autolinks intact.
      - Engagement-aware: render the vault's `Ch{NN}_engagement_sidebars.md` as <TriviaCallout>/<ScavengerHunt>/
        <FamilyActivity>/<FigureImage>/<CrossRef> (provided globally, no imports). Only render authored content.
- [x] Added repo tool `scripts/migrate-chapters-to-mdx.mjs` — scans chapters for MDX hazards ("<tag", "</", "{"),
      renames only the MDX-safe ones (--write), flags the rest. Dry-run report: **29 MDX-safe, 14 flagged**
      (the 14 embed raw HTML `<figure>` blocks → convert to <FigureImage/> before migrating). Confirms a blind
      bulk rename would have broken the build.
- Sequencing: (1) merge PR #8 (adds @astrojs/mdx to master); (2) run `node scripts/migrate-chapters-to-mdx.mjs --write`
      then `npm run build`; (3) convert the 14 flagged chapters' <figure> HTML to <FigureImage/> and migrate those.
      The publisher then keeps chapters as `.mdx` going forward.

## Notes
- Astro 6.1.2, @astrojs/sitemap, @vercel/analytics, pagefind (search), xlsx (census build).
- Engagement layer exists: ScavengerHunt, TriviaCallout, FamilyActivity — unusual for an encyclopedia, worth assessing.
- 43 chapter markdown files; data-driven via src/data/chapters.ts.
