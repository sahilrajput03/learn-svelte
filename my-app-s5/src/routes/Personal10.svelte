<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	// import 'plyr/dist/plyr.css';
	// import Plyr from 'plyr';
	import { browser } from '$app/environment';

	let videoRef: HTMLVideoElement;
	let player;
	let player2;

	// Learn: I am using cdn link to run Plyr (check app.html to know why?)
	// Plyr.js Docs/Github - https://github.com/sampotts/plyr
	let Plyr = (window as any).Plyr;

	onMount(async () => {
		// run only on client side
		if (browser) {
			player = new Plyr('#player');
			player.muted = true; // * NOTE: You must set `muted = true` if you need to autoplay on start
			// For autoplay its necessary to play video inside 'ready' event for a youtube video (src: https://github.com/sampotts/plyr/issues/1185#issuecomment-433681263)
			player.on('ready', () => {
				player.play();
			});

			// for player2 (for testing)
			player2 = new Plyr('#player2');
			player2.muted = true; // * NOTE: You must set `muted = true` if you need to autoplay on start
			// For autoplay its necessary to play video inside 'ready' event for a youtube video (src: https://github.com/sampotts/plyr/issues/1185#issuecomment-433681263)
			player2.on('ready', () => {
				player2.play();
			});
		}
	});
	// Not necessary though
	onDestroy(() => {
		if (player) player.destroy();
		if (player2) player2.destroy();
	});
	// const mp4FileUrl = 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4';

	// Learn: Direct video link from youtube doesn't work.
	// const mp4FileUrl =
	// 	'https://www.youtube.com/watch?v=DKj5m9cSMZs&list=PLBfwD_NnDB3rgyp4ZmGtHDPNkf78o-shP';

	// By getting embed code from youtube
	// <iframe width="919" height="517" src="" title="Nadiyon Paar (Let the Music Play) – Roohi | Janhvi | Sachin-Jigar | Rashmeet, Shamur, IP Singh" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

	// Stock video from plyr.js
	const mp4FileUrl =
		'https://www.youtube.com/embed/bTqVqk7FSmY?origin=https://plyr.io&iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1';

	// Direct video link from youtube from url bar
	const mp4FileUrl2 =
		'https://www.youtube.com/watch?v=5h0Upn8RdGo&list=PLBfwD_NnDB3rgyp4ZmGtHDPNkf78o-shP&index=3';

	// Direct video link from youtube from url bar
	const mp4FileUrl3 =
		'https://www.youtube.com/watch?v=k7QniTYNsmQ&list=PLBfwD_NnDB3rgyp4ZmGtHDPNkf78o-shP&index=2';
</script>

<h1 class="text-2xl font-bold">Plyr.js</h1>

<div>
	Note: You must not keep video element outside because it causes some hard to find bug for me.
	(Time spend to find this 2 hours)
</div>

<!-- We can give class w-[300px] to set size on video. -->
<div class="">
	<div id="player">
		<iframe
			title="YouTube video player"
			width="100%"
			src={mp4FileUrl2}
			allowfullscreen
			allowtransparency
			allow="autoplay"
		></iframe>
	</div>

	<!-- <div id="player2">
		<iframe
			title="YouTube video player"
			width="100%"
			src={mp4FileUrl3}
			allowfullscreen
			allowtransparency
			allow="autoplay"
		></iframe>
	</div> -->
</div>

<style>
	iframe {
		height: 80vh;
	}
</style>
