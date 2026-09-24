// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://eldenuae.com',
  output: 'static',
  integrations: [mdx(), sitemap()],
  // The old /career page was an orphaned duplicate of /careers.
  redirects: {
    '/career': '/careers',
    // Retired listicle; send old links and search results to the journal.
    '/journal/best-interior-fitout-companies-dubai': '/journal',
  },
  // Three faces, each with one job: Inter Tight carries display and UI,
  // Instrument Serif is the single italic accent word in a headline, Geist
  // Mono sets meta — labels, years, counts, indices. Routed through Astro's
  // Fonts API so the files are self-hosted at build time with generated
  // fallback metrics. Only the weights the stylesheet uses are listed.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter Tight',
      cssVariable: '--font-inter-tight',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Instrument Serif',
      cssVariable: '--font-instrument-serif',
      weights: [400],
      styles: ['italic'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});