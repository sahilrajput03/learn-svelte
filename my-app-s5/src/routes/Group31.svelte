<!-- 39/45 -->
<!-- https://svelte.dev/tutorial/svelte/adding-parameters-to-transitions -->

<script lang="ts">
	import { fly } from 'svelte/transition';

	let visible = $state(true);
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<!-- //* Transition functions can accept parameters. -->
	<!-- / //& Note: Autocomplete works inside the configuration object, amazing! -->
	<p transition:fly={{ y: 100, duration: 2000 }}>Fly in and out</p>
{/if}
