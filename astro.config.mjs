// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    site: 'https://novassite.net',
    integrations: [
mdx(),
sitemap({
serialize(item) {
if (/secret/.test(item.url)) {
return undefined;// they're secrets cmon
}
if (/adult/.test(item.url)) {
return undefined;
}
if (/snow/.test(item.url)) {
return undefined;
}
return item;
},
}),
(await import("astro-compress")).default({Image: false}) //i compress images myself before committing them i don't need you to do that, also god does it really make all this shit take so much longer
],
    adapter: node({
      mode: 'middleware',
    }),
    markdown: {
        shikiConfig: {
        theme: "none", // Removes automatic styles
    },
},
});
