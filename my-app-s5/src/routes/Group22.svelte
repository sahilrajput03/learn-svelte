<!-- 29/45 -->
<!-- https://svelte.dev/tutorial/svelte/group-inputs -->

<script lang="ts">
	import OpenFileInVscode from './OpenFileInVscode.svelte';

	let scoops = $state(1);
	$inspect('scoops?', scoops);

	//^ Typescript: assigning type for `$state` - https://svelte.dev/docs/svelte/typescript#Typing-$state
	let flavours = $state<string[]>([]);
	$inspect('flavours?', flavours);

	// $inspect({ flavours, scoops }); //^ good
	// $inspect(flavours, scoops); //^ good

	const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
</script>

<h2>Size</h2>

{#each [1, 2, 3] as number}
	<label>
		<input type="radio" name="scoops" value={number} bind:group={scoops} />

		{number}
		{number === 1 ? 'scoop' : 'scoops'}
	</label>
{/each}

<h2>Flavours</h2>

{#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
	<label>
		<input type="checkbox" name="flavours" value={flavour} bind:group={flavours} />
		{flavour}
	</label>
{/each}

{#if flavours.length === 0}
	<p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
	<p>Can't order more flavours than scoops!</p>
{:else}
	<p>
		You ordered {scoops}
		{scoops === 1 ? 'scoop' : 'scoops'}
		of {formatter.format(flavours)}
	</p>
{/if}

<OpenFileInVscode relativeFilePath={(import.meta.hot as any)?.ownerPath} />
