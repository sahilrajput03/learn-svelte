<!-- 1-5/45 -->
<!-- https://svelte.dev/tutorial/svelte/your-first-component -->
<script lang="ts">
	import Nested from './Nested.svelte';

	let name = 'svelte';
	let src = '/image.gif';
	let string = `this string contains some <strong>HTML!!!</strong>`;
	console.log('(import.meta.hot as any)?.ownerPath?', (import.meta.hot as any)?.ownerPath);
</script>

<h1>Hello {name.toUpperCase()}!</h1>

<img {src} alt="A {name} dances." />

<p>This is a paragraph.</p>

<Nested />

<p>{string}</p>
<!-- Docs of {@html ...} https://svelte.dev/docs/svelte/@html -->
<p>{@html string}</p>

<style>
	p {
		color: goldenrod;
		font-family: 'Comic Sans MS', cursive;
	}
</style>
