<script>
	import { updated } from '$app/stores'; // NOTE: This is updagted to `$app/state` recently - check https://svelte.dev/tutorial/kit/updated-state
</script>

<!-- SveltKit Tutorial -->
<!-- https://svelte.dev/tutorial/kit/updated-store -->
{#if $updated}
	<div class="toast">
		<p>
			A new version of the app is available

			<button onclick={() => location.reload()}> Click here to reload the page </button>
		</p>
	</div>
{/if}

<style>
	.toast {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 1rem;
		display: flex;
		justify-content: center;
		gap: 1rem;
		/* Sahil: I added background. */
		background: hotpink;
	}

	.toast p {
		display: flex;
		align-items: center;
		gap: 1rem;
		background: transparent;
		padding: 0.5rem 0.5rem 0.5rem 1rem;
		border-radius: 4px;
	}
	/* Sahil: I added these button styles. */
	button {
		background: white;
		padding: 5px 10px;
		border-radius: 3px;
	}
</style>
