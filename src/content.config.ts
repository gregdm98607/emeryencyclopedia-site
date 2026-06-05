import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const chapters = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/chapters' }),
  schema: z.object({
    title: z.string(),
    chapter: z.number(),
    part: z.number(),
    status: z.enum(['stub', 'draft', 'fact-checked', 'revised', 'final']),
    description: z.string(),
    wordCount: z.number().default(0),
    readingTime: z.string().optional(),
    related: z.array(z.number()).default([]),
    heroImage: z.string().optional(),
    lastUpdated: z.string().optional(),
  }),
});

// Articles / vignettes / companion pieces — standalone reader-facing pages that
// pair with chapters (or stand alone). First use: Castle Dale 1880 teaser,
// paired with Ch18 "Communities & Towns". Register 4 (EEC-AG — public-facing).
const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    kind: z.enum(['vignette', 'teaser', 'companion', 'essay']).default('vignette'),
    // Pairing metadata — how this article relates to the encyclopedia proper
    companionToChapter: z.number().optional(),
    companionToSection: z.string().optional(),
    // Dataset link — if the article is an entry-point into a data page
    datasetPath: z.string().optional(),
    // Reader metadata
    audience: z.string().optional(),
    wordCount: z.number().default(0),
    readingTime: z.string().optional(),
    // Editorial
    publishDate: z.string(),
    lastUpdated: z.string().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { chapters, articles };
