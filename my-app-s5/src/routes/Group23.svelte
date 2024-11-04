<!-- 30/45 -->
<!-- https://svelte.dev/tutorial/svelte/multiple-select-bindings -->

<!-- Select with `multiple` -->

<script lang="ts">
	import OpenFileInVscode from './OpenFileInVscode.svelte';

	let scoops = $state(1);
	$inspect('scoops?', scoops);

	let flavours: string[] = $state([]);
	$inspect('flavours?', flavours);

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

<br />
<br />

<u><h2>Flavours</h2></u>

<i class="text-sm text-gray-600"> You can select one or more items from below. </i>

<br />

<!-- Note: We are allowing `multiple` values to be selected by passing `multiple` property. -->
<select multiple bind:value={flavours}>
	{#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
		<!-- Note that we’re able to omit the value attribute on the <option> as the value is identical to the element’s contents. -->
		<option>{flavour}</option>
	{/each}
</select>

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
