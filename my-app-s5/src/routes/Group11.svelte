<!-- 18/45 -->
<!-- https://svelte.dev/tutorial/svelte/keyed-each-blocks -->

<!-- ❤️ ❤️ Truly tremendous example  -->

<script lang="ts">
	import NotesEach from './NotesEach.svelte';

	import Thing from './Thing.svelte';

	let things = $state([
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' }
	]);
</script>

<button class="btn-primary" onclick={() => things.shift()}> Remove first thing </button>

<!-- For source explanation, check source - https://svelte.dev/tutorial/svelte/keyed-each-blocks --->

<!-- //* Read this carefully. -->
<div class="text-amber-700">
	❤️ ❤️ Note by Sahil: It is important to give each block a `key` so it knows which item's DOM node
	to add/remove rather than add/remove in the end of list which is default behavior.
</div>
<div class="text-sm text-gray-500">{`{#each things as thing (thing.id)}`}</div>
{#each things as thing (thing.id)}
	<Thing name={thing.name} />
{/each}

<div class="mt-5 font-bold underline">Using `index` along with `key` in #each</div>
<div class="text-sm text-gray-500">{`{#each things as thing, index (thing.id)}`}</div>
{#each things as thing, index (thing.id)}
	<div class="flex">
		<Thing name={thing.name} />
		<span class="ms-3 text-sm italic text-gray-600">(Index: {index})</span>
	</div>
{/each}

<div class="mt-5 font-bold underline">Using destructuring along with `key` in #each</div>
<div class="text-sm text-gray-500">{`{#each things as { id, name } (id)}`}</div>
{#each things as { id, name } (id)}
	<Thing {name} />
{/each}

<NotesEach />
