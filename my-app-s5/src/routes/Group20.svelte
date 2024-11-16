<!-- 27/45 -->
<!-- https://svelte.dev/tutorial/svelte/checkbox-inputs -->

<script lang="ts">
	let yes = $state(false);
</script>

<!-- //*Using checkbox input elements -->
<label>
	<input type="checkbox" bind:checked={yes} />
	Yes! Send me regular email spam
</label>

{#if yes}
	<p>Thank you. We will bombard your inbox and sell your personal details.</p>
{:else}
	<p>You must opt in to continue. If you're not paying, you're the product.</p>
{/if}

<button class="btn-primary" disabled={!yes}>Subscribe</button>

<style>
	button {
		background: orange;
		padding: 10px 20px;
	}
	button:disabled {
		background: grey;
	}
</style>
