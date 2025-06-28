<script lang="ts">
	//* Read this carefully.
	let keySyntax = '{#each things as thing (thing.id)}';
	let indexSyntax = '{#each things as thing, index}';
	let keyWithIndexSyntax = '{#each things as thing, index (thing.id)}';
</script>

<hr class="my-3" />

<div class="mb-8 rounded-lg border border-yellow-500 bg-yellow-100 p-3">
	<div class="pb-1 font-bold text-purple-500 underline">
		<code>#each</code> Syntax
	</div>

	<div class="ms-5">
		<a class=" text-blue-500 underline" target="_blank" href="https://svelte.dev/docs/svelte/each"
			>❤️ Docs - Svelte - #each</a
		>
		<ol class="ms-7 list-decimal">
			<li><span class="text-purple-600">key syntax: </span> {keySyntax}</li>
			<li><span class="text-purple-600">index syntax: </span>{indexSyntax}</li>
			<li><span class="text-purple-600">key with index syntax: </span>{keyWithIndexSyntax}</li>
		</ol>
	</div>
</div>
