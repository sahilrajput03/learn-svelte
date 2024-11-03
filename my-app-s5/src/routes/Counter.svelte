<!-- This file is consumed in file://./Group4.svelte -->
<script>
	import { counter } from './shared.svelte';
</script>

<button onclick={() => (counter.count += 1)}>
	clicks: {counter.count}
</button>
