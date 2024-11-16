<script>
	import { fade } from 'svelte/transition';

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
	let playing = $state(true);
	let index = $state(0);

	$effect(() => {
		let id = setInterval(() => {
			if (!playing) return;

			if (index === imgs.length - 1) {
				index = 0;
			} else {
				index++;
			}
		}, 7_000);
		return () => clearInterval(id);
	});

	const next = () => {
		if (index === imgs.length - 1) {
			index = 0;
		} else {
			index += 1;
		}
	};
	const previous = () => {
		if (index === 0) {
			index = imgs.length - 1;
		} else {
			index -= 1;
		}
	};
</script>

<!-- For debugging only -->
<!-- {index} -->

<!-- Note: Key is used to trigger transition on change on `index` (Group37.svelte) -->
{#key index}
	<img transition:fade class="center" src={`/glass-imgs/${imgs[index]}`} alt="glass" />
{/key}

<div class="button-container">
	<button onclick={previous}>Previous</button>
	<button onclick={() => (playing = !playing)}>{playing ? 'Pause' : 'Play'}</button>
	<button onclick={next}>Next</button>
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
