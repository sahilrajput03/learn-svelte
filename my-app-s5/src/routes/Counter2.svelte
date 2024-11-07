<!-- This file is consumed in file://./Group49.svelte -->
<script lang="ts">
	import { countStore } from './shared.svelte';

	const updateCount = () => countStore.update((n) => n - 1);
</script>

<button class="btn-primary" onclick={() => ($countStore += 1)}>
	clicks: {$countStore}
</button>

<button class="btn-primary" onclick={updateCount}>Decrease count</button>

<hr class="m-5" />
