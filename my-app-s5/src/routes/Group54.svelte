<!-- 62/75 -->
<!-- https://svelte.dev/tutorial/svelte/component-this -->

<script lang="ts">
	import Canvas from './Canvas2.svelte';

	import { trapFocus } from './actions.svelte';

	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white', 'black'];

	let selected = $state(colors[0]);
	let size = $state(10);
	let showMenu = $state(true);

	let offsetFromTop = '120px'; // this it to distance component's ui from overlapping the global `component-selector` select menu in `+page.svelte` file

	// Sahil: I have types it like above to get component instance handler like `canvas.clear()`.
	let canvas: ReturnType<typeof Canvas>;
</script>

<!-- Sahil: I changed `container` to `my-container` because tailwind's `container` class's media-query inflicts here and thus mouse cursor is positioned while painting has an offset towards right.-->
<div class="my-container">
	<Canvas bind:this={canvas} color={selected} {size} />

	{#if showMenu}
		<div
			role="presentation"
			class="modal-background"
			onclick={(event) => {
				if (event.target === event.currentTarget) {
					showMenu = false;
				}
			}}
			onkeydown={(e) => {
				if (e.key === 'Escape') {
					showMenu = false;
				}
			}}
		>
			<!-- //* We add action function to the menu HTML element with the `use:` directive: -->
			<div class="menu" use:trapFocus>
				<div class="colors">
					{#each colors as color}
						<button
							class="color"
							aria-label={color}
							aria-current={selected === color}
							style="--color: {color}"
							onclick={() => {
								selected = color;
							}}
						></button>
					{/each}
				</div>

				<label>
					Brush Radius: small
					<input type="range" bind:value={size} min="1" max="50" />
					large
				</label>
			</div>
		</div>
	{/if}

	<div class="controls">
		<button class="show-menu" onclick={() => (showMenu = !showMenu)}>
			{showMenu ? 'close' : 'menu'}
		</button>

		<button onclick={() => canvas.clear()}> clear </button>
	</div>
</div>

<style>
	.my-container {
		position: fixed;
		left: 0;
		/* Sahil */
		top: offsetFromTop;
		width: 100%;
		height: 100%;
		/* outline: 2px solid greenyellow; */
	}

	.controls {
		position: absolute;
		left: 0;
		top: 0;
		padding: 1em;
	}

	.show-menu {
		width: 5em;
	}

	.modal-background {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		left: 0;
		/* Sahil */
		top: offsetFromTop;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(20px);
		/* outline: 2px solid blue; */
	}

	.menu {
		position: relative;
		background: var(--bg-2);
		width: calc(100% - 2em);
		max-width: 28em;
		padding: 1em 1em 0.5em 1em;
		border-radius: 1em;
		box-sizing: border-box;
		user-select: none;
	}

	.colors {
		display: grid;
		align-items: center;
		grid-template-columns: repeat(9, 1fr);
		grid-gap: 0.5em;
	}

	.color {
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color, #fff);
		transform: none;
		filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2));
		transition: all 0.1s;
	}

	.color[aria-current='true'] {
		transform: translate(1px, 1px);
		filter: none;
		box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.2);
	}

	.menu label {
		display: flex;
		width: 100%;
		margin: 1em 0 0 0;
	}

	.menu input {
		flex: 1;
	}
</style>
