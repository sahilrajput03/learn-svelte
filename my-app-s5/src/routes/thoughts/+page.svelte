<script lang="ts">
	import { onMount } from 'svelte';

	let isShowSahilThoughtsInitially = true;

	let thoughts = $state<string[]>([]);
	let thoughtsToShow = $state<string[]>([]);
	let isShowSahilThoughts = $state(isShowSahilThoughtsInitially);

	onMount(async () => {
		console.log('fn-load');

		const response = await fetch(
			'https://raw.githubusercontent.com/sahilrajput03/sahilrajput03/refs/heads/main/thoughts-principles-react/src/thoughts.md'
		);
		const text = await response.text();
		thoughts = text.split('\n');
	});

	$effect(() => {
		console.log('fn-$effect');

		// From docs: Your effects run after the component has been mounted to the DOM. Docs - https://svelte.dev/docs/svelte/$effect
		if (isShowSahilThoughts) {
			thoughtsToShow = thoughts
				.filter((thought) => thought.includes('~ Sahil'))
				.map((thought) => thought.replace('~ Sahil', '').trim());
		} else {
			thoughtsToShow = thoughts;
		}
	});
</script>

<section>
	<h1 class="text-2xl font-bold">Thoughts & Principles</h1>
	<div class="my-3">
		<label>
			<input type="checkbox" bind:checked={isShowSahilThoughts} />
			Show only Sahil's Thoughts
		</label>
	</div>

	<ol>
		{#each thoughtsToShow as thought}
			<li>
				{thought}
			</li>
		{/each}
	</ol>
</section>

<style>
	section {
		padding: 20px;
	}
</style>
