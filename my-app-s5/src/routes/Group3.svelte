<!-- 10/45 -->

<!-- Sahil: This is goona be quite a useful example for my future things. -->
<!-- Learning - We have to clear the interval id in cleanup function otherwise older intervals would keep on accumulating.. -->
<script>
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

<button onclick={() => (interval /= 2)}>speed up</button>
<button onclick={() => (interval *= 2)}>slow down</button>

<p>elapsed: {elapsed}</p>
