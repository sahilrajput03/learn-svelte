<script lang="ts">
	let { data } = $props();
	// * Sahil: `data` can be either from `+page.server.ts` or `+layout.server.ts` file whichever is available.
	//         * Also, if both of these files are available then data from load fn's is merged in way:
	// *        {...{+layout}, ...{+page}}. That means +layout's load fn properties are overwritten by
	// *        +page load fn's properties.
	// ~        TLDR; +page's load fn wins and typescript types are also automatically merged as well. (TESTED)
	const dataCopy: any = { ...data };
	if (dataCopy.summaries) {
		delete dataCopy.summaries;
		delete dataCopy.post;
	}
	console.log('\n/blog/[slug]/+page.svelte,\ndata?', dataCopy);
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>
