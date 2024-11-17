<script lang="ts">
	import '../app.css';
	import NewVersionAvailableToast from './NewVersionAvailableToast.svelte';
	let { children } = $props();
</script>

{@render children()}

<NewVersionAvailableToast />

<style>
	/* Sahil: `:root` is an alias for `html` */
	:root {
		margin: 20px;
	}
</style>
