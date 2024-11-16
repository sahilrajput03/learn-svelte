<script lang="ts">
	import { onMount } from 'svelte';

	let thoughts = $state<string[]>([]);
	let thoughtsToShow = $state(['t1', 't2']);
	let showSahilThoughtsInitially = true;
	let showSahilThoughts = $state(showSahilThoughtsInitially);

	const load = async () => {
		const response = await fetch(
			'https://raw.githubusercontent.com/sahilrajput03/sahilrajput03/refs/heads/main/thoughts-principles-react/src/thoughts.md'
		);
		const text = await response.text();
		thoughts = text.split('\n');

		if (showSahilThoughtsInitially) {
			thoughtsToShow = thoughts.filter((thought) => thought.includes('~ Sahil'));

			// To remove ~ Sahil from each thought
			// thoughts = text
			// 	.split('\n')
			// 	.filter((thought) => thought.includes('~ Sahil'))
			// 	.map((thought) => thought.replace('~ Sahil', '').trim());
		} else {
			thoughtsToShow = thoughts;
		}
	};

	onMount(load);

	$effect(() => {
		if (showSahilThoughts) {
			thoughtsToShow = thoughts.filter((thought) => thought.includes('~ Sahil'));
		} else {
			thoughtsToShow = thoughts;
		}
	});
</script>

<section>
	<h1 class="text-2xl">Thoughts & Principles</h1>
	<input type="checkbox" bind:checked={showSahilThoughts} />

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
