<!-- 55/75 -->
<!-- https://svelte.dev/tutorial/svelte/springs -->

<script>
	import { spring } from 'svelte/motion';

	let coords = spring(
		{ x: 50, y: 50 },
		{
			stiffness: 0.1,
			damping: 0.25
		}
	);
	let size = spring(10);
</script>

<div class="relative h-[400px] border-2">
	<svg
		onmousemove={(e) => {
			coords.set({ x: e.clientX, y: e.clientY });
		}}
		onmousedown={() => size.set(30)}
		onmouseup={() => size.set(10)}
		role="presentation"
	>
		<!-- //* Note from Sahil: I am adding subtracting 180px to match with the contaier's distance from top edge of the window.  -->
		<circle cx={$coords.x} cy={$coords.y - 180} r={$size} />
	</svg>

	<div class="controls">
		<label>
			<h3>stiffness ({coords.stiffness})</h3>
			<input bind:value={coords.stiffness} type="range" min="0.01" max="1" step="0.01" />
		</label>

		<label>
			<h3>damping ({coords.damping})</h3>
			<input bind:value={coords.damping} type="range" min="0.01" max="1" step="0.01" />
		</label>
	</div>
</div>

<style>
	svg {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}

	circle {
		fill: #ff3e00;
	}

	.controls {
		position: absolute;
		top: 0px;
		right: 1em;
		width: 200px;
		user-select: none;
	}

	.controls input {
		width: 100%;
	}
</style>
