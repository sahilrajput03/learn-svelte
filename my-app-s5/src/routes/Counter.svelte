<!-- This file is consumed in file://./Group4.svelte -->
<script lang="ts">
	import { counter } from './shared.svelte';
</script>

<button class="btn-primary" onclick={() => (counter.count += 1)}>
	clicks: {counter.count}
</button>
