#!/usr/bin/env node
// PostToolUse hook: lint a content file right after Claude edits it.
// Reads the Claude Code hook payload from stdin, exits 2 with a message when
// the edited file would fail CI, so the error is fixed in-session instead of
// after a failed PR. Covers the failure classes this project has actually hit:
//   - frontmatter missing/invalid for the chapters/articles collections
//   - markdown autolinks (<https://...>) which are invalid in MDX
//   - referenced /images/... files that don't exist in public/
//   - <DataTable> without the required blank line before the table
//   - PhotoAssignment called with nonexistent props (location=, guidance=)

import { readFileSync, existsSync } from 'node:fs';
import { join, resolve, sep } from 'node:path';

let payload;
try {
  payload = JSON.parse(readFileSync(0, 'utf8'));
} catch {
  process.exit(0);
}

const filePath = payload?.tool_input?.file_path ?? '';
const normalized = filePath.replaceAll('\\', '/');
if (!/\/src\/content\/(chapters|articles)\/[^/]+\.mdx?$/.test(normalized)) {
  process.exit(0);
}
if (!existsSync(filePath)) process.exit(0);

// Repo root = two levels up from src/content/<collection>/<file>
const repoRoot = resolve(filePath, '..', '..', '..', '..');
const collection = normalized.includes('/chapters/') ? 'chapters' : 'articles';
const text = readFileSync(filePath, 'utf8');
const problems = [];

// --- frontmatter ---
const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fm) {
  problems.push('Missing YAML frontmatter — this collection is schema-validated and the build will fail.');
} else {
  const required =
    collection === 'chapters'
      ? ['title', 'chapter', 'part', 'status', 'description']
      : ['title', 'description', 'publishDate'];
  for (const key of required) {
    if (!new RegExp(`^${key}\\s*:`, 'm').test(fm[1])) {
      problems.push(`Frontmatter is missing required field "${key}" (${collection} schema).`);
    }
  }
  const status = fm[1].match(/^status:\s*['"]?([\w-]+)/m);
  if (
    collection === 'chapters' &&
    status &&
    !['stub', 'draft', 'fact-checked', 'revised', 'final'].includes(status[1])
  ) {
    problems.push(`status "${status[1]}" is not in the schema enum (stub|draft|fact-checked|revised|final).`);
  }
}

// --- MDX autolinks ---
const autolinks = text.match(/<https?:\/\/[^>\s]+>/g);
if (autolinks) {
  problems.push(
    `Markdown autolinks are invalid in MDX (parsed as JSX): ${autolinks.slice(0, 3).join(', ')}. Use [text](url) or a bare URL.`
  );
}

// --- referenced images must exist in public/ ---
const imageRefs = [
  ...text.matchAll(/(?:src=["']|!\[[^\]]*\]\()(\/images\/[^"')\s]+)/g),
].map((m) => m[1]);
for (const ref of new Set(imageRefs)) {
  const onDisk = join(repoRoot, 'public', ...decodeURI(ref).split('/').filter(Boolean));
  if (!existsSync(onDisk)) {
    problems.push(
      `Referenced image ${ref} does not exist in this worktree's public/ folder. ` +
        'Copy or promote it (npm run promote-images) before referencing it.'
    );
  }
}

// --- DataTable blank-line rule ---
if (/<DataTable\b[^>]*>\r?\n\|/.test(text)) {
  problems.push('<DataTable> needs a blank line between the opening tag and the first | table row (MDX requirement).');
}

// --- PhotoAssignment prop drift guard ---
const paBlocks = text.match(/<PhotoAssignment\b[\s\S]*?\/?>/g) ?? [];
for (const block of paBlocks) {
  if (/\b(location|guidance)\s*=/.test(block)) {
    problems.push(
      'PhotoAssignment has no "location"/"guidance" props — use where= and lookFor=. See docs/authoring/mdx-components.md.'
    );
  }
}

if (problems.length) {
  console.error(
    `Content lint failed for ${filePath.split(sep).pop()}:\n- ${problems.join('\n- ')}\n` +
      'Fix these now — they would fail CI or silently not render.'
  );
  process.exit(2);
}
process.exit(0);
