# Findings — EEC Site Design Review

## Stack
- Astro v6.1.2 static site. Search via Pagefind (postbuild). Sitemap. @vercel/analytics dep (usage TBD).
- Census data built from xlsx via `scripts/build-census-data.mjs` (prebuild).
- Image promotion workflow: `scripts/promote-approved-images.mjs`.

## CONFIRMED / STRONG FINDINGS (with file refs)

### BUGS
1. **Brand web fonts are never loaded** — global.css declares `--font-display: 'Libre Baskerville'`,
   `--font-body: 'Source Sans 3'`, `--font-mono: 'JetBrains Mono'`; Hero.astro & index.astro hardcode
   'Libre Baskerville'/'Source Sans 3'. BaseLayout.astro has NO `<link>`/`@font-face`/fontsource import.
   → Whole "Desert Scholarly" type system silently falls back to Georgia/system-ui. (VERIFY via grep)
2. **Newsletter forms post to `/api/subscribe`** (footer + homepage pipeline) but site builds static
   (no SSR adapter in package.json, no `src/pages/api/` in glob). → likely 404 → always shows error. (VERIFY)
3. **Conflicting CSS var values across components**:
   - `--mesa-red`: global.css/Hero `#A0522D` vs Header/Footer/index `#C85A54` (same token, 2 colors).
   - Each component redefines `:root` locally instead of consuming global tokens. Brand drift.
4. **Chapter title disagreement between Header & Footer** (users see both):
   - Header Part II: Ch9 "Ute Territory & Culture", Ch10 "Paiute & Shoshone Presence".
   - Footer Part II: Ch9 "Fremont Culture", Ch10 "Numic Expansion".
   - Two hardcoded sources of truth (+ chapters.ts = 3). Data drift already present.
5. **Desktop mega-menu is hover-only** — opens on `:hover`, no focus/keyboard/touch support,
   no aria-haspopup/aria-expanded on top items. Keyboard + touch (at desktop width) users can't reach it.
   (Mobile uses <details> = OK.)
6. **Header links all chapters as live** (`/chapters/24` etc.) while Footer marks many `available:false`.
   → mega-menu may lead to 404/stub dead-ends. Inconsistent affordance. (VERIFY [chapter].astro 404 behavior)
7. **Hero.astro appears orphaned** — index.astro uses its OWN inline `<video>` hero, not the Hero
   component (which has random landscape image + scroll hint). Dead code / two hero systems. (VERIFY usage)
8. **No prefers-reduced-motion** anywhere — `scroll-behavior: smooth`, autoplay `<video>` bg, float
   animation, many transforms. A11y (vestibular) gap.
9. **Autoplay background `<video>`** (hero_animation_aerial.mp4) — no reduced-motion guard, no dimensions,
   mobile data/perf cost.

### A11y / SEO
- No skip-to-content link (`.sr-only` class exists but unused for skip nav).
- GA gtag loads unconditionally; privacy-policy page exists but no cookie consent (GDPR risk).
- No JSON-LD structured data (Article/Book/BreadcrumbList) — SEO miss for an encyclopedia.
- No theme-color, apple-touch-icon (favicon.svg only).
- Contrast watch: badge-coming-soon (sandstone #D4A574 text on light #F7F3ED ≈ fails); muted-text borderline.

### UX
- Three near-identical newsletter forms with duplicated JS (footer x1, homepage pipeline x1) — should be one component; inconsistent copy & `source` param.
- "Latest Chapters" actually shows first-3-by-array-order (final|revised), not newest.
- index hero min-height 70vh vs Hero.astro 100svh — inconsistent.

## Structure recap
- Components: ChapterCard, CrossRef, FigureImage, PipelineTracker, SearchOverlay, TableOfContents,
  Hero(orphan?), Header, Footer, ChapterFooter, engagement/{FamilyActivity, ScavengerHunt, TriviaCallout}
- Layouts: BaseLayout, ChapterLayout, ArticleLayout
- Pages: index, about, contact, explore, geology, resources, privacy-policy, terms,
  chapters/{index,[chapter]}, articles/{index,[slug]}, data/castle-dale-1880, rss.xml

## CONFIRMED round 2

### Fonts — CONFIRMED BUG
- astro.config.mjs: integrations = [sitemap()] only. No font integration, no adapter.
- No @font-face / fontsource / googleapis anywhere. → brand fonts never load. Site renders Georgia + system-ui.

### Newsletter — CONFIRMED BUG
- No adapter in astro.config (static build). No src/pages/api/. → /api/subscribe 404s. All 3 forms error.
- Privacy policy references ConvertKit/Kit + "source:'chapter'" Kit tag — intended integration never wired.

### ORPHANED / DEAD COMPONENTS (built, never imported) — major
Grep for imports across src confirms these are referenced only by their own file (or by other orphans):
- Hero.astro (index uses its own inline <video> hero instead)
- ChapterLayout.astro (no page imports it; [chapter].astro uses BaseLayout directly)
- ChapterFooter.astro (only imported by orphaned ChapterLayout)
- TableOfContents.astro (never imported) — so 50-min chapter reads have NO in-page jump nav
- CrossRef.astro (never imported)
- FigureImage.astro (never imported) — the image/lightbox system is unused
- PipelineTracker.astro (never imported; index has inline pipeline duplicate)
- engagement/TriviaCallout, ScavengerHunt, FamilyActivity (never imported)
→ Two consequences: (a) lots of dead code; (b) the *intended* richer chapter UX (sticky TOC,
  related-chapters footer, cross-references, figure lightbox, engagement widgets) is NOT on live pages.

### Chapters are .md not .mdx
- content.config loads `**/*.md`. Markdown can't embed Astro components. So even if wired, CrossRef/
  FigureImage/engagement can't be used inline in chapter bodies. Chapters are long prose + parenthetical
  citations (e.g. ch01 = 12,847 words / "51 min read") with no footnotes, no figures, no section nav.

### Source-of-truth drift — CONFIRMED (3 hardcoded chapter lists disagree)
- Header mega-menu titles are STALE vs chapters.ts: e.g. Ch24 "Arts & Music"→ actually "Education & Learning";
  Ch36 "Scenic Drives"→ "Travel & Logistics"; Ch37 "Hiking & Trails"→ "Archives, Museums & Libraries";
  Ch9 "Ute Territory"→ "Fremont Culture". Whole Parts IV–VI mislabeled in nav.
- Footer marks ~20 chapters available:false (greyed, unlinkable) that are 'final' in chapters.ts (have pages).
  Footer Ch22 "Communities & Towns" → chapters.ts Ch22 = "Demography & Social Change". Missing Ch21, Ch23.
- TOC page (chapters/index.astro) + ChapterCard ARE data-driven from chapters.ts (correct). Only Header/Footer
  are hand-maintained and rotted. Fix = generate Header/Footer from chapters.ts + PARTS.

### ChapterCard
- Badge shows "Available" for final/draft/revised/fact-checked alike (a 'draft' looks identical to 'final').
- Links /chapters/{n}. isLinkable for all non-stub. Consistent with routing. OK.

### explore.astro (MapLibre map) — nice feature, real bugs
- Loads maplibre-gl JS+CSS from unpkg CDN (render-blocking, no SRI/defer; supply-chain + perf).
- Uses tile.openstreetmap.org raster tiles directly — violates OSM tile usage policy for production.
- Popup "Related chapters" link to `/chapters#ch21` but TOC cards have no id anchors → hash no-ops.
- Landmark→chapter mappings stale/arbitrary (every community → Ch21 "Energy Transition"; refs a
  "Communities & Towns" chapter that no longer exists). Wrong links.
- height calc(100vh - 72px) assumes 72px header but mobile header=56px → 16px overflow on mobile.

### SearchOverlay — solid, minor gaps
- Pagefind + Cmd/K + Esc + backdrop close. Good.
- No focus trap (Tab escapes dialog); no aria-modal; hint says "Enter to search" but it's search-as-you-type;
  no "no results" empty state.

### A11y / motion / SEO (recap, still open)
- No skip link; desktop mega-menu hover-only (no keyboard/touch); no prefers-reduced-motion;
  autoplay video bg; GA without consent; no JSON-LD; favicon.svg only; contrast watch on sandstone badges.

## STILL TO READ (secondary)
- geology.astro, articles/[slug].astro + ArticleLayout, data/castle-dale-1880.astro, about, resources, contact
- (quality skim) TableOfContents, ChapterFooter, FigureImage, engagement/* to describe what's missed
- ch02.md (normal chapter shape), articles/index.astro
## BUILD RESULT (npm run build)
- Exit 0. 55 pages built in ~3.2s. Sitemap created. Pagefind indexed 55 pages.
- Pagefind "Indexed 15046 words" = unique vocabulary, NOT total. Built ch1/index.html = 73KB and
  CONTAINS prose ("physiographic provinces" ×6) → search DOES cover chapter content. (earlier worry retracted)
- Pagefind warning: "Did not find a data-pagefind-body" → indexes whole <body> incl. header nav + footer
  chapter list on every page → results/excerpts polluted by boilerplate. (minor search-quality bug, valid)

## WORD COUNT / READING TIME — verified
- ch01.md actual body ≈5,300 words but advertises wordCount 12,847 / "51 min read". Overstated ~2.4×.
- ch18 5,026 advertised vs ~4,300 actual; ch22 ~matches; ch31 ~matches. → Ch01 is the egregious outlier.
- All ch*.md combined = 201,229 words (real, substantial corpus).

## Orphaned components — quality notes (all good, all unused because chapters are .md)
- ChapterFooter: prev/next chapter nav + related reading + newsletter (data-driven from chapters.ts). EXCELLENT, missing from live pages.
- TableOfContents: sticky TOC + IntersectionObserver scroll-spy + reading-progress bar + mobile drawer (drawer has no open trigger; observes `.prose` which live page doesn't use).
- CrossRef: inline "Ch.NN" link with hover/focus preview card; uses CORRECT global tokens; keyboard-ok.
- FigureImage: responsive figure + caption/credit + numbered annotations + click lightbox (Escape listener stacks per-open; no focus trap; uses unloaded 'Source Sans 3').
- TriviaCallout / ScavengerHunt / FamilyActivity: engagement widgets (the "interactivity" the About page promises but the site doesn't deliver).
- Hero, PipelineTracker: duplicate of index.astro inline versions.

## Live-page extras
- contact.astro: NO form — just mailto: (honest given no backend; but About/Resources/Footer imply a form).
- resources.astro: dead/typo external links (www.nativamerican.si.edu, www.wildlifegov.org, lightroom.adobe.com);
  ALL external links target="_blank" without rel="noopener"; chapter-status text stale (says ch18/19 "draft" — now final).
- articles/index.astro + data/castle-dale-1880.astro: clean, data-driven, fallback tokens present. Census page (sort/filter/URL-sync/download/citation) is a standout.
- geology.astro: strong interactive strat column; BUT timeline labels truncated ("Carboniferou","Pennsylv."), is:global leak, NOT in main nav.
- Nav discoverability gaps: Geology, Articles, Census dataset not in Header or Footer.

## FINAL SEVERITY LIST → see chat answer (Bugs / UX / Roadmap / Wow)
