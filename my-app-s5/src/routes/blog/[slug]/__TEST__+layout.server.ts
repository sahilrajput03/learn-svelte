
export async function load() {
    console.log('\nloading data in /blog/[slug]/+layout.server.ts')

    const filepath = '/blog/[slug]/+layout.server.ts'
    return {
        commonProperty: filepath,
        [filepath]: 'server data',
    };
}
