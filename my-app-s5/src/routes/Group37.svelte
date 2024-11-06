<!-- 45/45 -->
<!-- https://svelte.dev/tutorial/svelte/key-blocks -->

<script lang="ts">
	import { typewriter } from './transition';
	import { messages } from './loading-messages';

	let i = $state(-1);

	$effect(() => {
		const interval = setInterval(() => {
			i += 1;
			i %= messages.length;
		}, 2500);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<p class="text-green-500">
	Key blocks destroy and recreate their contents when the value of an expression changes. This is
	useful if you want an element to play its transition whenever a value changes instead of only when
	the element enters or leaves the DOM.
</p>

<p class="mb-10 text-purple-500">
	We’d like to play the typewriter transition from transition.js whenever the loading message, i.e.
	i changes. Wrap the {'<p></p>'} element in a key block:
</p>

<h1>loading...</h1>

{#key i}
	<p in:typewriter={{ speed: 10 }}>
		{messages[i] || ''}
	</p>
{/key}

Value of i: {i}
