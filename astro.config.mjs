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
  // Playfair Display is used in exactly one place — the hero quote. Routed
  // through Astro's Fonts API rather than a Google Fonts <link> so the files
  // are downloaded at build time and served from our own origin: no
  // render-blocking third-party request, no extra DNS/TLS handshake, and the
  // fallback metrics are generated for us so the swap doesn't shift layout.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Playfair Display',
      cssVariable: '--font-display-serif',
      weights: [500],
      styles: ['italic', 'normal'],
      subsets: ['latin'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});