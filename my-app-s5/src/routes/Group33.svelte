<!-- 41/45 -->
<!-- https://svelte.dev/tutorial/svelte/custom-css-transitions -->

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

	let visible = $state(true);

	function spin(node: any, { duration }: any) {
		return {
			duration,
			css: (t: any) => {
				// console.log('t?', t) // we get around 150 logs printed with value `0.002 to 1`
				const eased = elasticOut(t);
				// console.log('eased?', eased) // ALERT: Adding log will cause the animation to perform bad because logging is bad for performace.

				// hsl color => 0-360 (color degree), 0-100% (greyness), 0-100% (light)
				// color degree value will go from 0 to 360
				// Math.trunc(..) removes the decimal parts
				// Math.min(...) value will go from (100, 100, 100, ... 99, 98, .., 0) because `1000 * (1-t)` goes from 1000 to 0.
				// Math.max(...) value will go from (50, 50, 50, .., 49, 48, .., 0) because `500 * (1-t)` goes from 500 to 0.
				// MORAL: Color goes from `hsl(0deg, 100%, 50%) =====> hsl(360deg, 0%, 0%)`
				return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${Math.trunc(t * 360)},
						${Math.min(100, 1000 * (1 - t))}%,
						${Math.min(50, 500 * (1 - t))}%
					);`;
			}
		};
	}
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<div class="centered" in:spin={{ duration: 8000 }} out:fade>
		<span>transitions!</span>
	</div>
{/if}

<style>
	.centered {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	span {
		position: absolute;
		transform: translate(-50%, -50%);
		font-size: 4em;
	}
</style>
