<script lang="ts">
	let { data, children } = $props();
	const dataCopy: any = { ...data };
	if (dataCopy.summaries) {
		delete dataCopy.summaries;
	}
	// * `data` comes only from `+layout.server.ts` file (not from +page.svelte.ts)
	console.log('\n/blog/[slug]/+layout.svelte\ndata?', dataCopy);
</script>

<div class="layout">
	<main>
		{@render children()}
	</main>

	<aside>
		<h2>More posts <code class="text-[0.6rem] italic">(/blog/[slug]/+layout.svelte)</code></h2>

		<ul>
			{#each data.summaries as { slug, title }}
				<li>
					<a class="text-blue-600 underline" href="/blog/{slug}">{title}</a>
				</li>
			{/each}
		</ul>
	</aside>
</div>

<style>
	@media (min-width: 640px) {
		.layout {
			display: grid;
			gap: 2em;
			grid-template-columns: 1fr 16em;
		}
	}
</style>
