import { error } from '@sveltejs/kit';
import { posts } from '../data.js';

export function load({ params }) {
    console.log('\nloading data in /blog/[slug]/+page.server.ts')
    const post = posts.find((post) => post.slug === params.slug);

    if (!post) error(404);

    const filepath = '/blog/[slug]/+page.server.ts'

    return {
        commonProperty: filepath,
        [filepath]: 'server data',
        post,
    };
}
