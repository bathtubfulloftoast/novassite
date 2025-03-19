// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://novassite.net',
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
		theme: "none", // Removes automatic styles
	},
},
});
