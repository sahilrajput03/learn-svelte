<!-- 67/75 -->
<!-- https://svelte.dev/tutorial/svelte/svelte-element -->

<script>
	const options = ['h1', 'h2', 'h3', 'p', 'marquee'];
	let selected = $state(options[0]);
</script>

<select bind:value={selected}>
	{#each options as option}
		<option value={option}>{option}</option>
	{/each}
</select>

<svelte:element this={selected}>
	I'm a <code>&lt;{selected}&gt;</code> element
</svelte:element>

<style>
	/* ///* Note: I have to add custom font sizes here to demonstrate this tutorial
        //* because tailwind by default sets font-sizes of all headings to normal text size. */
	h1 {
		font-size: 2rem;
	}
	h2 {
		font-size: 1.5rem;
	}
	h3 {
		font-size: 1.2rem;
	}
	select {
		border: 1px solid black;
	}
</style>
