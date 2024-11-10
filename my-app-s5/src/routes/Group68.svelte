<!-- 68/75 -->
<!-- https://svelte.dev/tutorial/svelte/module-exports -->

<script>
	import AudioPlayer from './AudioPlayer2.svelte';
	import { tracks } from './tracks';
</script>

<div class="centered">
	{#each tracks as track}
		<AudioPlayer {...track} />
	{/each}
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
