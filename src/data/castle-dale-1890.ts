/**
 * Castle Dale, 1890 — four interactive 3-D reconstructions of the townsite.
 *
 * Part of the Castle Dale One Place Study. The models themselves are
 * self-contained HTML files in /public/maps/castle-dale-1890/ (copies of the
 * originals in the Castle_Dale_OPS project folder — edit there, re-copy here).
 * Each is shown inside a site viewer page at /studies/castle-dale/1890/<slug>/.
 *
 * The four are a 2 × 2 set: two rendering styles (photographic, simulation)
 * each produced with two AI models from the same source maps.
 */

export type ReconstructionStyle = 'photographic' | 'simulation';

export interface Reconstruction {
  /** URL slug; also the file name under /public/maps/castle-dale-1890/. */
  slug: string;
  /** Roman plate number, I–IV. */
  plate: string;
  style: ReconstructionStyle;
  /** AI model the reconstruction was built with. */
  model: string;
  /** Short title for the plate card. */
  title: string;
  /** One-paragraph description of what makes this version distinct. */
  description: string;
  /** Things to try inside the model. */
  highlights: string[];
  /** Approximate file weight, shown so readers on slow links know. */
  weight: string;
}

export const RECONSTRUCTIONS: Reconstruction[] = [
  {
    slug: 'photo-claude',
    plate: 'I',
    style: 'photographic',
    model: 'Claude Opus 5.5',
    title: 'The Valley at Four O’Clock',
    description:
      'A naturalistic landscape set on present-day USGS terrain, with Cottonwood Creek’s cottonwoods, lucerne and stubble fields, and the bench rising above town. Drawn on M. F. Shelton’s townsite survey of 28 December 1880.',
    highlights: [
      'Drag the light slider through an afternoon of 20 September 1890',
      'Jump to preset views — Public Square, the bench, the Wasatch Plateau',
      'Overlay the 1880 plat’s blocks and lots',
    ],
    weight: '1.2 MB',
  },
  {
    slug: 'photo-chatgpt',
    plate: 'II',
    style: 'photographic',
    model: 'ChatGPT-6 Sol',
    title: 'An Evidence-Graded Landscape',
    description:
      'A soft, naturalistic rendering in which every labeled landmark is graded — documented from a record, or approximate. A reconstruction that shows its work.',
    highlights: [
      'Click a landmark to read its evidence and grade',
      'Switch between bird’s-eye, plan, and street-level views',
      'Watch wagons move along the roads',
    ],
    weight: '90 KB',
  },
  {
    slug: 'sim-claude',
    plate: 'III',
    style: 'simulation',
    model: 'Claude Opus 5.5',
    title: 'The Townsite in Full Color',
    description:
      'A bright, model-railroad version of the town: log cabins, plastered adobe, rock and brick houses color-keyed by material, with the settlers’ dugouts, the log bridge, and the courthouse lot picked out.',
    highlights: [
      'Toggle the 1880 plat block numbers',
      'Highlight the creek and irrigation ditches',
      'Set the camera to orbit the town',
    ],
    weight: '85 KB',
  },
  {
    slug: 'sim-chatgpt',
    plate: 'IV',
    style: 'simulation',
    model: 'ChatGPT-6 Sol',
    title: 'A Tabletop Town Model',
    description:
      'A diorama on a tilted board, with every original block numbered and field notes explaining what is documented and what is interpretive. Buildings from later decades are deliberately left out.',
    highlights: [
      'Turn, tilt, and zoom with the camera sliders',
      'Show 1917 Sanborn footprints as dashed “later clues”',
      'Click a building, street, or waterway to inspect it',
    ],
    weight: '26 KB',
  },
];

export const STYLE_LABEL: Record<ReconstructionStyle, string> = {
  photographic: 'Photographic',
  simulation: 'Simulation',
};

export const STYLE_BLURB: Record<ReconstructionStyle, string> = {
  photographic: 'Terrain, light, and vegetation rendered as a landscape painter might have seen them.',
  simulation: 'A legible, toy-like model built for reading the town plan at a glance.',
};

/** The source maps all four reconstructions were built from. */
export const SOURCE_MAPS = [
  { title: 'Castle Dale townsite plat', date: 'Surveyed 1880', note: 'M. F. Shelton — street grid, block and lot numbers' },
  { title: 'Sanborn fire insurance map', date: '1917', note: 'Building footprints and materials a generation later' },
  { title: 'USGS topographic map', date: 'ca. 1990', note: 'Terrain, the creek shelf, and the bench above town' },
  { title: 'Architectural reconnaissance survey', date: '1986–87', note: 'Surviving historic houses and their construction' },
];

export const getReconstruction = (slug: string) => RECONSTRUCTIONS.find((r) => r.slug === slug);
