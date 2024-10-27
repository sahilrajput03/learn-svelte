<!-- 1-5/45 -->
<script>
	import Nested from './Nested.svelte';

	let name = 'svelte';
	let src = '/image.gif';
	let string = `this string contains some <strong>HTML!!!</strong>`;
</script>

<h1>Hello {name.toUpperCase()}!</h1>

<img {src} alt="A {name} dances." />

<p>This is a paragraph.</p>

<Nested />

<p>{string}</p>
<p>{@html string}</p>

<style>
	p {
		color: goldenrod;
		font-family: 'Comic Sans MS', cursive;
	}
</style>
