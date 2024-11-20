<script lang="ts">
	//* Read this carefully.
	let keySyntax = '{#each things as thing (thing.id)}';
	let indexSyntax = '{#each things as thing, index}';
	let keyWithIndexSyntax = '{#each things as thing, index (thing.id)}';
</script>

<hr class="my-3" />

<h1 class="pb-3 text-4xl">Notes: Syntax of <code>each blocks</code></h1>

<a class="text-blue-500 underline" target="_blank" href="https://svelte.dev/docs/svelte/each"
	>Svelte Docs - each</a
>
<div>
	<p><span class="text-purple-600">key syntax: </span> {keySyntax}</p>
	<p><span class="text-purple-600">index syntax: </span>{indexSyntax}</p>
	<p><span class="text-purple-600">key with index syntax: </span>{keyWithIndexSyntax}</p>
</div>
