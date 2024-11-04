<!-- 48/75 -->
<!-- https://svelte.dev/tutorial/svelte/getters-and-setters -->

<script lang="ts">
	import OpenFileInVscode from './OpenFileInVscode.svelte';

	const MAX_SIZE = 200;

	class Box {
		#width = $state(0);
		#height = $state(0);
		area = $derived(this.#width * this.#height);

		constructor(width: number, height: number) {
			this.#width = width;
			this.#height = height;
		}

		get width() {
			return this.#width;
		}

		get height() {
			return this.#height;
		}

		// Tutorial: It’s now impossible to increase the box size past safe limits,
		// whether through the bind:value on the range inputs, or the embiggen
		// method, no matter how hard you press the button.
		set width(value) {
			this.#width = Math.max(0, Math.min(MAX_SIZE, value));
		}

		set height(value) {
			this.#height = Math.max(0, Math.min(MAX_SIZE, value));
		}

		embiggen(amount: number) {
			this.width += amount;
			this.height += amount;
		}
	}

	const box = new Box(100, 100);
</script>

<label>
	<input type="range" bind:value={box.width} min={0} max={MAX_SIZE} />
	{box.width}
</label>

<label>
	<input type="range" bind:value={box.height} min={0} max={MAX_SIZE} />
	{box.height}
</label>

<button class="btn-primary" onclick={() => box.embiggen(10)}>embiggen</button>

<hr />

<div class="box" style:width="{box.width}px" style:height="{box.height}px">
	{box.area}
</div>

<OpenFileInVscode relativeFilePath={(import.meta.hot as any)?.ownerPath} />

<style>
	label {
		display: flex;
		align-items: center;
	}

	hr {
		margin: 1em 0;
		border: none;
		border-bottom: 1px solid #888;
	}

	.box {
		background: radial-gradient(at 25% 25%, hsl(15 100 60), hsl(15 100 50));
		border-radius: 2px;
		filter: drop-shadow(0 0 10px hsl(15 100 50 / 0.3));
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
</style>
