<script lang="ts">
	let autoplayPrefix = '?autoplay=1&mute=1';

	// Fetched by right clicking on youtube video and clicking on 'Copy embed code' then getting the "src" from the <iframe ../> code.
	let youtubeEmbedUrl1 = 'https://www.youtube.com/embed/2f8kQSfSFvI';

	let urlForAutoPlay = `${youtubeEmbedUrl1}${autoplayPrefix}`;
	// console.log('urlForAutoPlay?', urlForAutoPlay);
</script>

<h1 class="text-2xl font-bold">Vanilla Youtube Embed with autoplay</h1>

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
