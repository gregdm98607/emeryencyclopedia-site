#!/usr/bin/env node
// Promote approved chapter images from the staging folder into the live
// folder, then surface a checklist of chapter narratives that still need a
// figure block.
//
// What this script DOES (the mechanical part):
//   - Diffs image-curation/approved/ against public/images/chapters/
//   - Copies any file present in approved/ but missing in chapters/
//   - For each chapter that received new file(s), bumps `lastUpdated:` in
//     src/content/chapters/chXX.mdx to today's date.
//   - Prints a checklist grouped by chapter: which images are already
//     referenced in the chapter narrative vs. which still need an
//     <figure>/<figcaption> block.
//
// What this script does NOT do (the editorial part):
//   - It does not edit chapter narrative text. Insertion of a figure block
//     into the right paragraph is a judgment call left to the CTO/AI session
//     that runs this script.
//   - It does not git-commit or push. Run `git add`, `git commit`, `git push`
//     yourself once the figure blocks are in place.
//
// Usage:
//   node scripts/promote-approved-images.mjs            # do the work
//   node scripts/promote-approved-images.mjs --dry-run  # report only
//   node scripts/promote-approved-images.mjs --no-bump  # skip lastUpdated bump
//
// Exit code is 0 on success even when there are no new images.

import { readdir, copyFile, stat, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve, basename, extname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');

const APPROVED_DIR = join(REPO_ROOT, 'image-curation', 'approved');
const LIVE_DIR = join(REPO_ROOT, 'public', 'images', 'chapters');
const CHAPTERS_DIR = join(REPO_ROOT, 'src', 'content', 'chapters');

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');
const NO_BUMP = args.has('--no-bump');

function log(...parts) { console.log(...parts); }
function todayIso() { return new Date().toISOString().slice(0, 10); }

// Filenames in this project follow the pattern `chXX_...` — extract the
// chapter number so we can group output by chapter and locate the matching
// chapter content file. Returns null if the filename isn't chapter-prefixed.
function chapterNumberFromFilename(name) {
  const m = name.match(/^ch(\d{2})_/i);
  return m ? Number(m[1]) : null;
}

function chapterFilePath(chapterNum) {
  const padded = String(chapterNum).padStart(2, '0');
  return join(CHAPTERS_DIR, `ch${padded}.mdx`);
}

async function main() {
  if (!existsSync(APPROVED_DIR)) {
    log(`No Approved/ folder at ${APPROVED_DIR} — nothing to promote.`);
    return;
  }

  const approvedEntries = (await readdir(APPROVED_DIR, { withFileTypes: true }))
    .filter(d => d.isFile())
    .map(d => d.name);

  if (approvedEntries.length === 0) {
    log('Approved/ is empty. Nothing to do.');
    return;
  }

  // Bucket each approved file by what we're about to do with it.
  const newFiles = [];          // present in Approved/, missing in chapters/
  const alreadyLive = [];       // present in both
  const sizeMismatch = [];      // present in both but different size — flag, don't overwrite

  for (const name of approvedEntries) {
    const src = join(APPROVED_DIR, name);
    const dst = join(LIVE_DIR, name);
    if (!existsSync(dst)) {
      newFiles.push({ name, src, dst });
      continue;
    }
    const [s, d] = await Promise.all([stat(src), stat(dst)]);
    if (s.size !== d.size) {
      sizeMismatch.push({ name, srcSize: s.size, dstSize: d.size });
    } else {
      alreadyLive.push(name);
    }
  }

  log(`Approved/ contains ${approvedEntries.length} file(s):`);
  log(`  - ${alreadyLive.length} already promoted to chapters/`);
  log(`  - ${newFiles.length} new (will be copied)`);
  if (sizeMismatch.length) {
    log(`  - ${sizeMismatch.length} differ in size between Approved/ and chapters/ (NOT overwriting):`);
    for (const m of sizeMismatch) {
      log(`      ${m.name}  Approved=${m.srcSize}B  live=${m.dstSize}B`);
    }
  }

  // Copy phase.
  for (const f of newFiles) {
    if (DRY_RUN) {
      log(`[dry-run] would copy: ${f.name}`);
    } else {
      await copyFile(f.src, f.dst);
      log(`copied: ${f.name}`);
    }
  }

  // Group new files by chapter so we can bump lastUpdated and print a
  // narrative-embedding checklist.
  const byChapter = new Map();
  const unmatched = [];
  for (const f of newFiles) {
    const num = chapterNumberFromFilename(f.name);
    if (num === null) { unmatched.push(f.name); continue; }
    if (!byChapter.has(num)) byChapter.set(num, []);
    byChapter.get(num).push(f.name);
  }

  // For each affected chapter: bump lastUpdated and check whether the
  // chapter body already references each new image. The "already references"
  // case can happen when a chapter file was edited ahead of the image
  // promotion — we leave those alone. The "doesn't reference yet" case is
  // the editorial work the operator still needs to do.
  const checklist = [];
  for (const [num, files] of [...byChapter.entries()].sort((a, b) => a[0] - b[0])) {
    const chPath = chapterFilePath(num);
    if (!existsSync(chPath)) {
      checklist.push({ chapter: num, status: 'missing-file', path: chPath, files });
      continue;
    }
    const original = await readFile(chPath, 'utf8');

    const referenced = [];
    const needsEmbed = [];
    for (const fname of files) {
      const refToken = `images/chapters/${fname}`;
      if (original.includes(refToken)) referenced.push(fname);
      else needsEmbed.push(fname);
    }

    let bumped = false;
    if (!NO_BUMP) {
      const today = todayIso();
      const updated = original.replace(
        /^lastUpdated:\s*"?\d{4}-\d{2}-\d{2}"?\s*$/m,
        `lastUpdated: "${today}"`,
      );
      if (updated !== original) {
        if (!DRY_RUN) await writeFile(chPath, updated, 'utf8');
        bumped = true;
      }
    }

    checklist.push({
      chapter: num,
      status: 'ok',
      path: chPath,
      bumped,
      referenced,
      needsEmbed,
    });
  }

  // Print the checklist last so it survives long log output.
  log('');
  log('===== Chapter checklist =====');
  if (checklist.length === 0 && unmatched.length === 0) {
    log('No new images promoted — nothing to embed.');
    return;
  }
  for (const c of checklist) {
    const padded = String(c.chapter).padStart(2, '0');
    if (c.status === 'missing-file') {
      log(`ch${padded}: chapter file not found at ${c.path}`);
      log(`  files needing a home: ${c.files.join(', ')}`);
      continue;
    }
    log(`ch${padded}: ${c.bumped ? 'lastUpdated bumped' : 'lastUpdated unchanged'}`);
    if (c.referenced.length) {
      log(`  already in narrative (${c.referenced.length}): ${c.referenced.join(', ')}`);
    }
    if (c.needsEmbed.length) {
      log(`  NEEDS <figure> block (${c.needsEmbed.length}):`);
      for (const f of c.needsEmbed) log(`    [ ] ${f}`);
    }
  }
  if (unmatched.length) {
    log('');
    log('Files without a chXX_ prefix (skipped grouping):');
    for (const u of unmatched) log(`  - ${u}`);
  }

  if (DRY_RUN) {
    log('');
    log('--dry-run was set — no files were copied and no chapter frontmatter was modified.');
  }
}

main().catch(err => {
  console.error('promote-approved-images failed:', err);
  process.exit(1);
});
