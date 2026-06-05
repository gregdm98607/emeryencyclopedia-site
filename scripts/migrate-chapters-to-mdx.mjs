#!/usr/bin/env node
/**
 * migrate-chapters-to-mdx.mjs
 *
 * One-time helper to move chapter content from `.md` to `.mdx` so chapters can
 * use inline components (CrossRef, TriviaCallout, FigureImage, ScavengerHunt,
 * FamilyActivity). Markdown is valid MDX, so this is essentially a rename — BUT
 * MDX is stricter than Markdown: a bare "<" (followed by a letter) is read as a
 * component tag and "{" as a JavaScript expression. A blind rename of prose like
 * "below <5,000 ft" or "set {x}" would break the build.
 *
 * This script scans each chapter, renames the MDX-safe ones, and FLAGS any that
 * contain "<tag", "</", or "{" so you can escape them first (&lt; / &#123;).
 *
 * Usage:
 *   node scripts/migrate-chapters-to-mdx.mjs                 # dry-run (default): report only
 *   node scripts/migrate-chapters-to-mdx.mjs --write         # rename the MDX-safe chapters
 *   node scripts/migrate-chapters-to-mdx.mjs --write --force # also rename flagged chapters
 *
 * Requires @astrojs/mdx to be enabled in the site. After --write, run
 * `npm run build` to confirm nothing regressed.
 */
import { readdirSync, readFileSync, renameSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(process.cwd(), 'src', 'content', 'chapters');
const write = process.argv.includes('--write');
const force = process.argv.includes('--force');

function stripFrontmatter(src) {
  if (src.startsWith('---')) {
    const end = src.indexOf('\n---', 3);
    if (end !== -1) return src.slice(src.indexOf('\n', end + 1) + 1);
  }
  return src;
}

function mdxHazards(body) {
  const hazards = [];
  // "<" + letter, excluding Markdown autolinks (<https://...>, <mailto:...>)
  const tagLike = body.match(/<(?!https?:|mailto:)[A-Za-z][^>\s]*/g) || [];
  if (tagLike.length) hazards.push(`${tagLike.length}x "<tag" (e.g. ${tagLike[0]})`);
  if (body.includes('</')) hazards.push('closing "</"');
  if (body.includes('{')) hazards.push('"{" expression char');
  return hazards;
}

const files = readdirSync(DIR).filter((f) => /^ch\d+\.md$/i.test(f)).sort();
if (!files.length) {
  console.log('No ch*.md files found in', DIR);
  process.exit(0);
}

let safe = 0, flagged = 0, renamed = 0, skipped = 0;
for (const file of files) {
  const mdx = file.slice(0, -3) + '.mdx';
  if (existsSync(join(DIR, mdx))) {
    console.log(`skip   ${file} (${mdx} already exists)`);
    skipped++;
    continue;
  }
  const body = stripFrontmatter(readFileSync(join(DIR, file), 'utf8'));
  const hazards = mdxHazards(body);
  if (hazards.length) {
    flagged++;
    console.log(`FLAG   ${file} — escape first: ${hazards.join('; ')}`);
    if (write && force) {
      renameSync(join(DIR, file), join(DIR, mdx));
      renamed++;
      console.log(`       -> renamed (forced)`);
    }
  } else {
    safe++;
    if (write) {
      renameSync(join(DIR, file), join(DIR, mdx));
      renamed++;
      console.log(`rename ${file} -> ${mdx}`);
    } else {
      console.log(`ok     ${file} (MDX-safe)`);
    }
  }
}

console.log(
  `\nSummary: ${safe} MDX-safe, ${flagged} flagged, ${skipped} already .mdx.` +
    (write ? ` Renamed ${renamed}.` : ' Dry-run — no files changed. Use --write to apply.')
);
if (write) console.log('Next: run `npm run build` to verify the migration.');
