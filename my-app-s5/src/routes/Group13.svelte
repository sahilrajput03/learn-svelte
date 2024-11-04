<!-- 20/45 -->
<!-- https://svelte.dev/tutorial/svelte/dom-events -->

<script lang="ts">
	import OpenFileInVscode from './OpenFileInVscode.svelte';

	let m = $state({ x: 0, y: 0 });

	// @ts-ignore
	function onpointermove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
</script>

<div {onpointermove}>
	The pointer is at {Math.round(m.x)} x {Math.round(m.y)}
</div>

<OpenFileInVscode relativeFilePath={(import.meta.hot as any)?.ownerPath} />

<style>
	div {
		border: 1px solid grey;
		position: fixed;
		left: 50px;
		right: 50px;
		top: 100px;
		bottom: 100px;
		padding: 1rem;
	}
</style>
