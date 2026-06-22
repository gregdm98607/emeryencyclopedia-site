#!/usr/bin/env node
/**
 * incorporate-approved-images.mjs
 *
 * Step 3 of the EEC image workflow (the previously-manual part):
 *   1. eec-visual-research proposes images into public/images/chapters/.
 *   2. A human sorts them into Approved/ or Rejected/.
 *   3. Approved images that a chapter actually references get INCORPORATED —
 *      copied into the served root so they deploy.  <-- this script
 *
 * `public/images/chapters/Approved/` is gitignored local staging; only images
 * in the tracked root are committed and deployed. This script copies every
 * Approved/ image that a chapter references (via `/images/chapters/<name>`)
 * into the root. Run it locally after approving images, then commit the result.
 *
 * Usage:
 *   node scripts/incorporate-approved-images.mjs           # dry-run (report only)
 *   node scripts/incorporate-approved-images.mjs --write   # copy approved → root
 */
import { readdirSync, readFileSync, existsSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const IMG_ROOT = join(ROOT, 'public', 'images', 'chapters');
const APPROVED = join(IMG_ROOT, 'Approved');
const write = process.argv.includes('--write');

// Gather every root-level chapter image referenced in source (no subfolder paths).
function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(astro|mdx|md|ts|tsx|js|json)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

const refRe = /images\/chapters\/([A-Za-z0-9_.-]+\.(?:png|jpe?g|gif|webp|svg))/gi;
const referenced = new Set();
for (const file of walk(SRC)) {
  const txt = readFileSync(file, 'utf8');
  for (const m of txt.matchAll(refRe)) referenced.add(m[1]);
}

let incorporated = 0, missing = 0, already = 0;
for (const name of [...referenced].sort()) {
  if (existsSync(join(IMG_ROOT, name))) { already++; continue; }
  if (existsSync(join(APPROVED, name))) {
    console.log(`${write ? 'incorporated' : 'would incorporate'}: ${name}`);
    if (write) copyFileSync(join(APPROVED, name), join(IMG_ROOT, name));
    incorporated++;
  } else {
    console.log(`MISSING — referenced but not in root or Approved/: ${name}`);
    missing++;
  }
}

console.log(
  `\n${incorporated} ${write ? 'incorporated' : 'to incorporate'}, ` +
    `${missing} missing, ${already} already in root.` +
    (write ? '\nNext: review, then `git add public/images/chapters/*.*` and commit.' : ' Dry-run — use --write to copy.')
);
if (missing > 0) {
  console.log('\nNOTE: "MISSING" images are referenced by a chapter but not approved yet —');
  console.log('approve them (move into Approved/) or remove the reference from the chapter.');
}
