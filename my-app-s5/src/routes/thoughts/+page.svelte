<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { fade } from 'svelte/transition';

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

	// This effect is run anytime `isShowSahilThoughts` or `thoughts` is updated and both cases are needed.
	// `isShowSahilThoughts` is needed because we need to update `isShowSahilThoughts` whenever checkbox is clicked.
	// `thoughts` is needed because we want it to run when thoughts are updated on page load time as defined in `onMount`
	//  (TESTED)
	// DO NOT REMOVE fn-$effect logs.
	$effect(() => {
		console.log('fn-$effect'); // runs twice because `$effect` depends on `isShowSahilThoughts` and `thoughts` and its needed too.

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

	{#key isShowSahilThoughts}
		<ol in:fade={{ duration: 600 }} out:fade={{ duration: 100 }}>
			{#each thoughtsToShow as thought}
				<li>
					{thought}
				</li>
			{/each}
		</ol>
	{/key}
</section>

<style>
	section {
		padding: 20px;
	}
</style>
