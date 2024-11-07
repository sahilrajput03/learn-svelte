<!-- This file is consumed in file://./Group49.svelte -->
<script lang="ts">
	import { get } from 'svelte/store';
	import { countStore } from './shared.svelte';

	const updateCount = () => countStore.update((n) => n - 1);

	const getValue = () => {
		alert(get(countStore));
	};
</script>

<button class="btn-primary" onclick={() => ($countStore += 1)}>
	clicks: {$countStore}
</button>

<button class="btn-primary" onclick={updateCount}>Decrease count value outside the component</button
>

<button class="btn-primary" onclick={getValue}>Get counterstore value outside the component</button>

<hr class="m-5" />
