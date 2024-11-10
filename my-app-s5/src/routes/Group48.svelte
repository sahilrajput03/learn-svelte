<!-- 56/75 -->
<!-- https://svelte.dev/tutorial/svelte/contenteditable-bindings -->

<script>
	let html = $state('<p>Write some text!</p>');
</script>

<b> Elements with a contenteditable attribute support textContent and innerHTML bindings: </b>

<div bind:innerHTML={html} contenteditable></div>

<pre>{html}</pre>

<style>
	[contenteditable] {
		padding: 0.5em;
		border: 2px solid black;
		border-radius: 4px;
	}
</style>
