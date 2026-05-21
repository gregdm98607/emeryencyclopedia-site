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
  /**
   * Optional companion article. When set, the chapter card surfaces a
   * "Read the companion article" affordance even if the chapter itself
   * is still a stub. First use: Ch16 (Mormon Colonization) → Castle Dale 1880 vignette.
   */
  companionArticle?: {
    slug: string;
    label: string;
  };
}

export const CHAPTERS: Chapter[] = [
  // Part I: Foundations (1-7)
  {
    number: 1,
    title: 'Geography & Physiography',
    part: 1,
    status: 'draft',
    description: 'The physical landscape of Emery County: plateaus, canyons, rivers, and the defining topography of the region. Covers physiographic provinces, drainage basins, elevation gradient, structural geology, soils, karst, and aeolian landforms.',
    wordCount: 12847
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
    status: 'final',
    description: 'Dark skies and celestial wonders: constellations, milky way viewing, and the astronomical heritage of the high desert.',
    wordCount: 4798
  },

  // Part II: Peoples (8-15)
  {
    number: 8,
    title: 'Ancestral Puebloans & Fremont',
    part: 2,
    status: 'final',
    description: 'The first peoples: Fremont culture, Ancestral Puebloans, and the archaeological record of ancient settlement.',
    wordCount: 4390
  },
  {
    number: 9,
    title: 'Fremont Culture',
    part: 2,
    status: 'final',
    description: 'The most visible ancient culture in Emery County: Fremont pit houses, pottery, irrigation, and the spectacular rock art panels of the San Rafael Swell.',
    wordCount: 4511
  },
  {
    number: 10,
    title: 'Numic Expansion',
    part: 2,
    status: 'final',
    description: 'The Numic peoples — ancestors of the Ute, Southern Paiute, and Shoshone — and their arrival on the Colorado Plateau after the Fremont decline.',
    wordCount: 3976
  },
  {
    number: 11,
    title: 'Navajo & Puebloan Interactions',
    part: 2,
    status: 'final',
    description: 'Athabaskan migration, Pueblo Revolt diaspora, trade networks, pastoral revolution, and the deep cultural exchanges between Navajo, Puebloan, and Ute peoples across the Colorado Plateau.',
    wordCount: 4283
  },
  {
    number: 12,
    title: 'Rock Art & Sacred Landscapes',
    part: 2,
    status: 'final',
    description: 'Barrier Canyon Style, Fremont, and Ute rock art traditions across 400+ documented sites in Emery County — styles, chronology, preservation, and Indigenous stewardship of sacred landscapes.',
    wordCount: 4892
  },
  {
    number: 13,
    title: 'Archaeological Stewardship',
    part: 2,
    status: 'final',
    description: 'Legal frameworks, monitoring programs, site stewardship, curation practices, and ethical principles for protecting Emery County\u2019s archaeological resources on BLM, tribal, and private lands.',
    wordCount: 5071
  },
  {
    number: 14,
    title: 'Spanish Trails & Fur Trappers',
    part: 3,
    status: 'final',
    description: 'The era of exploration and trade preceding Euro-American settlement: ancient Ute commerce routes, the Old Spanish Trail, Mexican pack-train operators, and American mountain men in Emery County canyon country.',
    wordCount: 4339
  },
  {
    number: 15,
    title: 'Powell Expeditions',
    part: 3,
    status: 'final',
    description: 'John Wesley Powell\u2019s 1869 and 1871\u201372 voyages through Desolation Canyon and the Green River corridor: scientific mapping, photography, and the founding of the U.S. Geological Survey.',
    wordCount: 3788
  },

  // Part III: Settlement (16-23)
  {
    number: 16,
    title: 'Mormon Colonization',
    part: 3,
    status: 'final',
    description: 'LDS settlement of Emery County: the call to colonize Castle Valley, founding of pioneer towns, cooperative irrigation, and the transformation of a remote desert into an agricultural community.',
    wordCount: 3353,
    companionArticle: {
      slug: 'castle-dale-1880',
      label: 'Castle Dale, 1880 — read the vignette'
    }
  },
  {
    number: 17,
    title: 'Coal, Copper & Uranium',
    part: 3,
    status: 'final',
    description: 'The extractive century: coal seams of the Wasatch Plateau, uranium-rich sandstones of the San Rafael Swell, copper byproducts, company towns, the Wilberg and Crandall Canyon disasters, and the ongoing energy transition reshaping Emery County\u2019s economy.',
    wordCount: 4131
  },
  {
    number: 18,
    title: 'Rails, Roads & Infrastructure',
    part: 3,
    status: 'final',
    description: 'The transportation and utility networks that wove Emery County into the broader region: the Old Spanish Trail, the 1883 Denver & Rio Grande Western main line, federal highways, Interstate 70 through the San Rafael Swell, rural electric and telephone cooperatives, and the coal-to-electricity pipeline.',
    wordCount: 5026
  },
  {
    number: 19,
    title: 'Water for the Desert',
    part: 3,
    status: 'final',
    description: 'Water, the defining constraint of Emery County life: pioneer ditches and the 1890s salinization crisis, the federal Emery County Project (Joe\u2019s Valley, Huntington North, Millsite), the Colorado River Compact, the Emery Water Conservancy District, and the twenty-first-century megadrought.',
    wordCount: 4617
  },
  {
    number: 20,
    title: 'Agriculture & Ranching',
    part: 3,
    status: 'final',
    description: 'Pioneer canal-building and cooperative irrigation, the salinization crisis, the federal Emery County Project\'s dams and reservoirs, alfalfa and hay farming, Green River\'s celebrated melons, cattle and sheep ranching on public lands, and the water future facing Emery County agriculture.',
    wordCount: 5086
  },
  {
    number: 21,
    title: 'Energy Transition',
    part: 3,
    status: 'final',
    description: 'From coal peak to post-carbon crossroads: mine closures, shifting retirement timelines for Hunter and Huntington power plants, the billion-dollar Green River Energy Center, workforce retraining gaps, property tax pressures, and Emery County\'s uncertain but emerging new economic identity.',
    wordCount: 4591
  },
  {
    number: 22,
    title: 'Demography & Social Change',
    part: 3,
    status: 'final',
    description: 'From pioneer founding cohort to post-coal crossroads: population boom and bust, LDS social architecture, an aging and shrinking workforce, school enrollment cliff, healthcare access gaps, and the resilience of a community navigating energy transition and demographic change.',
    wordCount: 5415
  },
  {
    number: 23,
    title: 'County Governance',
    part: 4,
    status: 'final',
    description: 'From territorial formation in 1880 through the Dingell Act of 2019: the Board of County Commissioners, elected offices, federal land management conflicts, the fiscal impact of coal decline, and the political culture of one of Utah\'s most reliably conservative rural counties.',
    wordCount: 5100
  },

  // Part IV: Culture & Identity (24-35)
  {
    number: 24,
    title: 'Education & Learning',
    part: 4,
    status: 'final',
    description: 'From dugout-classroom pioneer schoolhouses through the Emery Stake Academy (1889-1922), the three-high-school era, and the 1962 consolidation into the Emery High Spartans, to today\'s Emery County School District (ten schools, ~2,248 students), USU Eastern\'s Castle Dale education center, and the post-coal CTE pipeline confronting workforce transition - a 145-year arc of education in Castle Valley.',
    wordCount: 3866
  },
  {
    number: 25,
    title: 'Religious Life',
    part: 4,
    status: 'final',
    description: 'A 145-year religious history of Emery County: Indigenous spiritual landscapes that predate settlement, the 1882 LDS Emery Stake and 1982 Castle Dale/Ferron division, the Presbyterian mission school in Ferron (1906-1950s), Greek Orthodox spillover from the Carbon County coalfields after the 1924 Castle Gate disaster, two enduring small Catholic congregations, released-time seminary and Relief Society networks, and a 21st-century pluralization in which roughly one in three residents now claims no religious affiliation.',
    wordCount: 5930
  },
  {
    number: 26,
    title: 'Arts, Literature & Media',
    part: 4,
    status: 'final',
    description: 'Emery County\'s cultural footprint runs unusually deep for a county of fewer than 10,000 residents: pioneer brass bands and Welsh choral traditions; coal-camp music carried in by Greek, Italian, and Slavic miners; a 118-year-old county newspaper; the Emery Telcom/ETV broadcasting cooperative; the Castle Valley Pageant performed every other summer for nearly half a century; a four-museum circuit; folk-craft guilds; and a San Rafael Swell that has doubled as a Hollywood backdrop.',
    wordCount: 4958
  },
  {
    number: 27,
    title: 'Festivals, Folklore & Foodways',
    part: 4,
    status: 'final',
    description: 'Emery County\'s participatory culture - the festivals, foodways, and folk arts that knit a population of fewer than 10,000 across 7,000 square miles. The county calendar from the Pioneer Day rodeo cluster (Castle Dale\'s RMPRA-sanctioned Cowboys Memorial Rodeo, Huntington Heritage Days, Emery, Orangeville) through Ferron Peach Days (1906) and Green River Melon Days (1906), the Emery County Fair, and the Castle Valley Pageant (since 1978); layered foodways of pioneer Mormon dryfarming, coal-camp Welsh-Cornish-Greek-Italian-Slavic kitchens, and modern ranching tables; cowboy-poetry, fiddling, choral, quilting, and storytelling traditions.',
    wordCount: 5297
  },
  {
    number: 28,
    title: 'Notable People & Oral Histories',
    part: 4,
    status: 'final',
    description: 'A representative gallery of Emery County\'s people from 1877 to the present: Indigenous voices, founding pioneers (Orange Seely + the 1880 Emery Stake, Hyrum Seely, Henry U. Burr, Rasmus Johnson), the four Swasey brothers (1875), Butch Cassidy at Castle Gate (1897-04-21), Sid\'s Mountain WSA, Ned Chaffin, the 1984 Wilberg / 2007 Crandall Canyon memorial archive (Karen Jobe Templeton bronzes; Markosek-Ardohain 2016 monument), county commissioners and sheriffs, educators and midwives, religious leaders (LDS, Presbyterian Ferron mission 1906-1950s, Catholic, Greek Orthodox), writers and artists (Stella McElprang 1949, Edward A. Geary 1985-1996, Edwin Montell Seely 1934-2008), Emery County Progress editors from H.T. Haines (1900) forward, and the five-door oral-history apparatus (Emery County Archives, BYU L. Tom Perry, USU Fife, UHS Oral History Program, FamilySearch). Tribal review flag carried from vault.',
    wordCount: 4244
  },
  {
    number: 29,
    title: 'Health, Safety & Emergency',
    part: 4,
    status: 'final',
    description: 'From frontier midwives and the 1918 influenza pandemic through Castleview Hospital (1980, Level IV Trauma 2023) and Emery Medical Center in Castle Dale, to Four Corners Community Behavioral Health (the first rural-Utah Opioid Treatment Program clinic), the Carbon-Emery overdose-mortality crisis (47.7/100k 2014-2016, 2.5x state rate) and the rebuilding treatment scaffold. Covers the Sheriff\'s Office and county jail, Emery County Search and Rescue (~50 missions/yr, San Rafael Swell coverage), the volunteer fire districts and ambulance services, and emergency management for floods, wildfires, hazmat, and earthquake. The institutions that close the distance in a 4,500-square-mile county where the nearest hospital has always been across the line in Carbon.',
    wordCount: 4761
  },
  {
    number: 30,
    title: 'Landscapes of Adventure',
    part: 5,
    status: 'final',
    description: "A practical field guide to Emery County's adventure landscape: San Rafael Swell slot canyons and OHV routes, Goblin Valley State Park, Joe's Valley world-class bouldering, multi-day Green River trips through Labyrinth and Desolation Canyons, Wasatch Plateau fishing, and the safety essentials for one of the most remote corners of the American West.",
    wordCount: 5891
  },
  {
    number: 31,
    title: 'Parks & Monuments',
    part: 5,
    status: 'final',
    description: 'From Goblin Valley State Park to Jurassic National Monument: Emery County\'s four state parks, a BLM national monument, and the 217,000-acre San Rafael Swell Recreation Area — each site\'s origin story, managing agencies, and what it offers visitors in one of the most protected public-land landscapes in the American West.',
    wordCount: 7086
  },
  {
    number: 32,
    title: "Trails & Routes",
    part: 5,
    status: 'final',
    description: "The complete trail grammar of Emery County: Buckhorn Wash Scenic Backway, Little Wild Horse and Bell Canyon slot-canyon loop, Black Box technical canyoneering, Muddy Creek wilderness backpacking, Joe's Valley mountain biking, the 600-mile Arapeen OHV system, Labyrinth Canyon river float, and the Old Spanish Trail historical corridor.",
    wordCount: 5471
  },
  {
    number: 33,
    title: 'Climbing, Canyoneering & Rivers',
    part: 5,
    status: 'final',
    description: "Emery County's technical outdoor recreation: Joe's Valley world-class bouldering (V0-V13+, mid-1990s development, Ben Moon's Black Lung), the San Rafael Swell's hidden canyons, Upper and Lower Black Box technical canyoneering, Muddy Creek and The Chute, Little Wild Horse and Bell Canyon family slots, the spring San Rafael River float through the Little Grand Canyon, and the Green River corridor staging Labyrinth Canyon (free permit) and Desolation Canyon (lottery permit) river trips - with flash flood safety, BLM permit guidance, seasonal calendar, and skill-level matrix.",
    wordCount: 5841
  },
  {
    number: 34,
    title: 'Wildlife Watching',
    part: 5,
    status: 'revised',
    description: "A field guide to wildlife observation across Emery County's three habitat zones - the Wasatch Plateau high country, the San Rafael Swell desert uplift, and the Green River riparian corridor - covering bighorn sheep, mule deer, elk, pronghorn, raptors, songbirds, reptiles, native and introduced fish, the seasonal viewing calendar, and ethical wildlife-watching practice in a county with Utah's largest desert bighorn herd.",
    wordCount: 5187
  },
  {
    number: 35,
    title: 'Night Sky Tourism',
    part: 5,
    status: 'draft',
    description: "Dark skies as Emery County's emerging tourism resource: Goblin Valley State Park's 2018 International Dark Sky designation, Bortle Class 1-2 skies across the San Rafael Swell, the Astronomers Without Borders observing programs, ranger-led star parties, the Mars Desert Research Station near Hanksville, and the practical field-guide essentials - seasonal viewing windows, equipment, photography techniques, and the public-lands etiquette that keeps the county's night sky among the darkest in the lower 48.",
    wordCount: 3874
  },

  // Part V: Field Guide (36) / Part VI: Research Tools (37-40)
  {
    number: 36,
    title: 'Travel & Logistics',
    part: 5,
    status: 'draft',
    description: "The practical infrastructure of visiting Emery County: I-70's longest service-station gap in the lower 48 (the 'fill up every time' rule), the gateway communities of Green River, Price, Castle Dale, Ferron, and Hanksville, lodging and camping by community and BLM dispersed area, fuel and food and water planning, the spotty cellular coverage that makes a satellite communicator close to mandatory, visitor centers and ranger stations, BLM and state-park permits and fees, the four-season climate split between the Wasatch Plateau and the Swell, EMSAR contact protocols, the Ten Essentials adapted for desert canyon country, and a sustainable-visitation framework.",
    wordCount: 5792
  },
  {
    number: 37,
    title: 'Archives, Museums & Libraries',
    part: 6,
    status: 'fact-checked',
    description: 'The working back-of-the-book for Emery County research: the County Archives in Castle Dale, the Museum of the San Rafael, the Pioneer Museum, the eight-branch library system, the Utah State Archives, the fully digitized Emery County Progress run, three university repositories at USU and BYU, and the practical research workflow that ties them all together.',
    wordCount: 4251
  },
  {
    number: 38,
    title: 'Historic Registries',
    part: 6,
    status: 'fact-checked',
    description: 'Emery County\'s 22 National Register of Historic Places listings, one National Historic Landmark (Cleveland-Lloyd Dinosaur Quarry), the parallel National Natural Landmark designation, the Old Spanish National Historic Trail, Jurassic National Monument (2019), and the procedural mechanics of how to nominate a property and what designation actually protects.',
    wordCount: 3935
  },
  {
    number: 39,
    title: 'Mapping & GIS',
    part: 6,
    status: 'fact-checked',
    description: 'Maps and digital tools for a county where four out of five acres are federal: USGS topographic quads (historic and current), statewide UGRC GIS portals, Emery County GIS parcel data, BLM Travel Management Plan maps, the 2024 statewide sub-meter lidar coverage, the Utah Geological Survey map series, and the field apps (CalTopo, Gaia GPS, onX) that put it all in a researcher\'s pocket.',
    wordCount: 4861
  },
  {
    number: 40,
    title: 'Citizen Science',
    part: 6,
    status: 'stub',
    description: 'Community-driven science in Emery County: bird counts, sky-quality monitoring, paleontology volunteer programs, rock-art site stewardship, and the citizen-naturalist projects that extend professional research into the public.',
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
  { date: '2026-05-20', chapter: 39, action: 'Mapping & GIS published to site (4861 words; first publication; replaces prior Ch39 stub Hot Springs, Waterfalls & Scenic Sites; Part VI Research Tools; status: fact-checked; 8 sections covering USGS topographic quads historic and current (~30 7.5-minute quads to cover the county; HTMC scanned archive 1884-2006; US Topo since 2009), Utah Geospatial Resource Center (UGRC) statewide layers, Emery County GIS office parcel data, BLM Travel Management Plan interactive web maps, Utah Geological Survey 30x60 San Rafael Desert map and 1968 USGS Bulletin 1239, 2024 statewide aerial lidar coverage at sub-meter resolution, field apps (CalTopo, Gaia GPS, onX), and cross-references to Ch01 Geography, Ch02 Geology, Ch17 Mining, Ch36 Travel & Logistics. Triggered by eec-site-publisher detecting vault status fact-checked + missing site content for Ch39 (vault Ch39_Mapping_GIS fact-checked 2026-05-20).' },
  { date: '2026-05-20', chapter: 38, action: 'Historic Registries published to site (3935 words; first publication; replaces prior Ch38 stub Photography Spots; Part VI Research Tools; status: fact-checked; covers 22 National Register of Historic Places listings (six address-restricted rock-art sites including Black Dragon Canyon, Buckhorn Wash, Ferron Box, Rochester-Muddy Creek, Temple Mountain Wash; Cleveland-Lloyd Dinosaur Quarry as the single National Historic Landmark), the parallel National Natural Landmark designation at Cleveland-Lloyd, the Old Spanish National Historic Trail, Jurassic National Monument proclaimed 2019, NHPA Section 106 review mechanics, federal/state/local registry interactions, the Utah SHPO and Emery County Historic Preservation Commission, and the practical nomination workflow. Triggered by eec-site-publisher detecting vault status fact-checked + missing site content for Ch38 (vault Ch38_Historic_Registries fact-checked 2026-05-20).' },
  { date: '2026-05-20', chapter: 37, action: 'Archives, Museums & Libraries published to site (4251 words; first publication; replaces prior Ch37 stub Hiking & Trails; Part VI Research Tools; status: fact-checked; tour-format coverage of the Emery County Archives in Castle Dale (donated collections, oral histories, blog at emerycountyarchives.blogspot.com), the Museum of the San Rafael, the Pioneer Museum, the eight-branch Emery County Library system, the Utah State Archives & Records Service in Salt Lake City, the fully digitized Emery County Progress newspaper run, three university repositories (USU Special Collections, USU Eastern Prehistoric Museum, BYU L. Tom Perry Special Collections), and a step-by-step research workflow. Triggered by eec-site-publisher detecting vault status fact-checked + missing site content for Ch37 (vault Ch37_Archives_Museums_Libraries fact-checked 2026-05-20).' },
  { date: '2026-05-18', chapter: 36, action: 'Travel & Logistics published to site (~5792 words; first publication; replaces prior Ch36 stub Scenic Drives & Byways / Part 5; Part V Field Guide; 12 sections covering I-70 service-gap framing as longest in lower-48 USA, highway access (I-70 + SR-10/SR-29/SR-31/SR-24/SR-155 + backcountry roads), gateway communities (Green River, Price, Castle Dale, Ferron, Hanksville + secondary bases), lodging inventory by community, camping spectrum (state parks, BLM developed, BLM dispersed, USFS), fuel/food/water with "fill up every time" rule, cellular coverage gaps + satellite-communicator imperative, visitor centers and ranger stations (Travel Bureau, Powell, Goblin Valley, USU Eastern), permits and fees (Desolation lottery, Labyrinth recreation.gov, Goblin Valley, Cleveland-Lloyd), safety framework (EMSAR contact + Ten Essentials + Castleview Hospital transfer), four-season Wasatch Plateau / Swell climate split, outfitters and accessibility partial-access guide, five Emery-specific leave-no-trace rules; chapter status: draft)' },
  { date: '2026-05-18', chapter: 35, action: 'Night Sky Tourism published to site (~3874 words; first publication; replaces prior Ch35 stub Tourism & Visitor Experience / Part 4; Part V Field Guide; covers Goblin Valley State Park 2018 International Dark Sky designation, Bortle Class 1-2 skies across San Rafael Swell, Astronomers Without Borders observing programs, ranger-led star parties, Mars Desert Research Station near Hanksville as analog Mars-mission training facility, seasonal viewing windows including spring Milky Way galactic core and winter Orion/Pleiades, equipment guidance (naked eye, binoculars 10x50, dobsonian telescopes, astrophotography rigs), light-pollution preservation framework, and the public-lands etiquette - red flashlight only, no white-light campfires within viewing radius, leave-no-trace astronomy practice; chapter status: draft)' },
  { date: '2026-05-18', chapter: 34, action: 'Wildlife Watching published to site (~5187 words; first publication; replaces prior Ch34 stub Sports & Athletics / Part 4; Part V Field Guide; 12 sections covering three-habitat framing (Wasatch Plateau, San Rafael Swell, Green River corridor), big-game mammals (Utah largest desert bighorn herd, mule deer migration, elk rut bugling at Joe Valley Reservoir, pronghorn 55-mph runners along SR-10), small mammals and reptiles, raptors (golden eagle, bald eagle, peregrine falcon recovery, prairie falcon), songbirds and migrants, native fish (Bonneville cutthroat, Colorado pikeminnow, razorback sucker, humpback chub, three native chubs), Joe Valley Reservoir Blue Ribbon fishery, seasonal viewing calendar by month, ethical wildlife-watching practice (200-yard rule, no calling/baiting, leash dogs, leave no trace), key viewing locations (Wedge Overlook, Buckhorn Wash, Green River wetlands, Joe Valley), and the desert-bighorn population recovery success story from 1970s reintroduction; chapter status: revised; vault status revised since 2026-05-15)' },
  { date: '2026-05-18', chapter: 33, action: 'Climbing, Canyoneering & Rivers advanced to final (vault status final per eec-chapter-pipeline; site ch33.md status + wordCount synced 5100 -> 5841; existing assets retained per status-only-update rule; body content carried over from prior publication; +741 word content expansion noted for future body refresh)' },
  { date: '2026-05-18', chapter: 32, action: 'Trails & Routes advanced to final (vault status final per eec-chapter-pipeline; site ch32.md status + wordCount synced 5469 -> 5471; existing assets retained per status-only-update rule)' },
  { date: '2026-05-18', chapter: 31, action: 'Parks & Monuments advanced to final (vault status final per eec-chapter-pipeline; site ch31.md status + wordCount synced 7084 -> 7086; existing assets retained per status-only-update rule)' },
  { date: '2026-05-18', chapter: 30, action: 'Landscapes of Adventure advanced to final (vault status final per eec-chapter-pipeline; site ch30.md status + wordCount synced 5889 -> 5891; existing assets retained per status-only-update rule)' },
  { date: '2026-05-14', chapter: 33, action: 'Climbing, Canyoneering & Rivers published to site (~5100 words; first publication; replaces prior Ch33 stub Media & Communications / Part 4; Part V Field Guide; 12 sections covering Joes Valley bouldering destination (mid-1990s development, Boone Speed + Jason Kehl, Ben Moon Black Lung V13 2000, three zones New Joes/Left Fork/Right Fork, BLM 15/night campgrounds), San Rafael Swell hidden canyons (BLM Price/Green River District, 2019 SRSRA designation), Upper Black Box technical canyoneering (~4.1 mi, 5-7 hr, wetsuit + rappel + cold pools, BLM 2.5 ft depth + 50 cfs go/no-go thresholds, lethal flash flood history), Lower Black Box non-technical but lethal, Muddy Creek The Chute 2BIV (15 mi, 8-14 hr, mud + Hidden Splendor airstrip uranium-era relic), Little Wild Horse + Bell Canyon family loop (~8 mi Entrada Sandstone narrows, no high-clearance required), Ding/Dang Canyons additional slots, spring San Rafael River float (Fuller Bottom to Buckhorn Wash Bridge 17 mi Class I-II, 100-700 cfs window, USGS gauge dependency, Upper Black Box transition warning), Green River town as river-running hub (pop. 900, state park boat ramp, I-70 access), Gray Canyon Class II-III + Swaseys Rapid, Labyrinth Canyon 68-mi flatwater free BLM permit Mineral Bottom take-out, Desolation Canyon 84-mi Class III lottery permit 35000 user-days/yr 1979 RMP, flash flood safety framework + EMSAR satellite-communicator guidance, permits/access/LNT table, seasonal calendar + skill-level matrix, Price + Green River BLM contacts; chapter status: draft)' },
  { date: '2026-05-14', chapter: 32, action: 'Trails & Routes advanced to revised (vault status revised per eec-chapter-pipeline; site ch32.md status + wordCount synced 4300 -> 5469; existing assets retained per status-only-update rule)' },
  { date: '2026-05-14', chapter: 31, action: 'Parks & Monuments advanced to revised (vault status revised per eec-chapter-pipeline; site ch31.md status + wordCount synced 4200 -> 7084; existing assets retained per status-only-update rule)' },
  { date: '2026-05-14', chapter: 30, action: 'Landscapes of Adventure advanced to revised (vault status revised per eec-chapter-pipeline; site ch30.md status + wordCount synced 3800 -> 5889; existing assets retained per status-only-update rule)' },
  { date: '2026-05-14', chapter: 29, action: 'Health, Safety & Emergency advanced to final (vault status final per eec-chapter-pipeline; site ch29.md status + wordCount synced 4096 -> 4761; existing assets retained per status-only-update rule)' },
  { date: '2026-05-14', chapter: 28, action: 'Notable People & Oral Histories advanced to final (vault status final per eec-chapter-pipeline; site ch28.md status + wordCount synced 4470 -> 4244; existing assets retained per status-only-update rule)' },
  { date: '2026-05-14', chapter: 27, action: 'Festivals, Folklore & Foodways advanced to final (vault status final per eec-chapter-pipeline; site ch27.md status + wordCount synced 5264 -> 5297; existing assets retained per status-only-update rule)' },
  { date: '2026-05-14', chapter: 26, action: 'Arts, Literature & Media advanced to final (vault status final per eec-chapter-pipeline; site ch26.md status + wordCount synced 4320 -> 4958; existing assets retained per status-only-update rule)' },
  { date: '2026-05-14', chapter: 25, action: 'Religious Life advanced to final (vault status final per eec-chapter-pipeline; site ch25.md status + wordCount synced 5156 -> 5930; existing assets retained per status-only-update rule)' },
  { date: '2026-05-14', chapter: 24, action: 'Education & Learning advanced to final (vault status final per eec-chapter-pipeline; site ch24.md status + wordCount synced 4400 -> 3866; existing assets retained per status-only-update rule)' },
  { date: '2026-05-14', chapter: 23, action: 'County Governance advanced to final (vault status final per eec-chapter-pipeline; site ch23.md status + wordCount synced 4233 -> 5100; existing assets retained per status-only-update rule)' },
  { date: '2026-05-14', chapter: 22, action: 'Demography & Social Change advanced to final (vault status final per eec-chapter-pipeline; site ch22.md status + wordCount synced 4544 -> 5415; existing assets retained per status-only-update rule)' },
  { date: '2026-05-14', chapter: 21, action: 'Energy Transition advanced to final (vault status final per eec-chapter-pipeline; site ch21.md status + wordCount synced 3718 -> 4591; existing assets retained per status-only-update rule)' },
  { date: '2026-05-14', chapter: 20, action: 'Agriculture & Ranching advanced to final (vault status final per eec-chapter-pipeline; site ch20.md status + wordCount synced 4359 -> 5086; existing assets retained per status-only-update rule)' },
  { date: '2026-05-14', chapter: 19, action: 'Water for the Desert advanced to final (vault status final per eec-chapter-pipeline; site ch19.md status + wordCount synced 4500 -> 4617; existing assets retained per status-only-update rule)' },
  { date: '2026-05-14', chapter: 18, action: 'Rails, Roads & Infrastructure advanced to final (vault status final per eec-chapter-pipeline; site ch18.md status + wordCount synced 4505 -> 5026; existing assets retained per status-only-update rule)' },
  { date: '2026-05-12', chapter: 32, action: 'Trails & Routes published to site (~4300 words; first publication; replaces Recreation & Leisure stub; Part V Field Guide; 12 sections covering Old Spanish Trail Heritage Loop at Elmo + Swasey brothers ranching legacy (Swazey Cabin 1921), Buckhorn Wash Scenic Backway (32-mile graded gravel, Wedge Overlook 1200-ft canyon, CCC Swinging Bridge 1937, Buckhorn Pictograph Panel 2000-yr Barrier Canyon style, 1996 community restoration), Little Wild Horse/Bell Canyon loop (8 mi, 787 ft gain, AllTrails 4.8 stars, flash-flood hazard), Crack/Chute Canyon loop (7 mi, Wingate/Kayenta narrows), Muddy Creek wilderness backpacking (The Chute deepest Swell canyon, 20-mi RT, 7 WSAs), Black Box Canyon technical canyoneering (Upper cold-pool stemming, Lower wading/swimming), Joe\'s Valley mountain biking (Josephite Point 6.8 mi, Miners Basin 3717 ft gain, Arapeen non-motorized segments), Arapeen OHV 600+ miles / Emery 70-mi flagship loop 6200-10000 ft / BLM 2024 TMP December designation, Labyrinth Canyon float (68-mi Green River State Park to Mineral Bottom, Bowknot Bend, free BLM permit), Desolation/Gray Canyon (86-mi whitewater, lottery permit, Swasey Beach take-out in Emery County), San Rafael Swell Discovery Route 4WD grand tour, trail ethics/flash flood/LNT/rock-art, seasonal permits maps; chapter status: draft)' },
  { date: '2026-05-12', chapter: 29, action: 'Health, Safety & Emergency advanced to revised (vault status revised per eec-chapter-pipeline Ph7+Ph8 run 2026-05-09; site ch29.md status + lastUpdated synced; assets retained)' },
  { date: '2026-05-12', chapter: 28, action: 'Notable People & Oral Histories advanced to revised (vault status revised per eec-chapter-pipeline Ph7+Ph8 run 2026-05-09; site ch28.md status + lastUpdated synced; assets retained)' },
  { date: '2026-05-12', chapter: 27, action: 'Festivals, Folklore & Foodways advanced to revised (vault status revised per eec-chapter-pipeline Ph7+Ph8 run 2026-05-09; site ch27.md status + lastUpdated synced; assets retained)' },
  { date: '2026-05-12', chapter: 26, action: 'Arts, Literature & Media advanced to revised (vault status revised per eec-chapter-pipeline Ph7+Ph8 run 2026-05-09; site ch26.md status + lastUpdated synced; assets retained)' },
  { date: '2026-05-12', chapter: 25, action: 'Religious Life advanced to revised (vault status revised per eec-chapter-pipeline Ph7+Ph8 run 2026-05-09; site ch25.md status + lastUpdated synced; assets retained)' },
  { date: '2026-05-12', chapter: 24, action: 'Education & Learning advanced to revised (vault status revised per eec-chapter-pipeline Ph7+Ph8 run 2026-05-09; site ch24.md status + lastUpdated synced; assets retained)' },
  { date: '2026-05-12', chapter: 23, action: 'County Governance advanced to revised (vault status revised per eec-chapter-pipeline Ph7+Ph8 run 2026-05-09; site ch23.md status + lastUpdated synced; assets retained)' },
  { date: '2026-05-12', chapter: 22, action: 'Demography & Social Change advanced to revised (vault status revised per eec-chapter-pipeline Ph7+Ph8 run 2026-05-09; site ch22.md status + lastUpdated synced; assets retained)' },
  { date: '2026-05-12', chapter: 21, action: 'Energy Transition advanced to revised (vault status revised per eec-chapter-pipeline Ph7+Ph8 run 2026-05-09; site ch21.md status + lastUpdated synced; assets retained)' },

  { date: '2026-05-11', chapter: 31, action: 'Parks & Monuments published to site (~4200 words; first publication; Part V Field Guide; 12 sections covering Goblin Valley State Park origin (Arthur Chaffin 1928, Philip Tompkins 1949 naming, 1964 state park, 2019 Dingell Act expansion, 2022 land transfer tripling park to ~21,000 acres, 500,000+ visitors/yr), Jurassic National Monument (Cleveland-Lloyd Quarry, 12,000+ fossils, 74 animals, Allosaurus-surplus predator puzzle, 1965 NNL designation, 1968 first BLM visitor center ever, 2019 Dingell Act NM designation, 2024 building replacement), San Rafael Swell Recreation Area (~217,000 acres, Dingell Act 2019, 2024 Travel Management Plan Draft EA), Huntington State Park (1966, Huntington brothers 1855 Elk Mountain Mission), Millsite State Park (Ferron Canyon, 6000 ft elevation, 9-hole golf, 1970 reservoir), Green River State Park (Labyrinth Canyon launch, 9-hole golf, cottonwood campground), Wedge Overlook/Little Grand Canyon (1200-ft canyon drop, Triassic-Jurassic stratigraphy, Butch Cassidy outlaw corridor), Buckhorn Wash Pictograph Panel (Barrier Canyon style, NRHP-listed, 1996 community restoration, 2022 BLM info center expansion), Temple Mountain uranium legacy (vanadium/uranium 1910s-1980s, Morrison Formation carnotite, Legacy Reclamation Program), federal-state-county management framework, and future designations (Head of Sinbad, TMP finalization, visitation pressure). Also fixes chapters.ts build failure: escaped Joe\'s Valley apostrophes x2 in Ch30 changelog entry.' },
  { date: '2026-05-10', chapter: 20, action: 'Agriculture & Ranching advanced to revised (vault revised: 2026-05-09 per eec-chapter-pipeline Ph7+Ph8 run; site ch20.md status + lastUpdated synced; existing assets retained per status-only-update rule)' },
  { date: '2026-05-10', chapter: 19, action: 'Water for the Desert advanced to revised (vault revised: 2026-05-09 per eec-chapter-pipeline Ph7+Ph8 run; site ch19.md status + lastUpdated synced; existing assets retained per status-only-update rule)' },
  { date: '2026-05-10', chapter: 18, action: 'Rails, Roads & Infrastructure advanced to revised (vault revised: 2026-05-09 per eec-chapter-pipeline Ph7+Ph8 run; site ch18.md status + lastUpdated synced; existing assets retained per status-only-update rule)' },
    { date: '2026-05-09', chapter: 30, action: 'Landscapes of Adventure published to site (~3800 words; first publication; Part V Field Guide; covers San Rafael Swell geology and access, Wedge Overlook, Buckhorn Wash pictograph panel and swinging bridge, Little Wild Horse/Bell Canyon slot canyon loop, Goblin Valley State Park (Dark Sky Park, Galaxy Quest film site), Joe\'s Valley bouldering (15,000 climbers/yr, 1,100+ problems), BLM 2026 TMP 1,500 miles OHV routes, Arapeen OHV 350+ miles, Labyrinth Canyon 68 river miles, Desolation/Gray 84 river miles, Joe\'s Valley Reservoir Blue Ribbon fishery, seasonal guide, field-guide summary table; chapter status: draft)' },
  { date: '2026-05-08', chapter: 29, action: 'Health, Safety & Emergency advanced to fact-checked (vault status fact-checked since 2026-05-06 batch; site ch29.md and chapters.ts status fields synced; existing assets retained per status-only-update rule)' },
  { date: '2026-05-08', chapter: 28, action: 'Notable People & Oral Histories advanced to fact-checked (vault status fact-checked since 2026-05-06 batch; site ch28.md and chapters.ts status fields synced; existing assets retained per status-only-update rule)' },
  { date: '2026-05-08', chapter: 27, action: 'Festivals, Folklore & Foodways advanced to fact-checked (vault status fact-checked since 2026-05-06 batch; site ch27.md and chapters.ts status fields synced; existing assets retained per status-only-update rule)' },
  { date: '2026-05-08', chapter: 26, action: 'Arts, Literature & Media advanced to fact-checked (vault status fact-checked since 2026-05-06 batch; site ch26.md and chapters.ts status fields synced; existing assets retained per status-only-update rule)' },
  { date: '2026-05-08', chapter: 25, action: 'Religious Life advanced to fact-checked (vault status fact-checked since 2026-05-06 batch; site ch25.md and chapters.ts status fields synced; existing assets retained per status-only-update rule)' },
  { date: '2026-05-08', chapter: 24, action: 'Education & Learning advanced to fact-checked (vault status fact-checked since 2026-05-06 batch; site ch24.md and chapters.ts status fields synced; existing assets retained per status-only-update rule)' },
  { date: '2026-05-07', chapter: 23, action: 'County Governance advanced to fact-checked (vault status fact-checked since Greg\'s 2026-05-06 batch approval of Ch18-Ch29; site .md and chapters.ts status fields synced; wordCount refreshed from vault body 4374 -> 4233; existing assets retained per status-only-update rule)' },
  { date: '2026-05-07', chapter: 22, action: 'Demography & Social Change advanced to fact-checked (vault status fact-checked since Greg\'s 2026-05-06 batch approval of Ch18-Ch29; site .md and chapters.ts status fields synced; wordCount refreshed from vault body 4683 -> 4544; existing assets retained per status-only-update rule)' },
  { date: '2026-05-07', chapter: 21, action: 'Energy Transition advanced to fact-checked (vault status fact-checked since Greg\'s 2026-05-06 batch approval of Ch18-Ch29; site .md and chapters.ts status fields synced; wordCount refreshed from vault body 3979 -> 3718; existing assets retained per status-only-update rule)' },
  { date: '2026-05-06', chapter: 20, action: 'Agriculture & Ranching advanced to fact-checked (vault status fact-checked since Greg\'s 2026-05-06 batch approval of Ch18-Ch29; site .md and chapters.ts status fields synced; existing assets retained per status-only-update rule)' },
  { date: '2026-05-06', chapter: 19, action: 'Water for the Desert advanced to fact-checked (vault status fact-checked since Greg\'s 2026-05-06 batch approval of Ch18-Ch29; site .md and chapters.ts status fields synced; assets generated this run - one open-source USGS reservoir/streamflow reference + one AI-generated illustration in Desert Scholarly palette)' },
  { date: '2026-05-06', chapter: 18, action: 'Rails, Roads & Infrastructure advanced to fact-checked (vault status fact-checked since Greg\'s 2026-05-06 batch approval of Ch18-Ch29; site .md and chapters.ts status fields synced; assets generated this run - one open-source D&RGW historic railroad reference + one AI-generated illustration in Desert Scholarly palette)' },
  { date: '2026-05-05', chapter: 29, action: 'Health, Safety & Emergency added from vault (~4096 words; first publication; replaces prior Ch29 stub "Genealogy & Family Lines"); 12 sections covering pioneer-era frontier medicine and Mormon midwifery 1877-1920 (Ellis Reynolds Shipp lineage), the 1918 influenza pandemic and Utah Territory public-health response (Beatty 1918-10-10 ban, empyema-mortality spike), Castleview Hospital in Price (1980 founding, 39-bed acute care, LifePoint, Top-20 Rural designation, 2023-07 Level IV Trauma), Emery Medical Center primary care at 90 W Main Street Castle Dale, Four Corners Community Behavioral Health (FCCBH, Opioid Treatment Program first in rural Utah, 24/7 crisis), the Carbon-Emery opioid epidemic (47.7/100k 2014-2016 = 2.5x state, single pharmacy 4.8M pills 2006-2012, treatment-desert collapse from 4 centers to 1, UROHC-CCM and U of U rural-nursing initiative), the Emery County Sheriff\'s Office (4,500 sq mi, county jail, civil/courts/corrections), Emery County Search and Rescue (~50 missions/yr, San Rafael Swell technical canyoneering coverage, volunteer model), volunteer fire districts (Castle Dale, Ferron, Huntington, Orangeville, Green River, Emery, Cleveland), ambulance and EMS coordination, county Emergency Management (floods/wildfires/hazmat/earthquake/Wasatch Plateau slope failures), and the public-health distance problem in a four-county-corner geography; tribal-review-flag NOT carried (no Indigenous-content overlap)' },
  { date: '2026-05-05', chapter: 23, action: 'County Governance content refreshed from vault (~4374 words; -28 from prior 4402 site version, body fully rewritten and tightened; same Part 4 / draft status); covers county formation 1880-02-12 from Sevier and Sanpete, Grand County (1890) and Carbon County (1894) splits from original Emery boundaries, three-member Board of County Commissioners structure, elected county offices, the Sheriff\'s Office and judicial system, the federal-lands relationship (BLM + USFS dominance, Dingell Act 2019 663,000-acre wilderness designation), fiscal pressure from coal decline (PILT, severance taxes, school district enrollment), Seven County Infrastructure Coalition, and the conservative political culture of post-coal rural Utah; status remains draft' },
  { date: '2026-05-04', chapter: 28, action: 'Notable People & Oral Histories added from vault (~4470 words; first publication; replaces prior Ch28 stub "Notable People & Leaders"); 12 sections covering Indigenous voices and elders (tribal_review_flag retained from vault, parallel to Ch12), founding pioneers 1875-1900 (Orange Seely 1843-1918 + Emery Stake 1880, Hyrum Seely 1881-1939, Henry U. Burr, Rasmus Johnson), frontier ranchers cowboys outlaws (the four Swasey brothers from 1875, Butch Cassidy at Castle Gate 1897-04-21, the 1912 C.J. Layton outlaw photograph, Sid\'s Mountain WSA, Kathleen Teasdale, Ned Chaffin queue), coal-camp leaders and the toll (Wilberg 1984-12-19 = 27 dead worst Utah coal-mine fire; Crandall Canyon 2007-08-06 + 2007-08-16 = 6+3 dead; Karen Jobe Templeton\'s nine bronzes dedicated 2008-09-14; Markosek + Ardohain 2016 Memorial = 123 men + 1 woman, $170k), county builders (current commission Sitterud-Leonard-Jensen), educators physicians midwives, religious leaders across LDS / Ferron Presbyterian mission 1906-1950s / Catholic / Greek Orthodox, writers historians artists (Stella McElprang 1949, Edward A. Geary 1985/1992/1996, Edwin Montell Seely 1934-2008), Emery County Progress editors from H.T. Haines 1900 forward (Bruce L. Olsen 1965 BYU thesis), oral history infrastructure (Emery County Archives + BYU L. Tom Perry + USU Fife + UHS Oral History Program + FamilySearch), People Research Queue, future of biographical preservation; status: draft' },
  { date: '2026-05-02', chapter: 27, action: 'Festivals, Folklore & Foodways added from vault (~5264 words; first publication; replaces prior Ch27 stub "Celebrations & Traditions"); covers the Pioneer Day rodeo cluster (Castle Dale Cowboys Memorial Rodeo as RMPRA opener, Huntington Heritage Days, Emery, Orangeville), Ferron Peach Days (1906, oldest continuous Utah celebration), Green River Melon Days (1906), Emery County Fair, San Rafael Folk Art Festival, Castle Valley Pageant (since 1978, Seely), pioneer Mormon foodways (Dutch oven, dryfarm wheat, orchard fruit), coal-camp ethnic foodways (Welsh, Cornish, Greek, Italian, Slavic), ranching and hunting foodways, modern table, folk arts (cowboy poetry, fiddling, choral, quilting, storytelling), and continuity questions for the 2020s; status: draft' },
  { date: '2026-05-01', chapter: 26, action: 'Arts, Literature & Media added from vault (~4320 words; first publication; replaces prior Ch26 stub "Oral Histories & Stories"); 12 sections covering pioneer music/dance, Welsh choirs, coal-camp Greek/Italian/Slavic soundscapes, McElprang 1949 county history, Geary\'s Poplarhaven 1985, the Emery County Progress 1900-2018, Emery Telcom and ETV News, the Castle Valley Pageant, the four-museum circuit, folk crafts, San Rafael Swell on screen, and the cultural future of a shrinking county; status: draft' },
  { date: '2026-04-29', chapter: 18, action: 'Rails, Roads & Infrastructure draft refreshed from vault (~4505 words; +903 from prior site version); covers ancient trade paths, 1883 Denver & Rio Grande Western main line, federal highways era, 1970 I-70 through San Rafael Swell, rural electric and telephone cooperatives, coal-to-electricity pipeline; status remains draft' },
  { date: '2026-04-29', chapter: 20, action: 'Agriculture & Ranching draft refreshed from vault (~4359 words; +883 from prior site version); covers pioneer canal-building, cooperative irrigation, salinization crisis, federal Emery County Project dams and reservoirs, alfalfa/hay farming, Green River melons, cattle and sheep ranching on public lands, water future for Emery County agriculture; status remains draft' },
  { date: '2026-04-29', chapter: 21, action: 'Energy Transition draft refreshed from vault (~3979 words; +640 from prior site version); covers coal peak to post-carbon crossroads, mine closures, Hunter and Huntington power plant retirement timelines, Green River Energy Center, workforce transitions, property tax pressures, emerging post-coal economic identity; status remains draft' },
  { date: '2026-04-28', chapter: 25, action: 'Religious Life draft published to site (~5156 words); status stub → draft; title updated from Food & Foodways; covers Indigenous spiritual landscapes (Numic/Ute, Fremont sacred geography), 1877 Mormon settlement and 1882 Emery Stake formation, pioneer meetinghouse architecture, 1982 Castle Dale/Ferron stake division, Relief Society networks and women\'s religious labor, Ferron Presbyterian mission school (1906-1950s), Greek Orthodox coal-camp spillover from Carbon County after 1924 Castle Gate disaster, two enduring small Catholic congregations, released-time seminary/institute pipeline, modern demographics and generational change, 21st-century pluralism and ~1-in-3 religiously unaffiliated; tribal_review_flag carried from vault per Indigenous-content principle' },
  { date: '2026-04-27', chapter: 24, action: 'Education & Learning draft published to site (~4400 words); status stub → draft; title updated from Arts & Music; covers pioneer schoolhouse era 1877-1900, Emery Stake Academy 1889-1922 (Tabone 1976), three-high-school era 1922-1962 (North Emery/Central/South Emery), 1962 consolidation into Emery High Spartans, current district footprint (10 schools / ~2,248 students), Green River eastern fringe, Carbon College/CEU/USU Eastern + Castle Dale Education Center, county library system (no Carnegie), 2022-2026 outcomes (87% grad / 42% math / 35% reading), post-coal CTE/IT-Pathways/GEAR UP pipeline, future-of-learning structural questions' },
  { date: '2026-04-25', chapter: 23, action: 'County Governance draft published to site (~4402 words); status stub → draft; title corrected from Environment & Conservation; part 3 → 4 (aligns with vault Part IV - Government, Community & Culture); covers county formation 1880, boundary changes (Grand/Carbon County splits), commission form of govt, elected offices, sheriff/courts, infrastructure/services, federal lands relationship, Dingell Act 2019 (663k acres wilderness), fiscal structure/coal decline, PILT, political culture, Seven County Infrastructure Coalition' },
  { date: '2026-04-24', chapter: 22, action: 'Demography & Social Change draft published to site (~4683 words); status stub → draft; title updated from Communities & Towns; covers pioneer wave/coal boom/bust, LDS social architecture, race/ethnicity, schools enrollment cliff, healthcare access gap, labor force shifts, out-migration and aging, community resilience' },
  { date: '2026-04-23', chapter: 21, action: 'Energy Transition draft published to site (~4300 words); status stub → draft; covers coal peak/mine closures/Lila Canyon/Hunter+Huntington plants/policy whiplash/property tax crisis/U-REDI/Castle Solar/Green River Energy Center/workforce gaps/demographics/tourism/2026 outlook' },
  { date: '2026-04-23', chapter: 20, action: 'Agriculture & Ranching draft published to site (~4200 words); status stub → draft; covers pioneer irrigation, salinization crisis, Emery County Project, Green River melons, cattle/sheep ranching, and drought outlook' },
  { date: '2026-04-23', chapter: 1, action: 'Geography & Physiography wordCount corrected in chapters.ts (4200 → 12847); site ch01.md was already current from 2026-04-20 revision (12 sections, engagement features, full sources)' },
  { date: '2026-04-22', chapter: 22, action: 'Part III realignment: Ch22 renamed from Land & Ownership to Demography & Social Change (stub) to match Hub Ch14–Ch22 structure' },
  { date: '2026-04-22', chapter: 21, action: 'Part III realignment: Ch21 renamed from Ghost Towns & Abandonment to Energy Transition (stub)' },
  { date: '2026-04-22', chapter: 20, action: 'Part III realignment: Ch20 renamed from Transportation & Infrastructure to Agriculture & Ranching (stub)' },
  { date: '2026-04-22', chapter: 19, action: 'Water for the Desert draft ported from vault (~4500 words); status stub → draft; replaces prior Agriculture & Land Use stub' },
  { date: '2026-04-22', chapter: 18, action: 'Rails, Roads & Infrastructure draft ported from vault (~4500 words); status stub → draft; replaces prior Communities & Towns stub; Castle Dale 1880 companion relocated to Ch16' },
  { date: '2026-04-22', chapter: 16, action: 'Castle Dale 1880 companion article attached to Mormon Colonization (moved from former Ch18 Communities & Towns)' },
  { date: '2026-04-22', chapter: 14, action: 'Spanish Trails & Fur Trappers advanced to final (vault finalized 2026-04-21)' },
  { date: '2026-04-22', chapter: 13, action: 'Archaeological Stewardship advanced to final (vault finalized 2026-04-21)' },
  { date: '2026-04-22', chapter: 12, action: 'Rock Art & Sacred Landscapes advanced to final (vault finalized 2026-04-21)' },
  { date: '2026-04-22', chapter: 11, action: 'Navajo & Puebloan Interactions advanced to final (vault finalized 2026-04-21)' },
  { date: '2026-04-22', chapter: 10, action: 'Numic Expansion advanced to final (vault finalized 2026-04-21)' },
  { date: '2026-04-22', chapter: 9, action: 'Fremont Culture advanced to final (vault finalized 2026-04-21)' },
  { date: '2026-04-21', chapter: 17, action: 'Coal, Copper & Uranium advanced to final (content refresh to site; wc 3748→4131, +383 words)' },
  { date: '2026-04-21', chapter: 16, action: 'Mormon Colonization advanced to final (content refresh to site; wc 3063→3353, +290 words)' },
  { date: '2026-04-21', chapter: 15, action: 'Powell Expeditions advanced to final (content refresh to site; wc 3435→3788, +353 words)' },
  { date: '2026-04-20', chapter: 14, action: 'Spanish Trails & Fur Trappers advanced to revised (Phase 8 revision integrated; wc 4085→4339, +254 words)' },
  { date: '2026-04-20', chapter: 13, action: 'Archaeological Stewardship advanced to revised (Phase 8 revision integrated; wc 4724→5071, +347 words)' },
  { date: '2026-04-20', chapter: 12, action: 'Rock Art & Sacred Landscapes advanced to revised (Phase 8 revision integrated; wc 4459→4892, +433 words; tribal_review_flag retained)' },
  { date: '2026-04-20', chapter: 11, action: 'Navajo & Puebloan Interactions advanced to revised (Phase 8 revision integrated; wc 3935→4283, +348 words)' },
  { date: '2026-04-20', chapter: 10, action: 'Numic Expansion advanced to revised (Phase 8 revision integrated; wc 3615→3976, +361 words)' },
  { date: '2026-04-20', chapter: 9, action: 'Fremont Culture advanced to revised (Phase 8 revision integrated; wc 4063→4511, +448 words)' },
  { date: '2026-04-18', chapter: 13, action: 'Archaeological Stewardship status advanced to fact-checked (content refresh to site)' },
  { date: '2026-04-18', chapter: 15, action: 'Powell Expeditions content refreshed to site (wc 3324→3435, +111 words from fact-check revisions)' },
  { date: '2026-04-18', chapter: 14, action: 'Spanish Trails & Fur Trappers content refreshed to site (wc 4016→4085, +69 words from fact-check revisions)' },
  { date: '2026-04-17', chapter: 12, action: 'Rock Art & Sacred Landscapes content refreshed to site (fact-check corrections; wc 4347→4459)' },
  { date: '2026-04-17', chapter: 11, action: 'Navajo & Puebloan Interactions content refreshed to site (fact-check corrections; wc 3933→3935)' },
  { date: '2026-04-17', chapter: 10, action: 'Numic Expansion content refreshed to site (fact-check corrections; wc 3533→3615)' },
  { date: '2026-04-17', chapter: 17, action: 'Fact-check corrections applied: Crandall Canyon penalty $1.64M to $1.85M; Temple Mountain mining 1918 to 1914' },
  { date: '2026-04-17', chapter: 16, action: 'Fact-check corrections applied: Emery Stake 1882 to 1880 (with pending-verification flag); Huntington brothers 1855' },
  { date: '2026-04-17', chapter: 15, action: 'Fact-check corrections applied: Desolation Canyon NRHP 1968 + NHL (was 2022); Shiloh date; Howland/Dunn dispute; Blake Station + Tavaputs etymology flagged' },
  { date: '2026-04-17', chapter: 14, action: 'Fact-check corrections applied: Humboldt-Jefferson chain softened; Horse Creek 1840; Julien late-1820s; ECHS markers' },
  { date: '2026-04-17', chapter: 12, action: 'Fact-check corrections applied: Ute migration vs. rock art dating; Loendorf 2013 flagged; 400-sites softened; OSL note added' },
  { date: '2026-04-17', chapter: 11, action: 'Fact-check corrections applied: Pueblo Revolt death toll; Navajo Nation acreage phrasing' },
  { date: '2026-04-17', chapter: 10, action: 'Fact-check corrections applied: Proto-Numic timeline; Treaty of Spanish Fork annuity; 1986 SCOTUS clarified; Black Hawk War participants' },
  { date: '2026-04-16', chapter: 7, action: 'Night Skies & Astronomy finalized — status updated to final' },
  { date: '2026-04-16', chapter: 8, action: 'Paleo-Indian & Archaic finalized — status updated to final' },
  { date: '2026-04-16', chapter: 9, action: 'Fremont Culture fact-checked — status updated to fact-checked' },
  { date: '2026-04-16', chapter: 10, action: 'Numic Expansion fact-checked — status updated to fact-checked' },
  { date: '2026-04-16', chapter: 11, action: 'Navajo & Puebloan Interactions fact-checked — status updated to fact-checked' },
  { date: '2026-04-16', chapter: 12, action: 'Rock Art & Sacred Landscapes fact-checked — status updated to fact-checked' },
  { date: '2026-04-16', chapter: 13, action: 'Archaeological Stewardship fact-checked — status updated to fact-checked' },
  { date: '2026-04-16', chapter: 14, action: 'Spanish Trails & Fur Trappers fact-checked — status updated to fact-checked' },
  { date: '2026-04-16', chapter: 15, action: 'Powell Expeditions fact-checked — status updated to fact-checked' },
  { date: '2026-04-16', chapter: 16, action: 'Mormon Colonization fact-checked — status updated to fact-checked' },
  { date: '2026-04-16', chapter: 17, action: 'Coal, Copper & Uranium fact-checked — status updated to fact-checked' },
  { date: '2026-04-15', chapter: 17, action: 'Coal, Copper & Uranium draft published to site' },
  { date: '2026-04-15', chapter: 16, action: 'Mormon Colonization draft published to site' },
  { date: '2026-04-15', chapter: 8, action: 'Paleo-Indian & Archaic content updated (wc 4200→4390)' },
  { date: '2026-04-15', chapter: 7, action: 'Night Skies & Astronomy content updated (wc 4300→4798)' },
  { date: '2026-04-13', chapter: 15, action: 'Powell Expeditions draft published to site' },
  { date: '2026-04-13', chapter: 14, action: 'Spanish Trails & Fur Trappers draft published to site' },
  { date: '2026-04-13', chapter: 13, action: 'Archaeological Stewardship draft published to site' },
  { date: '2026-04-10', chapter: 12, action: 'Rock Art & Sacred Landscapes draft published to site' },
  { date: '2026-04-10', chapter: 11, action: 'Navajo & Puebloan Interactions draft published to site' },
  { date: '2026-04-10', chapter: 8, action: 'Paleo-Indian & Archaic status updated to revised' },
  { date: '2026-04-10', chapter: 7, action: 'Night Skies & Astronomy status updated to revised' },
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
