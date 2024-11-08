<!-- 63/75 -->
<!-- https://svelte.dev/tutorial/svelte/svelte-window-bindings -->

<script>
	import { onMount } from 'svelte';

	let y = $state(0);

	// From Sahil: It helps to replicate the behavior of `:global` in <style/> tag as it works in original svelte tutorial.
	onMount(() => {
		const element = document.getElementsByTagName('body')[0];

		// Set the properties
		element.style.height = '400vw';
		element.style.backgroundImage = "url('./deepsea.webp')";
		element.style.backgroundSize = 'cover';

		return () => {
			// Settign properties of body to their initial values i.e., before setting it in the first place, in Chrome (MacOS)
			element.style.height = '';
			element.style.backgroundImage = '';
			element.style.backgroundSize = '';
		};
	});
</script>

<svelte:window bind:scrollY={y} />

<span>depth: {y}px</span>

<style>
	/* //* I am not using this because `:global()` style is applied even when this component is not rendered,
       //* which is destructive in my current component selector case. */
	/* :global(body) {
		height: 400vw;
		background: url(./deepsea.webp);
		background-size: cover;
	} */

	span {
		position: fixed;
		font-size: 2em;
		color: white;
		font-variant: tabular-nums;
	}
</style>
