<!-- 43/45 -->
<!-- https://svelte.dev/tutorial/svelte/transition-events -->

<script lang="ts">
	import { fly } from 'svelte/transition';

	let visible = $state(true);
	let status = $state('waiting...');
</script>

<p>status: {status}</p>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<!-- It can be useful to know when transitions are beginning and ending.
 Svelte dispatches events that you can listen to like any other DOM event: -->
	<p
		transition:fly={{ y: 200, duration: 2000 }}
		onintrostart={() => (status = 'intro started')}
		onoutrostart={() => (status = 'outro started')}
		onintroend={() => (status = 'intro ended')}
		onoutroend={() => (status = 'outro ended')}
	>
		Flies in and out
	</p>
{/if}
