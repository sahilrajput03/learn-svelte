<script lang="ts">
	import { goto } from '$app/navigation';
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

	// TODO: Record entreis to an external store such that when browser back
	// button is pressed I can access the most recent home route along with
	// its id for e.g., `http://localhost:5173/?id=ebasd..` and when ever I
	// press tutorials link I should instead get back to the most recent
	// component which was rendered so its a magical experience if you're
	// showing a thing to anybody and just moving around and you don't mess
	// up going to the very first tutorial when are expect the tutorials page
	// to show the last component.
	$effect(() => {
		$page.route; // using as effect's dependency
		console.log('window.location.href?', window.location.href); // Also: I tried to use $page.route but it seems it reflects the initial value at all times. Does not update dynamically.
	});
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
	<button class=" ml-2 text-xs text-blue-600" onclick={handleTutorialsClick}>Tutorials</button>
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
