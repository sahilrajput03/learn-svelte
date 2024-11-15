<script>
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
		'10jpeg',
		'11.jpg'
	];
	let index = $state(0);
	let src = $derived(imgs[index]);

	$effect(() => {
		let id = setInterval(() => {
			if (index === imgs.length - 1) {
				index = 0;
			} else {
				index++;
			}
		}, 7_000);
		return () => clearInterval(id);
	});
</script>

<img style="margin: auto;" src={`/glass-imgs/${src}`} alt="glass" />
