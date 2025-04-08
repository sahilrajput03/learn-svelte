<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	// import 'plyr/dist/plyr.css';
	// import Plyr from 'plyr';
	import { browser } from '$app/environment';

	let videoRef: HTMLVideoElement;
	let player;

	// Learn: I am using cdn link to run Plyr (check app.html to know why?)
	// Plyr.js Docs/Github - https://github.com/sampotts/plyr
	let Plyr = (window as any).Plyr;

	onMount(async () => {
		// run only on client side
		if (browser) {
			player = new Plyr(videoRef);
			player.play(); // autoplay on start
			player.muted = true; // * NOTE: You must set `muted = true` if you need to autoplay on start
		}
	});
	// Not necessary though
	onDestroy(() => {
		if (player) player.destroy();
	});
	const mp4FileUrl = 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4';
</script>

<h1 class="text-2xl font-bold">Plyr.js</h1>

<div>
	Note: You must not keep video element outside because it causes some hard to find bug for me.
	(Time spend to find this 2 hours)
</div>

<div class="my-3 text-sm italic">
	(TODO: Try Video.js in future
	<a class="text-blue-400 underline" href="https://videojs.com/city">videojs.com</a>, Github:
	<a class="text-blue-400 underline" href="https://github.com/videojs/video.js">videojs/video.js</a
	>)
</div>

<!-- We can give class w-[300px] to set size on video. -->
<div class="">
	<!-- svelte-ignore a11y_media_has_caption -->
	<video bind:this={videoRef} id="player" controls>
		<source src={mp4FileUrl} type="video/mp4" />
	</video>
</div>

<style>
</style>
