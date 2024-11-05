<!-- 40/45 -->
<!-- https://svelte.dev/tutorial/svelte/in-and-out -->

<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	let visible = $state(true);
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<!-- Instead of the transition directive, an element can have an in or an out directive, or both together. -->
	<p in:fly={{ y: 200, duration: 2000 }} out:fade>Flies in, fades out</p>
{/if}
