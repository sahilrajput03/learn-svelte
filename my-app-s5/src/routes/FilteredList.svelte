<!-- This file is consumed in file://./Group43.svelte -->
<script lang="ts">
	import type { colors, ColorType } from './data2';
	import type { Snippet } from 'svelte';

	type PropsType = {
		data: typeof colors;
		field: keyof ColorType;
		header: Snippet;
		row: Snippet<[ColorType]>;
	};
	let { data, field, header, row }: PropsType = $props();

	let search = $state('');

	let filtered = $derived.by(() => {
		if (search === '') return data;

		const regex = new RegExp(search, 'i');
		return data?.filter((d) => regex.test(d[field]));
	});
</script>

<div class="list">
	<label>
		Filter: <input bind:value={search} />
	</label>

	<div class="header">
		<!-- Snippet rendering -->
		{@render header()}
	</div>

	<div class="content">
		{#each filtered as d}
			<!-- Snippet rendering -->
			{@render row(d)}
		{/each}
	</div>
</div>

<style>
	input {
		border: 1px solid black;
	}

	.list {
		display: flex;
		flex-direction: column;
		height: 100%;
		margin: 20px;
		color: white;
	}
	label {
		color: black;
	}

	.header {
		margin-top: 20px;
		border-top: 1px solid var(--bg-2);
		padding: 0.2em 0;
	}

	.content {
		flex: 1;
		overflow: auto;
		padding-top: 0.5em;
		border-top: 1px solid var(--bg-2);
	}
</style>
