import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const chapters = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/chapters' }),
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

export const collections = { chapters };
