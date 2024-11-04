<!-- 35-a/45 -->
<!-- https://svelte.dev/tutorial/svelte/component-styles -->

<script lang="ts">
	import Box1 from './Box1.svelte';
	import OpenFileInVscode from './OpenFileInVscode.svelte';
</script>

<div class="boxes">
	<Box1 />
	<Box1 />
	<Box1 />
</div>

<OpenFileInVscode relativeFilePath={(import.meta.hot as any)?.ownerPath} />

<style>
	/* //& Influence the styles inside a child component */
	.boxes :global(.box:nth-child(1)) {
		background-color: red;
	}
	.boxes :global(.box:nth-child(2)) {
		background-color: green;
	}
	.boxes :global(.box:nth-child(3)) {
		background-color: blue;
	}
	/** //& Although above works well but its bad because:
	1. It’s extremely verbose.
	2. For another, it’s brittle — any changes to the implementation
		details of Box.svelte could break the selector.
	3. Most of all though, it’s rude. Components should be able to
		decide for themselves which styles can be controlled from
		‘outside’, in the same way they decide which variables are
		exposed as props. :global should be used as an
		escape hatch — a last resort.
	 */
</style>
