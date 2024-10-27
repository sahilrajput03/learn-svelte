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
</script>

<button onclick={() => things.shift()}> Remove first thing </button>

<!-- For source explanation, check source - https://svelte.dev/tutorial/svelte/keyed-each-blocks --->

<!-- Note by Sahil: It is important to give each block a `key` so
 it knows which item's DOM node to add/remove
 rather than add/remove in the end of list which is default behavior.  -->
{#each things as thing (thing.id)}
	<Thing name={thing.name} />
{/each}
