/**
 * Chapter data and definitions
 * Status: 'final' | 'revised' | 'fact-checked' | 'draft' | 'stub'
 */

export interface Chapter {
  number: number;
  title: string;
  part: number;
  status: 'final' | 'revised' | 'fact-checked' | 'draft' | 'stub';
  description: string;
  wordCount: number;
}

export const CHAPTERS: Chapter[] = [
  // Part I: Foundations (1-7)
  {
    number: 1,
    title: 'Geography & Physiography',
    part: 1,
    status: 'draft',
    description: 'The physical landscape of Emery County: plateaus, canyons, rivers, and the defining topography of the region.',
    wordCount: 4200
  },
  {
    number: 2,
    title: 'Deep-Time Geology',
    part: 1,
    status: 'final',
    description: 'A billion-year journey through stone: Precambrian foundations, Paleozoic seas, Mesozoic dinosaurs, and recent tectonics.',
    wordCount: 4200
  },
  {
    number: 3,
    title: 'Hydrology & Springs',
    part: 1,
    status: 'final',
    description: 'Water in the desert: springs, seeps, rivers, and the hydrologic systems that sustain life in Emery County.',
    wordCount: 4774
  },
  {
    number: 4,
    title: 'Climate & Weather',
    part: 1,
    status: 'final',
    description: 'Climate as invisible architecture: precipitation, temperature, and weather patterns shaping life across Emery County\'s elevation gradient.',
    wordCount: 5206
  },
  {
    number: 5,
    title: 'Flora Zones',
    part: 1,
    status: 'draft',
    description: 'Plant communities from high-elevation forests to desert shrublands: ecology and species across elevational gradients.',
    wordCount: 3800
  },
  {
    number: 6,
    title: 'Fauna',
    part: 1,
    status: 'revised',
    description: 'Wildlife across the elevation gradient: mammals, birds, reptiles, fish, and invertebrates of Emery County\'s diverse habitats.',
    wordCount: 4777
  },
  {
    number: 7,
    title: 'Night Skies & Astronomy',
    part: 1,
    status: 'fact-checked',
    description: 'Dark skies and celestial wonders: constellations, milky way viewing, and the astronomical heritage of the high desert.',
    wordCount: 4300
  },

  // Part II: Peoples (8-15)
  {
    number: 8,
    title: 'Ancestral Puebloans & Fremont',
    part: 2,
    status: 'fact-checked',
    description: 'The first peoples: Fremont culture, Ancestral Puebloans, and the archaeological record of ancient settlement.',
    wordCount: 4200
  },
  {
    number: 9,
    title: 'Fremont Culture',
    part: 2,
    status: 'draft',
    description: 'The most visible ancient culture in Emery County: Fremont pit houses, pottery, irrigation, and the spectacular rock art panels of the San Rafael Swell.',
    wordCount: 4063
  },
  {
    number: 10,
    title: 'Numic Expansion',
    part: 2,
    status: 'draft',
    description: 'The Numic peoples — ancestors of the Ute, Southern Paiute, and Shoshone — and their arrival on the Colorado Plateau after the Fremont decline.',
    wordCount: 3561
  },
  {
    number: 11,
    title: 'Navajo & Puebloan Connections',
    part: 2,
    status: 'stub',
    description: 'Navajo trading networks and Puebloan cultural connections across the Colorado Plateau.',
    wordCount: 0
  },
  {
    number: 12,
    title: 'Trade Routes & Exchange',
    part: 2,
    status: 'stub',
    description: 'Pre-contact trade networks: goods, routes, and cultural exchange across the Southwest.',
    wordCount: 0
  },
  {
    number: 13,
    title: 'Contact & Collision',
    part: 2,
    status: 'stub',
    description: 'Spanish expeditions, first contact narratives, and the beginning of colonial disruption.',
    wordCount: 0
  },
  {
    number: 14,
    title: 'Tribal Nations Today',
    part: 2,
    status: 'stub',
    description: 'Contemporary Ute Mountain Ute, Ute Indian Tribe, and other tribal nations with historic and present ties to Emery County.',
    wordCount: 0
  },
  {
    number: 15,
    title: 'Indigenous Arts & Knowledge',
    part: 2,
    status: 'stub',
    description: 'Weaving, pottery, hunting practices, plant knowledge, and cultural expressions of Emery County tribes.',
    wordCount: 0
  },

  // Part III: Settlement (16-23)
  {
    number: 16,
    title: 'Mormon Colonization',
    part: 3,
    status: 'stub',
    description: 'LDS settlement of Emery County: pioneers, founding of towns, religious community formation, and settlement patterns.',
    wordCount: 0
  },
  {
    number: 17,
    title: 'Coal, Copper & Uranium',
    part: 3,
    status: 'stub',
    description: 'Mining boom: coal camps, miners, mining operations, and the economic transformation of the county.',
    wordCount: 0
  },
  {
    number: 18,
    title: 'Communities & Towns',
    part: 3,
    status: 'stub',
    description: 'Individual town histories: Castle Dale, Ferron, Huntington, Green River, Cleveland, and smaller settlements.',
    wordCount: 0
  },
  {
    number: 19,
    title: 'Agriculture & Land Use',
    part: 3,
    status: 'stub',
    description: 'Ranching, farming, livestock management, and the evolution of agricultural practice in an arid landscape.',
    wordCount: 0
  },
  {
    number: 20,
    title: 'Transportation & Infrastructure',
    part: 3,
    status: 'stub',
    description: 'Roads, railways, telegraph, utilities, and the infrastructure that connected Emery County to the broader region.',
    wordCount: 0
  },
  {
    number: 21,
    title: 'Ghost Towns & Abandonment',
    part: 3,
    status: 'stub',
    description: 'Ephemeral settlements: mining camps, railroad towns, and communities that faded as economic tides shifted.',
    wordCount: 0
  },
  {
    number: 22,
    title: 'Land & Ownership',
    part: 3,
    status: 'stub',
    description: 'Public lands, private property, Native American lands, and the legal frameworks governing land tenure.',
    wordCount: 0
  },
  {
    number: 23,
    title: 'Environment & Conservation',
    part: 3,
    status: 'stub',
    description: 'Landscape conservation, environmental challenges, resource management, and sustainability in Emery County.',
    wordCount: 0
  },

  // Part IV: Culture & Identity (24-35)
  {
    number: 24,
    title: 'Arts & Music',
    part: 4,
    status: 'stub',
    description: 'Visual arts, music traditions, theater, and creative expression in Emery County communities.',
    wordCount: 0
  },
  {
    number: 25,
    title: 'Food & Foodways',
    part: 4,
    status: 'stub',
    description: 'Traditional foods, cooking practices, cultural dishes, and the culinary heritage of Emery County.',
    wordCount: 0
  },
  {
    number: 26,
    title: 'Oral Histories & Stories',
    part: 4,
    status: 'stub',
    description: 'Personal narratives, folklore, family stories, and the oral traditions that preserve local memory.',
    wordCount: 0
  },
  {
    number: 27,
    title: 'Celebrations & Traditions',
    part: 4,
    status: 'stub',
    description: 'Festivals, holidays, parades, and annual events that celebrate Emery County heritage.',
    wordCount: 0
  },
  {
    number: 28,
    title: 'Notable People & Leaders',
    part: 4,
    status: 'stub',
    description: 'Influential figures: pioneers, civic leaders, artists, activists, and visionaries who shaped the county.',
    wordCount: 0
  },
  {
    number: 29,
    title: 'Genealogy & Family Lines',
    part: 4,
    status: 'stub',
    description: 'Pioneer families, kinship networks, and the genealogical threads connecting Emery County residents.',
    wordCount: 0
  },
  {
    number: 30,
    title: 'Education & Institutions',
    part: 4,
    status: 'stub',
    description: 'Schools, libraries, churches, civic organizations, and the institutions that build community.',
    wordCount: 0
  },
  {
    number: 31,
    title: 'Economy & Livelihoods',
    part: 4,
    status: 'stub',
    description: 'Modern economy: tourism, agriculture, small business, and the contemporary livelihoods of residents.',
    wordCount: 0
  },
  {
    number: 32,
    title: 'Recreation & Leisure',
    part: 4,
    status: 'stub',
    description: 'Outdoor recreation, hunting, fishing, boating, and the recreational culture of Emery County.',
    wordCount: 0
  },
  {
    number: 33,
    title: 'Media & Communications',
    part: 4,
    status: 'stub',
    description: 'Newspapers, radio, internet, and how Emery County residents stay connected and informed.',
    wordCount: 0
  },
  {
    number: 34,
    title: 'Sports & Athletics',
    part: 4,
    status: 'stub',
    description: 'High school sports, community leagues, and the athletic traditions of local schools.',
    wordCount: 0
  },
  {
    number: 35,
    title: 'Tourism & Visitor Experience',
    part: 4,
    status: 'stub',
    description: 'Visitor economy, lodging, dining, attractions, and the tourist experience in Emery County.',
    wordCount: 0
  },

  // Part V: Field Guide (36-40)
  {
    number: 36,
    title: 'Scenic Drives & Byways',
    part: 5,
    status: 'stub',
    description: 'Recommended driving routes: scenic loops, highway vistas, and roadside viewpoints.',
    wordCount: 0
  },
  {
    number: 37,
    title: 'Hiking & Trails',
    part: 5,
    status: 'stub',
    description: 'Trail guide: day hikes, backpacking routes, difficulty ratings, and route descriptions.',
    wordCount: 0
  },
  {
    number: 38,
    title: 'Photography Spots',
    part: 5,
    status: 'stub',
    description: 'Best locations for landscape and nature photography: light, season, and composition tips.',
    wordCount: 0
  },
  {
    number: 39,
    title: 'Hot Springs, Waterfalls & Scenic Sites',
    part: 5,
    status: 'stub',
    description: 'Guide to natural wonders: hot springs, waterfalls, geological formations, and special places.',
    wordCount: 0
  },
  {
    number: 40,
    title: 'Wildlife Viewing & Natural History Sites',
    part: 5,
    status: 'stub',
    description: 'Best places and seasons for wildlife observation: animals, birds, and natural habitats.',
    wordCount: 0
  },

  // Part VI: Resources (41-43)
  {
    number: 41,
    title: 'Further Reading',
    part: 6,
    status: 'draft',
    description: 'Curated bibliography and further reading for deeper exploration of Emery County topics.',
    wordCount: 1475
  },
  {
    number: 42,
    title: 'Glossary',
    part: 6,
    status: 'draft',
    description: 'Definitions of geological, cultural, historical, and technical terms used throughout the encyclopedia.',
    wordCount: 2183
  },
  {
    number: 43,
    title: 'Systematic Index',
    part: 6,
    status: 'draft',
    description: 'Comprehensive index enabling cross-reference navigation through topics, names, places, and concepts.',
    wordCount: 1280
  }
];

/**
 * Get a chapter by number
 */
export function getChapter(number: number): Chapter | undefined {
  return CHAPTERS.find((ch) => ch.number === number);
}

/**
 * Get all chapters for a given part
 */
export function getChaptersByPart(part: number): Chapter[] {
  return CHAPTERS.filter((ch) => ch.part === part);
}

/**
 * Get status summary for a part
 */
export function getPartStatusSummary(part: number) {
  const chaptersByPart = getChaptersByPart(part);
  const available = chaptersByPart.filter((ch) => ch.status !== 'stub').length;
  const inProgress = chaptersByPart.filter(
    (ch) => ch.status === 'draft' || ch.status === 'fact-checked' || ch.status === 'revised'
  ).length;
  const coming = chaptersByPart.filter((ch) => ch.status === 'stub').length;

  return { available, inProgress, coming };
}

/**
 * Get overall project status summary
 */
export function getProjectStatusSummary() {
  const available = CHAPTERS.filter((ch) => ch.status === 'final').length;
  const inProgress = CHAPTERS.filter(
    (ch) => ch.status === 'draft' || ch.status === 'fact-checked' || ch.status === 'revised'
  ).length;
  const coming = CHAPTERS.filter((ch) => ch.status === 'stub').length;

  return { available, inProgress, coming };
}

/**
 * Lowercase alias for backward compatibility
 */
export const chapters = CHAPTERS;

/**
 * Recent changelog entries
 */
export const changelog = [
  { date: '2026-04-09', chapter: 6, action: 'Fauna revised draft published to site (new content)' },
  { date: '2026-04-09', chapter: 4, action: 'Climate & Weather content updated (wc 4500→5206)' },
  { date: '2026-04-09', chapter: 3, action: 'Hydrology & Springs content updated (wc 4100→4774)' },
  { date: '2026-04-09', chapter: 10, action: 'Numic Expansion draft published to site' },
  { date: '2026-04-09', chapter: 9, action: 'Fremont Culture draft published to site' },
  { date: '2026-04-06', chapter: 8, action: 'Paleo-Indian & Archaic status updated to fact-checked' },
  { date: '2026-04-06', chapter: 7, action: 'Night Skies & Astronomy status updated to fact-checked' },
  { date: '2026-04-06', chapter: 6, action: 'Fauna status updated to final' },
  { date: '2026-04-01', chapter: 8, action: 'Paleo-Indian & Archaic draft published to site' },
  { date: '2026-04-01', chapter: 7, action: 'Night Skies & Astronomy draft published to site' },
  { date: '2026-04-01', chapter: 6, action: 'Fauna revised draft published to site' },
  { date: '2026-04-01', chapter: 4, action: 'Climate & Weather final published to site' },
  { date: '2026-04-01', chapter: 3, action: 'Hydrology & Springs final published to site' },
  { date: '2026-04-01', chapter: 2, action: 'Deep-Time Geology final published to site' },
  { date: '2026-03-28', chapter: 2, action: 'Chapter reached draft status' },
  { date: '2026-03-24', chapter: 5, action: 'Flora Zones draft completed' },
  { date: '2026-03-18', chapter: 1, action: 'Geography & Physiography fact-check begun' },
  { date: '2026-03-12', chapter: 4, action: 'Research phase initiated' },
  { date: '2026-03-05', chapter: 2, action: 'Deep-Time Geology outline finalized' },
];

/**
 * Get aggregate stats for the pipeline tracker
 */
export function getStats() {
  const finalCount = CHAPTERS.filter(c => c.status === 'final').length;
  const inProgressCount = CHAPTERS.filter(c => ['draft', 'revised', 'fact-checked'].includes(c.status)).length;
  const stubCount = CHAPTERS.filter(c => c.status === 'stub').length;
  const totalChapters = CHAPTERS.length;
  const totalWords = CHAPTERS.reduce((sum, c) => sum + c.wordCount, 0);
  return { finalCount, inProgressCount, stubCount, totalChapters, totalWords };
}
