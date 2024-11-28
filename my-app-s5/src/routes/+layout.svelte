<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import '../app.css';
	import NewVersionAvailableToast from './NewVersionAvailableToast.svelte';

	let { children } = $props();
	let routesHistory: string[] = [];

	const handleTutorialsClick = () => {
		if ($page.url.pathname !== '/') {
			const lastTutorialPath = routesHistory.findLast((val) => val.includes('/?id='));
			if (lastTutorialPath) {
				const lastUrl = new URL(lastTutorialPath);
				goto(lastUrl.pathname + lastUrl.search);
			} else {
				goto('/');
			}
		} else {
			// do nothing when already on Tutorials page
			// alert('You are already on tutorials page.');
		}
	};

	$effect(() => {
		$page.route; // using as effect's dependency
		// Also: I tried to use `$page.route` but it seems it reflects the
		// 		 initial value at all times. Does not update dynamically.
		const path = window.location.href;
		// console.log('path?', path);

		// To prevent adding duplicate entry in a row
		if (routesHistory[routesHistory.length - 1] !== path) {
			routesHistory.push(path);
		}
	});
</script>

<div class="mt-1 flex justify-end">
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
	<div class="ml-2 text-xs">Personal:</div>
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
