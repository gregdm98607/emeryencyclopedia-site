// rss.xml.ts — RSS 2.0 feed for published chapters (no external dependency)
import type { APIContext } from 'astro';
import { CHAPTERS } from '../data/chapters';

const SITE = 'https://emeryencyclopedia.com';

function xmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(_context: APIContext): Promise<Response> {
  const publishedChapters = CHAPTERS.filter((ch) =>
    ['final', 'revised', 'fact-checked', 'draft'].includes(ch.status)
  ).sort((a, b) => a.number - b.number);

  const items = publishedChapters
    .map((ch) => {
      const link = `${SITE}/chapters/${ch.number}/`;
      return `
    <item>
      <title>${xmlEscape(`Ch${ch.number}: ${ch.title}`)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${xmlEscape(ch.description)}</description>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Encyclopedia of Emery County — Published Chapters</title>
    <link>${SITE}</link>
    <description>New and updated chapters from the Encyclopedia of Emery County — a comprehensive reference work on the land, people, history, and culture of Emery County, Utah.</description>
    <language>en-us</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
