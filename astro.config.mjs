// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://emeryencyclopedia.com',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
