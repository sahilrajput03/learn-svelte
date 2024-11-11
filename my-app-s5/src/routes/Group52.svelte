<!-- 60/75 -->
<!-- https://svelte.dev/tutorial/svelte/bind-this -->

<script lang="ts">
	import { paint } from './gradient';

	let canvas: HTMLCanvasElement;

	$effect(() => {
		const context = canvas.getContext('2d');

		let frame = requestAnimationFrame(function loop(t) {
			frame = requestAnimationFrame(loop);
			paint(context, t);
		});

		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>

<p class="font-bold text-orange-600">
	Note that the value of canvas will remain <code>undefined</code> until the component has mounted —
	in other words you can’t access it until the $effect runs. Source:
	<a class="text-blue-700" href="https://svelte.dev/docs/svelte/$effect">Docs - $effect()</a>
</p>

<div style="width: 200px;">
	<canvas bind:this={canvas} width={32} height={32}></canvas>
</div>

<style>
	canvas {
		/* From Sahil: I added `z-index: -1;` so that it makes the element
        behind the component-selector buttons and I can use those buttons
        otherwise the canvas doesn't allow me to click those buttons
        because of z-index issue. */
		z-index: -1;
		position: fixed;
		left: 0;
		top: 100px;
		width: 100%;
		height: 100%;
		background-color: #666;
		mask: url(./svelte-logo-mask.svg) 50% 50% no-repeat;
		mask-size: 60vmin;
		-webkit-mask: url(./svelte-logo-mask.svg) 50% 50% no-repeat;
		/* -webkit-mask-size: 60vmin; */
		/* From Sahil: I made it smaller so it doesn't take too much screen size on desktop. */
		-webkit-mask-size: 30vmin;
	}
</style>
