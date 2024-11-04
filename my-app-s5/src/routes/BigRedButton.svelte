<!-- This file is consumed in file://./Group17.svelte -->
<script lang="ts">
	let props = $props();
</script>

<button {...props} class="border border-solid border-[black] px-[5px] py-0.5">
	Click to greet.
</button>

<style>
	button {
		padding: 5rem;
		background: red;
	}
</style>
