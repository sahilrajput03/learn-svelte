Native HTML5 Video Element

<!-- svelte-ignore a11y_media_has_caption -->
<video id="player" playsinline controls data-poster="/path/to/poster.jpg">
	<source
		src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
		type="video/mp4"
	/>
	<!-- <source src="/path/to/video.webm" type="video/webm" /> -->

	<!-- Captions are optional -->
	<!-- <track
		kind="captions"
		label="English captions"
		src="/path/to/captions.vtt"
		srclang="en"
		default
	/> -->
</video>
