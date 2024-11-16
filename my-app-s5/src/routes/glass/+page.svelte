<script>
	import { fade } from 'svelte/transition';
	import { createSlideShow } from '../actions.svelte';

	const imgs = [
		'1.jpg',
		'2.jpg',
		'3.jpg',
		'4.jpg',
		'5.jpg',
		'6.jpg',
		'7.jpg',
		'8.webp',
		'9.jpg',
		'10.jpeg',
		'11.jpg'
	];
	let slideShow = createSlideShow({ numberOfImages: imgs.length, interval: 7_000 });

	// NOTE: This doesn't work in svelte (TESTED)
	// { index, playing, next, previous } = createSlideShow(imgs);
</script>

<!-- For debugging only -->
<!-- {ss.index} -->

<!-- Note: Key is used to trigger transition on change on `index` (Group37.svelte) -->
{#key slideShow.index}
	<img transition:fade class="center" src={`/glass-imgs/${imgs[slideShow.index]}`} alt="glass" />
{/key}

<div class="button-container">
	<button onclick={slideShow.previous}>Previous</button>
	<button onclick={slideShow.playPause}>{slideShow.playing ? 'Pause' : 'Play'}</button>
	<button onclick={slideShow.next}>Next</button>
</div>

<style>
	.button-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		margin-right: 5px;

		position: absolute;
		right: 0;
		top: 50%;
		transform: translate(0, 100%);
	}
	button {
		border: 2px solid black;
		border-radius: 8px;
		padding: 5px 10px;
		background: white;
	}
	img {
		max-height: 100vh;
	}

	.center {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
