<script lang="ts">
	// * Sahil: `data` can be either from `+page.server.ts` or `+layout.server.ts` file whichever is available.
	//         * Also, if both of these files are available then data from load fn's is merged in way:
	// *        {...{+layout}, ...{+page}}. That means +layout's load fn properties are overwritten by
	// *        +page load fn's properties.
	// ~        TLDR; +page's load fn wins and typescript types are also automatically merged as well. (TESTED)
	let { data } = $props();
	const dataCopy: any = { ...data };
	if (dataCopy.summaries) {
		delete dataCopy.summaries;
	}
	console.log('\n/blog/+page.svelte\ndata?', dataCopy);
</script>

<h1 class="text-3xl">blog</h1>

<ul>
	{#each data.summaries as { slug, title }}
		<li><a class="text-blue-600 underline" href="/blog/{slug}">{title}</a></li>
	{/each}
</ul>
