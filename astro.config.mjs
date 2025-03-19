// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
	site: 'https://novassite.net',
	integrations: [mdx(), sitemap()],
	adapter: netlify(),
	markdown: {
		shikiConfig: {
		theme: "none", // Removes automatic styles
	},
},
});
