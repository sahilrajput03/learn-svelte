<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import '../app.css';
	import { idOfComponentToShow } from './+page.svelte';
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
	function shareToFriend() {
		if (navigator.share) {
			navigator
				.share({
					title: 'Check this out!',
					text: 'Interesting link for you:',
					url: window.location.href
				})
				.catch(console.error);
		} else {
			alert('Sharing not supported on this device. Please contact developer for more info.');
		}
	}
</script>

<div class="my-[10px] flex flex-wrap items-baseline gap-2">
	<!-- Note: 
		1. When user is on /any_other_page, then I redirect it to `/`
		2. When user is on /?id=id1, then I redirect it to its own url,
		   otherwise I'm experience a bug i.e., url is updated to `/`
		   rather than the currently selected component_id as query
		   params.)
	-->
	<button class=" ml-2 text-xs text-blue-600" onclick={handleTutorialsClick}>tutorials</button>
	<a class="ml-2 text-xs text-blue-600" href="/chat">/chat</a>
	<a class="ml-2 text-xs text-blue-600" href="/effect-root">/effect-root</a>
	<a class="ml-2 text-xs text-blue-600" href="glass-slideshow">/glass-slideshow</a>
	<a class="ml-2 text-xs text-blue-600" href="/thoughts">/thoughts</a>
	<a class="ml-2 text-xs text-blue-600" href="/read-along">/read-along</a>
	<a
		onclick={() => (idOfComponentToShow.value = '15f7992e-886b-4bbb-af20-2ff0a3d41831')}
		class="ml-2 text-xs text-blue-600"
		href="/?id=15f7992e-886b-4bbb-af20-2ff0a3d41831">/Personal1</a
	>
	<a class="ml-2 rounded-sm bg-pink-400 p-1 text-xs text-white" href="/webrtc-demo">/webrtc-demo</a>
	<a class="ml-2 rounded-sm bg-pink-400 p-1 text-xs text-white" href="/webrtc-watch-together"
		>/webrtc-watch-together</a
	>
	<a class="ml-2 rounded-sm bg-pink-400 p-1 text-xs text-white" href="/ai-sdk">/ai-sdk</a>
	<a class="ml-2 rounded-sm bg-red-700 p-1 text-xs text-white" href="/ai-sdk-old">/ai-sdk-old</a>
	<a class="ml-2 rounded-sm bg-pink-400 p-1 text-xs text-white" href="/tts-and-stt">/tts-and-stt</a>
	<a
		target="_blank"
		onclick={() => (idOfComponentToShow.value = '15f7992e-886b-4bbb-af20-2ff0a3d41831')}
		class="ml-2 text-[0.625rem] text-blue-600"
		href="https://browser-for-terminal.vercel.app">browser-for-terminal🔗</a
	>
	<a
		target="_blank"
		onclick={() => (idOfComponentToShow.value = '15f7992e-886b-4bbb-af20-2ff0a3d41831')}
		class="ml-2 text-[0.625rem] text-blue-600"
		href="https://tailwind-plugins-demo.vercel.app">tailwind-plugins🔗</a
	>
	<button class="rounded-lg border px-2 py-1 text-xs" onclick={shareToFriend}
		>Share to a friend</button
	>
</div>

{@render children()}

<NewVersionAvailableToast />

<style>
	/* Sahil: `:root` is an alias for `html` */
	:root {
		/* We must set bottom margin AND padding to 0px on html element
		otherwise it causes issues with the chat input box  while typing
		on mobile android (TESTED). */
		margin: 0px 20px;
	}
</style>
