<!-- 17/45 -->
<!-- https://svelte.dev/tutorial/svelte/each-blocks  -->

<script lang="ts">
	import NotesEach from './NotesEach.svelte';

	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
	let selected = $state(colors[0]);
</script>

<h1 style="color: {selected}">Pick a colour</h1>

<div>
	<!-- Note: `i` is an index -->
	{#each colors as color, index}
		<button
			style="background: {color}"
			aria-label={color}
			{...{
				/* `aria-current` by MDN: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current */
			}}
			aria-current={selected === color}
			onclick={() => (selected = color)}
		>
			{index + 1}
		</button>
	{/each}
</div>

<NotesEach />

<style>
	h1 {
		transition: color 0.2s;
	}

	div {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-gap: 5px;
		max-width: 400px;
	}

	button {
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color, #fff);
		transform: translate(-2px, -2px);
		filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2));
		transition: all 0.1s;
	}

	button[aria-current='true'] {
		transform: none;
		filter: none;
		box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.2);
	}
</style>
