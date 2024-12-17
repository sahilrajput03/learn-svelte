<script>
	//! NOTE: For implementation in new projects please check https://svelte.dev/tutorial/kit/updated-state
	// Because: 1. import path is changed to `$app/state`
	// 			2. $updated is changed to `updated.current`
	import { updated } from '$app/stores';
</script>

<!-- SveltKit Tutorial -->
<!-- https://svelte.dev/tutorial/kit/updated-store -->
{#if $updated}
	<div class="toast">
		<p>
			<span class="text-white"> A new version of the app is available </span>
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
