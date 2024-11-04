<script lang="ts">
	import OpenFileInVscode from './OpenFileInVscode.svelte';
</script>

<!-- 22/45 -->
<!-- https://svelte.dev/tutorial/svelte/capturing -->

<div>
	Bubbling (default) - the `input` handler (`onkeydown`) runs first, as the event ‘bubbles’ from the
	target up to the document, followed by the outer handler.
</div>
<div onkeydown={(e) => alert(`<div> ${e.key}`)} role="presentation">
	<input onkeydown={(e) => alert(`<input> ${e.key}`)} />
</div>

<hr />

<div>
	Capturing - We assign capture handlers using `onkeydowncapture`. Now, the call order is reversed.
</div>
<div onkeydowncapture={(e) => alert(`<div> ${e.key}`)} role="presentation">
	<input onkeydowncapture={(e) => alert(`<input> ${e.key}`)} />
</div>

<hr />

<div>
	Bubbling + Capturing - If both capturing and non-capturing handlers exist for a given event, the
	capturing handlers will run first
</div>
<div
	onkeydown={(e) => alert(`bubbling handler: <div> ${e.key}`)}
	onkeydowncapture={(e) => alert(`capturing handler: <div> ${e.key}`)}
	role="presentation"
>
	<input
		onkeydown={(e) => alert(`bubbling handler: <input> ${e.key}`)}
		onkeydowncapture={(e) => alert(`capturing handler: <input> ${e.key}`)}
	/>
</div>

<div class="from-chatgpt">
	<div>Bubbling and Capturing Phases Explanation by ChatGPT:</div>
	<img class="bubble-capture-img" src="bubbling-capturing.jpeg" alt="bubbling-capturing" />
</div>

<OpenFileInVscode relativeFilePath={(import.meta.hot as any)?.ownerPath} />

<style>
	:root {
		margin: 20px;
	}
	input {
		border: 2px solid black;
	}
	hr {
		margin: 40px 0px;
	}

	.from-chatgpt {
		margin-top: 50px;
		font-weight: bold;
	}
	.bubble-capture-img {
		width: 700px;
	}
</style>
