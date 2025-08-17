import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
    	return rss({
		title: "Novas Blog",
		description: "The Blog Of Nova",
		site: context.site,
		items: posts
		.filter(posts => !posts.hidden)
		.slice(0,10)
		.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}
