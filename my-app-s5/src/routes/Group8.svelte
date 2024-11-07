<!-- 15/45 -->
<!-- https://svelte.dev/tutorial/svelte/else-blocks -->

<script lang="ts">
	let count = $state(0);

	function increment() {
		count += 1;
	}
</script>

<button class="btn-primary" onclick={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

{#if count > 10}
	<p>{count} is greater than 10</p>
{:else}
	<p>{count} is between 0 and 10</p>
{/if}
