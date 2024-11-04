<!-- 18/45 -->

<!-- ❤️ ❤️ Truly tremendous example  -->

<script>
	import Thing from './Thing.svelte';

	let things = $state([
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' }
	]);

	//* Read this carefully.
	let keySyntax = '{#each things as thing (thing.id)}';
	let indexSyntax = '{#each things as thing, index}';
	let keyWithIndexSyntax = '{#each things as thing, index (thing.id)}';
</script>

<button class="btn-primary" onclick={() => things.shift()}> Remove first thing </button>

<!-- For source explanation, check source - https://svelte.dev/tutorial/svelte/keyed-each-blocks --->

<!-- / //* Read this carefully. -->
<div class="text-amber-700">
	Note by Sahil: It is important to give each block a `key` so it knows which item's DOM node to
	add/remove rather than add/remove in the end of list which is default behavior.
</div>
{#each things as thing (thing.id)}
	<Thing name={thing.name} />
{/each}

<hr class="my-10" />

<div>
	<p><span class="text-purple-600">key syntax: </span> {keySyntax}</p>
	<p><span class="text-purple-600">index syntax: </span>{indexSyntax}</p>
	<p><span class="text-purple-600">key with index syntax: </span>{keyWithIndexSyntax}</p>
</div>
