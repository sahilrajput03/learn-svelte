<script lang="ts">
	import { goto, pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import '../app.css';
	import NewVersionAvailableToast from './NewVersionAvailableToast.svelte';
	let { children } = $props();

	const handleTutorialsClick = () => {
		if ($page.url.pathname !== '/') {
			goto('/');
		} else {
			// do nothing when already on Tutorials page
			// alert('You are already on tutorials page.');
		}
	};
</script>

<div class="mt-1 flex justify-end">
	<div class="ml-2 text-xs">Docs Examples:</div>
	<!-- Note: 
		1. When user is on /any_other_page, then I redirect it to `/`
		2. When user is on /?id=id1, then I redirect it to its own url,
		   otherwise I'm experience a bug i.e., url is updated to `/`
		   rather than the currently selected component_id as query
		   params.)
	-->
	<button class=" ml-2 text-xs text-blue-600" onclick={handleTutorialsClick}>TutorialsFirst</button>
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
