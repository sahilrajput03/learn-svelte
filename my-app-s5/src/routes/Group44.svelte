<!-- 52/75 -->
<!-- https://svelte.dev/tutorial/svelte/implicit-snippet-props -->

<script lang="ts">
	import FilteredList2 from './FilteredList2.svelte';
	import { colors } from './data2';
</script>

<FilteredList2 data={colors} field="name">
	<!-- Any content inside a component that is not part of a
	declared snippet becomes a special children snippet. Since
	header has no parameters, we can turn it into children by
	removing the block tags...
	...and renaming the header prop to children on the component side too: -->
	<header>
		<span class="color"></span>
		<span class="name">name</span>
		<span class="hex">hex</span>
		<span class="rgb">rgb</span>
		<span class="hsl">hsl</span>
	</header>

	{#snippet row(d)}
		<div class="row">
			<span class="color" style="background-color: {d.hex}"></span>
			<span class="name">{d.name}</span>
			<span class="hex">{d.hex}</span>
			<span class="rgb">{d.rgb}</span>
			<span class="hsl">{d.hsl}</span>
		</div>
	{/snippet}
</FilteredList2>

<style>
	header,
	.row {
		display: grid;
		align-items: center;
		grid-template-columns: 2em 4fr 3fr;
		gap: 1em;
		padding: 0.1em;
		background: var(--bg-1);
		border-radius: 0.2em;
	}

	header {
		font-weight: bold;
	}

	.row:hover {
		background: var(--bg-2);
	}

	.color {
		aspect-ratio: 1;
		height: 100%;
		border-radius: 0.1em;
	}

	.rgb,
	.hsl {
		display: none;
	}

	@media (min-width: 40rem) {
		header,
		.row {
			grid-template-columns: 2em 4fr 3fr 3fr;
		}

		.rgb {
			display: block;
		}
	}

	@media (min-width: 60rem) {
		header,
		.row {
			grid-template-columns: 2em 4fr 3fr 3fr 3fr;
		}

		.hsl {
			display: block;
		}
	}
</style>
