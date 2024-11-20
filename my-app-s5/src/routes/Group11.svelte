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
	Note by Sahil: It is important to give each block a `key` so it knows which item's DOM node to
	add/remove rather than add/remove in the end of list which is default behavior.
</div>
{#each things as thing (thing.id)}
	<Thing name={thing.name} />
{/each}

<div class="mt-5 underline">Duplicate (to show destructuring in #each)</div>
{#each things as { id, name } (id)}
	<Thing {name} />
{/each}

<NotesEach />
