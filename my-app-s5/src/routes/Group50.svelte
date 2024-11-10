<!-- 58/75 -->
<!-- https://svelte.dev/tutorial/svelte/media-elements -->

<script lang="ts">
	import AudioPlayer from './AudioPlayer.svelte';
	import { tracks } from './tracks';
</script>

<div class="mb-3 text-purple-600">
	❤️ From Sahil: Learn awesome properties of &lt;audio /&gt; and &lt;video /&gt; from this tutorial
	at svelte site (click on top-right link).
</div>

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
