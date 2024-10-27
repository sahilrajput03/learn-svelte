<!-- This file is consumed in file://./Group17.svelte -->
<script>
	let props = $props();
</script>

<button {...props}> Click to greet. </button>

<style>
	button {
		padding: 5rem;
		background: red;
	}
</style>
