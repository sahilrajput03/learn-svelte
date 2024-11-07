<!-- This file is consumed in file://./Group61.svelte -->
<script lang="ts">
	import { setContext } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';

	type PropsType = { width: number; height: number; children: Function };
	let { width = 100, height = 100, children }: PropsType = $props();

	let canvas: any;
	let items = new SvelteSet();

	setContext('canvas', { addItem });

	function addItem(fn: any) {
		$effect(() => {
			items.add(fn);
			return () => items.delete(fn);
		});
	}

	$effect(() => {
		const ctx = canvas.getContext('2d');

		ctx.clearRect(0, 0, width, height);
		items.forEach((fn: any) => fn(ctx));
	});
</script>

<canvas bind:this={canvas} {width} {height}>
	{@render children()}
</canvas>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
