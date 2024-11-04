<!-- 31/45 -->
<!-- https://svelte.dev/tutorial/svelte/textarea-inputs -->

<!-- <textarea> element behaves similarly to a text <input> -->

<script lang="ts">
	import { marked } from 'marked';
	import OpenFileInVscode from './OpenFileInVscode.svelte';

	let value = $state(`Some words are *italic*, some are **bold**\n\n- lists\n- are\n- cool`);
</script>

<div class="grid">
	input
	<!-- / //& `bind:value` is shorthand for `bind:value={value}` -->
	<textarea bind:value></textarea>

	output
	<div>{@html marked(value)}</div>
</div>

<OpenFileInVscode relativeFilePath={(import.meta.hot as any)?.ownerPath} />

<style>
	.grid {
		display: grid;
		grid-template-columns: 5em 1fr;
		grid-template-rows: 1fr 1fr;
		grid-gap: 1em;
		height: 100%;
	}

	textarea {
		flex: 1;
		resize: none;
		height: 200px;
		border: 1px solid black;
	}
</style>
