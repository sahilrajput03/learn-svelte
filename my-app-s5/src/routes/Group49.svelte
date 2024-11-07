<!-- 49/75 -->
<!-- https://svelte.dev/tutorial/svelte/introducing-stores -->

<script lang="ts">
	import Counter2 from './Counter2.svelte';
</script>

<div class="text-sm text-orange-600">
	Prior to the introduction of runes in Svelte 5, stores were the idiomatic way to handle reactive
	state outside components. That’s no longer the case, but you’ll still encounter stores when using
	Svelte (including in SvelteKit, for now), so it’s worth knowing how to use them.
</div>

<div class="my-3 text-sm text-purple-600">
	Inside the component you can use `$storeName` to access and `$countStore += 1` mutate the state
	directly but outisde the component please use <b
		>`countStore.set(..)` or `countStore.update(..)` method.</b
	> <b class="text-green-600">You can learn how to create custom stores in this same link.</b>
	<a class="text-blue-700" href="https://svelte.dev/docs/svelte/stores">Docs - Store</a>
</div>

<Counter2 />
<Counter2 />
<Counter2 />
