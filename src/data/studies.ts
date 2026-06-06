/**
 * One Place Studies — place-centered article series.
 *
 * A One Place Study is an ongoing collection of standalone articles focused on a
 * single community, published to the encyclopedia as they are authored. Each
 * study groups articles from the `articles` collection whose `series` slug
 * matches the study's `slug`. Articles may *also* anchor to a chapter (via
 * `companionToChapter`); the two relationships are independent.
 *
 * First study: Castle Dale (the Castle Dale, Utah One Place Study).
 * To add another study, append an entry here and tag articles with its slug.
 */

export interface OnePlaceStudy {
  /** URL slug + the value articles set in their `series` frontmatter field. */
  slug: string;
  /** Full program title, e.g. "Castle Dale One Place Study". */
  title: string;
  /** The place this study documents, e.g. "Castle Dale, Utah". */
  place: string;
  /** Short label for nav/cards, e.g. "Castle Dale". */
  shortLabel: string;
  /** One-line summary for cards and listings. */
  tagline: string;
  /** Description for SEO / card body. */
  description: string;
  /** Longer hub-page introduction (plain prose; rendered as a paragraph). */
  intro: string;
  /** Accent color (hex). */
  color: string;
  /** Optional hero/banner image path under /public. */
  image?: string;
}

export const STUDIES: OnePlaceStudy[] = [
  {
    slug: 'castle-dale',
    title: 'Castle Dale One Place Study',
    place: 'Castle Dale, Utah',
    shortLabel: 'Castle Dale',
    tagline: 'A growing collection of articles documenting one Castle Valley town in depth.',
    description:
      'The Castle Dale One Place Study: an ongoing series of articles reconstructing the history of Castle Dale, Utah — household by household, year by year — from census records, land entries, and the families who built the town.',
    intro:
      "A One Place Study takes a single community and follows it closely over time — the people, the households, the records that survive. The Castle Dale One Place Study collects articles that reconstruct the town from its primary sources: federal census schedules, land and water records, church and county minutes, and the families who carried it from a one-year-old settlement of fifty houses into the seat of Emery County. New pieces are published here as they are written.",
    color: '#C85A54', // mesa-red — shared with the articles accent
  },
];

/** Get a single study by its slug. */
export function getStudy(slug: string): OnePlaceStudy | undefined {
  return STUDIES.find((s) => s.slug === slug);
}

/** Get all studies. */
export function getAllStudies(): OnePlaceStudy[] {
  return STUDIES;
}
