// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://elden.ae',
  output: 'static',
  integrations: [mdx(), sitemap()],
  // Barlow is the site's only typeface — headings, body, hero, UI, all of
  // it. Matching eldenuae.com, which uses Barlow for its body copy (its
  // headings fall through to whatever the visitor's OS supplies, which is
  // the inconsistency this replaces rather than copies).
  //
  // Routed through Astro's Fonts API rather than a Google Fonts <link> so
  // the files are downloaded at build time and served from our own origin:
  // no render-blocking third-party request, no extra DNS/TLS handshake, and
  // the fallback metrics are generated for us so the swap doesn't shift
  // layout. Weights are the four the stylesheet actually uses (500/600/700
  // /900) — adding a weight here is cheap, shipping unused ones is not.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Barlow',
      cssVariable: '--font-barlow',
      weights: [500, 600, 700, 900],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});