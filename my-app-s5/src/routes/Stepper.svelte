<!-- This file is consumed in file://./Group16.svelte -->
<!-- ! Note the `lang="ts"` in the script tag.  -->
<script lang="ts">
	import type { MouseEventHandler } from '../types';

	type Props = { increment: MouseEventHandler; decrement: MouseEventHandler };
	let { increment, decrement }: Props = $props();
</script>

<button onclick={decrement}>-1</button>
<button onclick={increment}>+1</button>

<style>
	button {
		border: 1px solid black;
		padding: 10px 50px;
	}
</style>
