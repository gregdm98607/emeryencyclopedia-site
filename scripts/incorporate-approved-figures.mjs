#!/usr/bin/env node
/**
 * incorporate-approved-figures.mjs
 *
 * Step 3 of the EEC FIGURE workflow — the sibling of incorporate-approved-images.mjs,
 * kept separate because figures have different provenance and different invariants:
 *
 *   1. The eec-branded-infographics skill builds a figure into
 *      figure-curation/proposed/ as a trio: .html (source), .svg (ships), .png (raster).
 *   2. Greg approves or rejects; Claude moves the whole trio into
 *      figure-curation/approved/ or figure-curation/rejected/.
 *   3. Approved figures that a chapter actually references get INCORPORATED —
 *      copied into the served root so they deploy.  <-- this script
 *
 * `figure-curation/` is gitignored local staging (outside public/ so staged figures
 * can never deploy). Only the copies in the tracked root are committed and deployed.
 *
 * Differences from the image script, and why:
 *   - Only .svg and .png are ever incorporated. The .html is the editable source and
 *     must never reach the served root.
 *   - Warns when an approved figure has no .html source next to it, because that
 *     figure can no longer be revised or restyled — it is effectively a dead end.
 *   - Warns when a chapter references the .png of a figure whose .svg also exists,
 *     since the vector is the intended ship format and the raster is the fallback.
 *
 * Usage:
 *   node scripts/incorporate-approved-figures.mjs           # dry-run (report only)
 *   node scripts/incorporate-approved-figures.mjs --write   # copy approved → root
 */
import { readdirSync, readFileSync, existsSync, copyFileSync } from 'node:fs';
import { join, parse } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const IMG_ROOT = join(ROOT, 'public', 'images', 'chapters');
const APPROVED = join(ROOT, 'figure-curation', 'approved');
const write = process.argv.includes('--write');

if (!existsSync(APPROVED)) {
  console.error(`No figure-curation/approved/ directory at ${APPROVED}`);
  process.exit(1);
}

function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(astro|mdx|md|ts|tsx|js|json)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

// Only figure-class assets: chNN_figure_<slug>.<svg|png>
const refRe = /images\/chapters\/(ch\d{2}_figure_[A-Za-z0-9_.-]+\.(?:svg|png))/gi;
const referenced = new Set();
for (const file of walk(SRC)) {
  const txt = readFileSync(file, 'utf8');
  for (const m of txt.matchAll(refRe)) referenced.add(m[1]);
}

const approvedFiles = new Set(readdirSync(APPROVED));

let incorporated = 0, missing = 0, already = 0;
const noSource = [];
const rasterOverVector = [];

for (const name of [...referenced].sort()) {
  const { name: base, ext } = parse(name);

  // A figure with no .html beside it can never be revised. Flag it.
  if (!approvedFiles.has(`${base}.html`) && approvedFiles.has(name)) {
    if (!noSource.includes(base)) noSource.push(base);
  }
  // Prefer the vector when both exist.
  if (ext === '.png' && approvedFiles.has(`${base}.svg`)) rasterOverVector.push(name);

  if (existsSync(join(IMG_ROOT, name))) { already++; continue; }
  if (approvedFiles.has(name)) {
    console.log(`${write ? 'incorporated' : 'would incorporate'}: ${name}`);
    if (write) copyFileSync(join(APPROVED, name), join(IMG_ROOT, name));
    incorporated++;
  } else {
    console.log(`MISSING — referenced but not in root or approved/: ${name}`);
    missing++;
  }
}

console.log(
  `\n${incorporated} ${write ? 'incorporated' : 'to incorporate'}, ` +
    `${missing} missing, ${already} already in root.` +
    (write
      ? '\nNext: review, then `git add public/images/chapters/*` and commit.'
      : ' Dry-run — use --write to copy.')
);

if (missing > 0) {
  console.log('\nMISSING figures are referenced by a chapter but not approved yet.');
  console.log('Approve them (move the trio into figure-curation/approved/) or remove the reference.');
}
if (rasterOverVector.length) {
  console.log(`\nUsing the raster where a vector exists (${rasterOverVector.length}):`);
  for (const n of rasterOverVector) console.log(`  ${n} — consider switching the MDX to .svg`);
}
if (noSource.length) {
  console.log(`\nApproved with no .html source (${noSource.length}) — these cannot be revised later:`);
  for (const b of noSource) console.log(`  ${b}`);
}

process.exit(missing > 0 ? 1 : 0);
