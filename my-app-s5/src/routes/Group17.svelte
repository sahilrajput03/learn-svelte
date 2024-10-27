<!-- 24/45 -->
<!-- https://svelte.dev/tutorial/svelte/spreading-events -->

<script>
	import BigRedButton from './BigRedButton.svelte';
	const greet = () => {
		alert('Hi!');
	};
</script>

<BigRedButton onclick={greet} />
