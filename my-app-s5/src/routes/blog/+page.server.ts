import { posts } from './data';

export async function load() {
    console.log('\nloading data in /blog/+page.server.ts')
    const filepath = '/blog/+page.server.ts'
    return {
        commonProperty: filepath,
        [filepath]: 'server data',
        summaries: posts.map((post) => ({
            slug: post.slug,
            title: post.title,
        }))
    };
}
