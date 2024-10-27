<!-- 26/45 -->
<!-- https://svelte.dev/tutorial/svelte/numeric-inputs -->

<script>
	let a = $state(1);
	let b = $state(2);
</script>

<h1>coerce is done automatically for <b>input</b> tags with `type="number"` and `type="range"`.</h1>

<label>
	<input type="number" bind:value={a} min="0" max="10" />
	<input type="range" bind:value={a} min="0" max="10" />
</label>

<label>
	<input type="number" bind:value={b} min="0" max="10" />
	<input type="range" bind:value={b} min="0" max="10" />
</label>

<p>{a} + {b} = {a + b}</p>

<style>
	h1 {
		font-size: 2rem;
		margin-bottom: 20px;
	}
</style>
