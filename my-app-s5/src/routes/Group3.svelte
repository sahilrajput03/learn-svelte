<!-- 10/45 -->
<!-- https://svelte.dev/tutorial/svelte/effects -->

<!-- Sahil: This is goona be quite a useful example for my future things. -->
<!-- Learning - We have to clear the interval id in cleanup function otherwise older intervals would keep on accumulating.. -->
<script lang="ts">
	let elapsed = $state(0);
	let interval = $state(1000);

	$effect(() => {
		const id = setInterval(() => {
			elapsed += 1;
		}, interval);

		return () => {
			clearInterval(id);
		};
	});
</script>

<p class="mb-3 text-orange-500">
	Your effects run after the component has been mounted to the DOM. Source: <a
		class="text-blue-700"
		href="https://svelte.dev/docs/svelte/$effect">Docs - $effect()</a
	>
</p>

<button class="btn-primary" onclick={() => (interval /= 2)}>speed up</button>
<button class="btn-primary" onclick={() => (interval *= 2)}>slow down</button>

<p>elapsed: {elapsed}</p>
