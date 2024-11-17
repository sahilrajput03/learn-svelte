<!-- 69/75 -->
<!-- https://svelte.dev/tutorial/svelte/sharing-code -->

<script>
	import AudioPlayer2, { stopAll } from './AudioPlayer2.svelte';
	import { tracks } from './tracks';
</script>

<div class="centered">
	{#each tracks as track}
		<AudioPlayer2 {...track} />
	{/each}

	<button class="btn-primary bg-purple-100" onclick={stopAll}> stop all </button>
</div>

<style>
	.centered {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		gap: 0.5em;
		max-width: 40em;
		margin: 0 auto;
	}
</style>
