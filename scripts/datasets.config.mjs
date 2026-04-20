// EEC dataset registry — one entry per community × census year.
//
// Adding a new dataset:
//   1. Drop the xlsx into `data/sources/` (editorial canonical lives in
//      06_Research/<community>_OPS/ in the Obsidian vault; copy to the site
//      repo when ready to publish a snapshot).
//   2. Add an entry below matching the xlsx's sheet/column structure.
//   3. Run `npm run build-data`.
//   4. The build script produces `src/data/census/<slug>.json` for the site
//      and `public/data/<xlsxFile>` for the download affordance.
//
// Schema is Option B today — a single JSON blob per dataset, rendered as one
// browsable table page at /data/<slug>. When dataset count grows enough to
// justify Option C (per-dwelling and per-person routes), we keep this config
// intact and layer a second collection-generating script on top.

export const DATASETS = [
  {
    slug: 'castle-dale-1880',
    community: 'Castle Dale',
    year: 1880,
    xlsxFile: 'Castle_Dale_1880_Census.xlsx',
    sheets: {
      people: 'Census',
      households: 'Households',
      sourceMeta: 'Source',
    },
    // Column-name → JSON-field mapping. Any xlsx columns not listed here get
    // camelCased automatically. Explicit mappings let us keep JSON field names
    // stable even if the xlsx header text is tweaked later.
    columnMap: {
      people: {
        'Page': 'page',
        'Line': 'line',
        'Dwelling': 'dwelling',
        'Family': 'family',
        'PER ID': 'perId',
        'Surname (canonical)': 'surname',
        'Given (canonical)': 'given',
        'As enumerated': 'asEnumerated',
        'Sex': 'sex',
        'Age (1880)': 'age',
        'Birth year': 'birthYear',
        'Birth place': 'birthPlace',
        'Father BP': 'fatherBP',
        'Mother BP': 'motherBP',
        'Relationship': 'relationship',
        'Occupation': 'occupation',
        'Flags': 'flags',
        'Family ref': 'familyRef',
        'Verification': 'verification',
      },
      households: {
        'FAM ID': 'famId',
        'Page': 'page',
        'Dwelling': 'dwelling',
        'Title': 'title',
        'Husband PER': 'husbandPer',
        'Wife PER': 'wifePer',
        'Children (count)': 'childrenCount',
        'Flags': 'flags',
        'Verification': 'verification',
        'Children PER IDs': 'childrenPerIdsRaw', // split into array below
      },
    },
  },
];
