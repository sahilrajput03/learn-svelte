<!-- 42/45 -->
<!-- https://svelte.dev/tutorial/svelte/custom-js-transitions -->

<script lang="ts">
	let visible = $state(false);

	type Options = { speed?: number };
	function typewriter(node: any, options: Options = {}) {
		const { speed = 1 } = options;

		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t: number) => {
				// console.log('t?', t) // goes from 0.003 to 1
				// Math.trunc(..) removes the decimal parts
				const i = Math.trunc(text.length * t); // i goes from 0 to `text.length`
				node.textContent = text.slice(0, i); // textContent goes from "" to `text`
			}
		};
	}
</script>

<div class="mb-3 text-2xl font-bold">Typewriter effect</div>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<p transition:typewriter>The quick brown fox jumps over the lazy dog</p>
{/if}
