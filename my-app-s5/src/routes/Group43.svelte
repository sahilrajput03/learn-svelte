<!-- 51/75 -->
<!-- https://svelte.dev/tutorial/svelte/passing-snippets -->

<script lang="ts">
	import FilteredList from './FilteredList.svelte';
	import { colors, type ColorType } from './data2';
</script>

<!-- Tip: you can get type of `header` and `row` by hovering over them: -->
<FilteredList data={colors} field="name" {header} {row}></FilteredList>

<!-- Snippet definition -->
{#snippet header()}
	<header>
		<span class="color"></span>
		<span class="name">name</span>
		<span class="hex">hex</span>
		<span class="rgb">rgb</span>
		<span class="hsl">hsl</span>
	</header>
{/snippet}

<!-- Snippet definition -->
{#snippet row(d: ColorType)}
	<div class="row">
		<span class="color" style="background-color: {d.hex}"></span>
		<span class="name">{d.name}</span>
		<span class="hex">{d.hex}</span>
		<span class="rgb">{d.rgb}</span>
		<span class="hsl">{d.hsl}</span>
	</div>
{/snippet}

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
