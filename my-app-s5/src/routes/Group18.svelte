<!-- 25/45 -->
<!-- https://svelte.dev/tutorial/svelte/text-inputs -->

<script lang="ts">
	import OpenFileInVscode from './OpenFileInVscode.svelte';

	let name = $state('world');
</script>

<input bind:value={name} />

<h1>Hello {name}!</h1>

<OpenFileInVscode relativeFilePath={(import.meta.hot as any)?.ownerPath} />

<style>
	input {
		border: 1px solid black;
	}
</style>
