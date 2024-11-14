<script lang="ts">
	let { data, children } = $props();
	const dataCopy: any = { ...data };
	if (dataCopy.summaries) {
		delete dataCopy.summaries;
	}
	// * `data` comes only from `+layout.server.ts` file (not from +page.svelte.ts)
	console.log('\n/blog/+layout.svelte,\ndata?', dataCopy);
</script>

<section>
	{@render children()}
</section>

<style>
	section {
		padding: 50px;
	}
</style>
