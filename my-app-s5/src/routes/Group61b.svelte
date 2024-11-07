<!-- 61b/75 -->
<!-- https://svelte.dev/tutorial/svelte/context-api -->

<script lang="ts">
	import { setContext } from 'svelte';
	import Child1 from './Child1.svelte';
	import type { UserContextType } from './types';

	let context = $state<UserContextType>({ name: 'Sahil Rajput', age: 27 });
	setContext('my-context', context);
</script>

<input bind:value={context.name} />
<input bind:value={context.age} />

<u>Parent component:</u> <b>I am {context.name} and my age is {context.age}.</b>

<Child1 />

<style>
	input {
		border: 1px solid black;
		margin-top: 5px;
		padding: 4px;
		display: block;
	}
</style>
