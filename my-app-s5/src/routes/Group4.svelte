<!-- 11/45 -->
<script>
	import Counter from './Counter.svelte';
</script>

<!-- State is shared among all of these since they all
 import same state `shared.svelte.ts` file.
  -->
<Counter />
<Counter />
<Counter />
