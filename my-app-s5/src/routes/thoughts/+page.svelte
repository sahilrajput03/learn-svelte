<script lang="ts">
	import { onMount } from 'svelte';

	let thoughts = $state<string[]>([]);
	let thoughtsToShow = $state(['t1', 't2']);
	let isShowSahilThoughtsInitially = true;
	let isShowSahilThoughts = $state(isShowSahilThoughtsInitially);

	const showSahilThoughts = () => {
		console.log('triggered');
		thoughtsToShow = thoughts.filter((thought) => thought.includes('~ Sahil'));
		// To remove `~ Sahil` use below code instead
		// thoughts = text
		// 	.split('\n')
		// 	.filter((thought) => thought.includes('~ Sahil'))
		// 	.map((thought) => thought.replace('~ Sahil', '').trim());
	};

	onMount(async () => {
		console.log('load-fn');

		const response = await fetch(
			'https://raw.githubusercontent.com/sahilrajput03/sahilrajput03/refs/heads/main/thoughts-principles-react/src/thoughts.md'
		);
		const text = await response.text();
		thoughts = text.split('\n');

		if (isShowSahilThoughtsInitially) {
			showSahilThoughts();
		} else {
			thoughtsToShow = thoughts;
		}
	});

	$effect(() => {
		console.log('effect-fn');

		if (isShowSahilThoughts) {
			showSahilThoughts();
		} else {
			thoughtsToShow = thoughts;
		}
	});
</script>

<section>
	<h1 class="text-2xl">Thoughts & Principles</h1>
	<input type="checkbox" bind:checked={isShowSahilThoughts} />

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
