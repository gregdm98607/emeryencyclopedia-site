#!/usr/bin/env node
// Build-time pipeline: reads census xlsx files from data/sources/, emits:
//   - src/data/census/<slug>.json  (consumed by the Astro data pages)
//   - public/data/<xlsxFile>       (downloadable original)
//
// Runs as `npm run build-data` and as a `prebuild` step so Vercel CI
// produces fresh JSON before each deploy.

import * as XLSX from 'xlsx';
import { readFile, writeFile, copyFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { DATASETS } from './datasets.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');

const SOURCES_DIR = join(REPO_ROOT, 'data', 'sources');
const DATA_OUT_DIR = join(REPO_ROOT, 'src', 'data', 'census');
const PUBLIC_DOWNLOAD_DIR = join(REPO_ROOT, 'public', 'data');

function camelCase(header) {
  // Preserve parenthetical qualifiers (e.g. "Citation (short)" vs "Citation (full)")
  // by flattening them into the token stream rather than dropping them.
  const cleaned = String(header).replace(/[()]/g, ' ');
  const parts = cleaned.split(/[^a-zA-Z0-9]+/).filter(Boolean);
  if (parts.length === 0) return String(header);
  return parts[0].toLowerCase() + parts.slice(1).map(p => p[0].toUpperCase() + p.slice(1).toLowerCase()).join('');
}

function mapRow(row, columnMap) {
  const out = {};
  for (const [key, val] of Object.entries(row)) {
    const mapped = columnMap?.[key] ?? camelCase(key);
    out[mapped] = val === '' ? null : val;
  }
  return out;
}

function sheetToObjects(workbook, sheetName) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found. Available: ${workbook.SheetNames.join(', ')}`);
  }
  return XLSX.utils.sheet_to_json(sheet, { defval: null, raw: true });
}

function parseSourceMeta(workbook, sheetName) {
  if (!sheetName) return null;
  const rows = sheetToObjects(workbook, sheetName);
  const meta = {};
  for (const row of rows) {
    // Expected shape: { Field: 'ID', Value: 'SRC-...' }
    const field = row.Field ?? row.field ?? row.FIELD;
    const value = row.Value ?? row.value ?? row.VALUE;
    if (field != null) meta[camelCase(String(field))] = value;
  }
  return meta;
}

function processHouseholds(rows) {
  // Children PER IDs comes in as "PER-...; PER-...; PER-..." — split to array.
  return rows.map(row => {
    const { childrenPerIdsRaw, ...rest } = row;
    const childrenPerIds = childrenPerIdsRaw
      ? String(childrenPerIdsRaw).split(/\s*;\s*/).filter(Boolean)
      : [];
    return { ...rest, childrenPerIds };
  });
}

async function buildDataset(dataset) {
  const sourcePath = join(SOURCES_DIR, dataset.xlsxFile);
  if (!existsSync(sourcePath)) {
    throw new Error(`Missing xlsx for dataset "${dataset.slug}": ${sourcePath}`);
  }

  const buf = await readFile(sourcePath);
  const workbook = XLSX.read(buf, { type: 'buffer', cellDates: true });

  const peopleRaw = sheetToObjects(workbook, dataset.sheets.people);
  const householdsRaw = sheetToObjects(workbook, dataset.sheets.households);
  const people = peopleRaw.map(r => mapRow(r, dataset.columnMap?.people));
  const households = processHouseholds(
    householdsRaw.map(r => mapRow(r, dataset.columnMap?.households))
  );
  const source = parseSourceMeta(workbook, dataset.sheets.sourceMeta);

  const payload = {
    slug: dataset.slug,
    community: dataset.community,
    year: dataset.year,
    counts: {
      people: people.length,
      households: households.length,
    },
    source,
    downloadUrl: `/data/${dataset.xlsxFile}`,
    lastBuilt: new Date().toISOString(),
    people,
    households,
  };

  // Emit JSON
  const jsonPath = join(DATA_OUT_DIR, `${dataset.slug}.json`);
  await writeFile(jsonPath, JSON.stringify(payload, null, 2), 'utf8');

  // Emit downloadable xlsx
  const publicXlsxPath = join(PUBLIC_DOWNLOAD_DIR, dataset.xlsxFile);
  await copyFile(sourcePath, publicXlsxPath);

  return { jsonPath, publicXlsxPath, payload };
}

async function main() {
  await mkdir(DATA_OUT_DIR, { recursive: true });
  await mkdir(PUBLIC_DOWNLOAD_DIR, { recursive: true });

  console.log(`EEC census data pipeline — ${DATASETS.length} dataset(s)`);
  for (const dataset of DATASETS) {
    try {
      const { jsonPath, publicXlsxPath, payload } = await buildDataset(dataset);
      console.log(
        `  ✓ ${dataset.slug}: ${payload.counts.people} people, ${payload.counts.households} households`
      );
      console.log(`    → ${jsonPath}`);
      console.log(`    → ${publicXlsxPath}`);
    } catch (err) {
      console.error(`  ✗ ${dataset.slug}: ${err.message}`);
      process.exitCode = 1;
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
