// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://novassite.net',
	integrations: [mdx(), sitemap()],
	output: 'server',
	adapter: netlify({
		edgeMiddleware: true,
	}),
	markdown: {
		shikiConfig: {
		theme: "none", // Removes automatic styles
	},
},
});
