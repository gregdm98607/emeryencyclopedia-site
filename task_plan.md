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

## Notes
- Astro 6.1.2, @astrojs/sitemap, @vercel/analytics, pagefind (search), xlsx (census build).
- Engagement layer exists: ScavengerHunt, TriviaCallout, FamilyActivity — unusual for an encyclopedia, worth assessing.
- 43 chapter markdown files; data-driven via src/data/chapters.ts.
