<!-- 61/75 -->
<!-- https://svelte.dev/tutorial/svelte/context-api -->

<script lang="ts">
	import Canvas from './Canvas3.svelte';
	import Square from './Square.svelte';

	// we use a seeded random number generator to get consistent jitter
	let seed = 1;

	function random() {
		seed *= 16807;
		seed %= 2147483647;
		return (seed - 1) / 2147483646;
	}

	function jitter(amount: number) {
		return amount * (random() - 0.5);
	}
</script>

<div class="container">
	<Canvas width={800} height={1200}>
		{#each Array(12) as _, c}
			{#each Array(22) as _, r}
				<Square
					x={180 + c * 40 + jitter(r * 2)}
					y={180 + r * 40 + jitter(r * 2)}
					size={40}
					rotate={jitter(r * 0.05)}
				/>
			{/each}
		{/each}
	</Canvas>
</div>

<style>
	.container {
		/* height: 100%; */
		/* Note: I have added custom width here to prevent too much zoomed canvas size. */
		width: 320px;
		aspect-ratio: 2 / 3;
		margin: 0 auto;
		background: rgb(224, 219, 213);
		filter: drop-shadow(0.5em 0.5em 1em rgba(0, 0, 0, 0.1));
	}
</style>
