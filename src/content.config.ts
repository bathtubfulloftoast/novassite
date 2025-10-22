import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		hidden: z.boolean().optional(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
	}),
});

const trailers = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/trailers', pattern: '*.md' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		video: z.string(),
		hidden: z.boolean().optional(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
	}),
});

const comics = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/comics', pattern: '*.md' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		image: z.string(),
		artist: z.number(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
	}),
});

export const collections = { blog, trailers, comics };
