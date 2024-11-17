<script lang="ts">
	import '../app.css';
	import NewVersionAvailableToast from './NewVersionAvailableToast.svelte';
	let { children } = $props();
</script>

<div class="mt-1 flex justify-end">
	<div class="ml-2 text-xs">Docs Examples:</div>
	<a class="ml-2 text-xs text-blue-600" href="/">Tutorials</a>
	<a class="ml-2 text-xs text-blue-600" href="/chat">/chat</a>
	<a class="ml-2 text-xs text-blue-600" href="/effect-root">/effect-root</a>
</div>
<div class="mb-3 mt-1 flex justify-end">
	<div class="ml-2 text-xs">Personal Examples:</div>
	<a class="ml-2 text-xs text-blue-600" href="glass-slideshow">/glass-slideshow</a>
	<a class="ml-2 text-xs text-blue-600" href="/thoughts">/thoughts</a>
</div>

{@render children()}

<NewVersionAvailableToast />

<style>
	/* Sahil: `:root` is an alias for `html` */
	:root {
		margin: 20px;
	}
</style>
