<!-- 65/75 -->
<!-- https://svelte.dev/tutorial/svelte/svelte-body -->

<script>
	import { onMount } from 'svelte';
	import kitten from './kitten.png';

	let hereKitty = $state(false);

	// From Sahil: It helps to replicate the behavior of `:global` in <style/> tag as it works in original svelte tutorial.
	onMount(() => {
		const element = document.body;

		// Set the properties
		element.style.height = '50vh';
		element.style.outline = '1px solid #f6bb4d';

		return () => {
			// Settign properties of body to their initial values i.e., before setting it in the first place, in Chrome (MacOS)
			element.style.height = '';
			element.style.outline = '';
		};
	});
</script>

<svelte:body onmouseenter={() => (hereKitty = true)} onmouseleave={() => (hereKitty = false)} />

<div class="m-5 font-bold">Kitty comes from window edge if you hover here</div>

<!-- creative commons BY-NC http://www.pngall.com/kitten-png/download/7247 -->
<img class:curious={hereKitty} alt="Kitten wants to know what's going on" src={kitten} />

<style>
	img {
		position: absolute;
		left: 0;
		bottom: -60px;
		transform: translate(-80%, 0) rotate(-15deg);
		transform-origin: 100% 100%;
		transition: transform 0.4s;
	}

	.curious {
		transform: translate(-15%, 0) rotate(0deg);
	}

	/* //* I am not using this because if I use code below i.e., `:global()` then the style to <body> tag is applied even when this component is not rendered,
       //* which is destructive to my current component selector component in ./src/routes/+page.svelte. */
	/* :global(body) {
		border: 2px solid red;
		overflow: hidden;
	} */
</style>
