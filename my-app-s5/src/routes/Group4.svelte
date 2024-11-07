<!-- 11/45 -->
<!-- https://svelte.dev/tutorial/svelte/universal-reactivity -->

<script lang="ts">
	import Counter from './Counter.svelte';
</script>

<!-- State is shared among all of these since they all
 import same state `shared.svelte.ts` file.
  -->

<div class="text-red-600">
	Alert: Never reassign state (`counter` here) when its defined in a module (`shared.svelte.ts`
	here) <b>but feel free to mutate it.</b>
</div>

<Counter />
<Counter />
<Counter />
