<!-- This file is consumed in file://./Group61.svelte -->

<script lang="ts">
	import { getContext } from 'svelte';

	type PropsType = { x: number; y: number; size: number; rotate: number };
	let { x, y, size, rotate }: PropsType = $props();

	getContext<any>('canvas').addItem(draw);

	function draw(ctx: any) {
		ctx.save();

		ctx.translate(x, y);
		ctx.rotate(rotate);

		ctx.strokeStyle = 'black';
		ctx.strokeRect(-size / 2, -size / 2, size, size);

		ctx.restore();
	}
</script>
