<!-- 11/45 -->
<script>
	import { counter } from './shared.svelte';
</script>

<button onclick={() => (counter.count += 1)}>
	clicks: {counter.count}
</button>
