<!-- 1-5/45 -->
<!-- https://svelte.dev/tutorial/svelte/your-first-component -->
<script lang="ts">
	import Nested from './Nested.svelte';

	let name = 'svelte';
	let src = '/image.gif';
	let string = `this string contains some <strong>HTML!!!</strong>`;
	console.log('(import.meta.hot as any)?.ownerPath?', (import.meta.hot as any)?.ownerPath);

	let isTouch = $state(false);
</script>

<h1>Hello {name.toUpperCase()}!</h1>

<img {src} alt="A {name} dances." />

<p>This is a paragraph.</p>

<Nested />

<p>{string}</p>
<!-- Docs of {@html ...} https://svelte.dev/docs/svelte/@html -->
<p>{@html string}</p>

<hr class="my-5" />

<div class="text-xl font-bold">Touch and Hold Feature for mobile and desktop</div>

<li>
	For mobile: `ontouchstart` and `ontouchend` only fires on mobile
	<a
		class=" text-blue-600 underline"
		href="https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events"
	>
		touch events
	</a>
</li>
<li>For desktop: `onmousedown` and `onmouseup` only fires on desktop</li>

<!-- Note: I added `role="presentation"` to fix some warning made by svelte for ARIA required. -->
<div
	class="btn-primary"
	role="presentation"
	onmousedown={() => (isTouch = true)}
	onmouseup={() => (isTouch = false)}
	ontouchstart={(event) => {
		isTouch = true;
	}}
	ontouchend={(event) => {
		console.log('boom?');
		isTouch = false;
	}}
>
	{isTouch ? 'touched' : 'Please touch me and hold'}
</div>

<style>
	p {
		color: goldenrod;
		font-family: 'Comic Sans MS', cursive;
	}
</style>
