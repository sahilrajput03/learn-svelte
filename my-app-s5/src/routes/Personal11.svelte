<script lang="ts">
	// URL from Chrome desktop addressbar: https://www.youtube.com/watch?v=VIDEO_ID
	// URL from right-click copying: https://youtu.be/VIDEO_ID
	// URL from share button on youtube site (Chrome Desktop): https://youtu.be/VIDEO_ID?si=oH6ZKZ7ezfv14hMd (si is probably sharing id or some recommendation suggestion id probabay (ChatGPT))

	let autoplaySuffix = '?autoplay=1&mute=1';

	// Fetched by right clicking on youtube video and clicking on 'Copy embed code' then getting the "src" from the <iframe ../> code.
	let youtubeEmbedUrl1 = 'https://www.youtube.com/embed/2f8kQSfSFvI';

	// For looping youtube embed video we need to set both `loop` and `playlist options like below`: (src: https://stackoverflow.com/a/13042891)
	let loopVideoSuffix = '&loop=1&playlist=2f8kQSfSFvI'; // ! NOTE: playlist id is same as video id

	let urlForAutoPlay = `${youtubeEmbedUrl1}${autoplaySuffix}${loopVideoSuffix}`;
	// console.log('urlForAutoPlay?', urlForAutoPlay);
</script>

<h1 class="text-2xl font-bold">Vanilla Youtube Embed with autoplay and loop</h1>

<div class="italic text-red-500 underline">
	Note: You must disable your adblocker in chrome desktop mode so that video can play otherwise
	video doesn't show up in domains like <span class="font-bold">sveltev5.vercel.app</span>
</div>

<!-- This code is fetched by right clicking on youtube video and clicking on 'Copy embed code'-->
<iframe
	width="100%"
	src={urlForAutoPlay}
	title=""
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	referrerpolicy="strict-origin-when-cross-origin"
	allowfullscreen
></iframe>

<style>
	iframe {
		height: 60vh;
	}
</style>
