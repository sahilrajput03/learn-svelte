<script lang="ts">
	let form = $state({
		// offers: [] as string[]
		offers: ['offer 1', 'offer 2'] as string[]
	});
	$inspect(form.offers);
</script>

<pre>{JSON.stringify(form, null, 2)}</pre>

{#each form.offers as offer, i}
	<div class="mb-3 flex">
		<input
			class="me-3 w-full rounded-md border border-gray-400 px-2 py-1"
			bind:value={form.offers[i]}
		/>
		<button class="ms-[5px]" onclick={() => form.offers.splice(i, 1)}>❌</button>
	</div>
{/each}
<button class="rounded-md border border-black px-3 py-1" onclick={() => form.offers.push('')}
	>+ Add {form.offers.length === 0 ? '' : 'another'} offer</button
>
