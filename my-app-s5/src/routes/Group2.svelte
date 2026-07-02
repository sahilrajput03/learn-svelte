<!-- 6-9/45 -->
<!-- https://svelte.dev/tutorial/svelte/state -->

<script lang="ts">
	import { onMount } from 'svelte';
	import source from './Group2.svelte?raw';
	import { codeToHtml } from 'shiki';
	import { shikiThemes } from '$lib/shiki-utils';
	import { sleep } from '$lib/time-utils';

	let html = $state('');
	let themeName = $state('');
	let themeIndex = $state();

	// ❤️ My Notes of Shiki:
	// https://docs.google.com/document/d/1OgimIPsmCXVlR2B6HI3YSbkDGqyYGwhaCpqOToeKSJg

	onMount(async () => {
		// Docs: Supported Langs: https://shiki.style/languages
		const lang = 'svelte'; // Eg., 'js', 'svelte', etc.
		// html = await codeToHtml(source, { lang: lang, theme: 'nord'  })

		// Checking out different themes from shikiThemes array
		while (true) {
			for (let i = 0; i < shikiThemes.length; i++) {
				themeIndex = i;
				const element = shikiThemes[i];
				html = await codeToHtml(source, { lang: lang, theme: element.id });
				themeName = element.name;
				await sleep(2_000);
			}
		}
	});

	// Rune
	let count = $state(0);
	function increment() {
		count++;
	}

	let numbers = $state([1, 2, 3, 4]);
	let total = $derived(numbers.reduce((t, n) => t + n, 0));

	let users = $state([
		{ name: 'Alice', age: '27' },
		{ name: 'Bob', age: '33' }
	]);

	function addNumber() {
		// numbers[numbers.length] = numbers.length + 1; // state reacts to `reassignments`
		count++; // to test multiple state printing with `$state.snapshot(...)`

		numbers.push(numbers.length + 1); // state also reacts to  `deep reactivity`
		// console.log('numbers?', numbers); //* prints but with warning to avoid using it

		//* Docs - https://svelte.dev/docs/svelte/$state#$state.snapshot
		// ^ Will log `[ ... ]` rather than `Proxy [ ... ]`

		// & snapshot is awesome but `$inspect` is love.
		// console.log('numbers?', $state.snapshot(numbers));
		// ~ Note: `$state.snapshot()` requires exactly one argument
		// but we can pass multiple states in a single object like
		// that
		// console.log('numbers,total,count?', $state.snapshot({ count, numbers, total }));

		// primitive, thus it is is okay and svelte doesn't throw any warning in console
		console.log('numbers[0]?', numbers[0]);

		// Note: Trying to print `users[0]` directly with console log
		// 		throws warning and suggests to use either `$inspect()` or
		// 		`$state.snapshot(..)` inside console.log because you are
		// 		trying to print a proxy.
		// console.log('users[0]?', users[0]); // ❌

		// Learn: Correct way to print a state object (proxy).
		console.log('users[0]?', $state.snapshot(users[0])); // ✅
	}

	//* Docs - https://svelte.dev/docs/svelte/$inspect
	//& Way to log to console whenever `numbers` change.
	// $inspect('numbers?', numbers);
	//^ Note: we can add multiple states in here as well.
	// $inspect('numbers?', numbers, "count?", count); //~ awesome
	// $inspect({numbers, count}); //~ awesome

	//& To customize log style of `$inspect`
	// $inspect('numbers?', numbers).with((type, a1, a2) => {
	// 	console.log('a,b,c?', type, a1, a2); // 'type' is always 'init' or 'update'
	// });
</script>

<button class="btn-primary" onclick={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

<hr />

<p>{numbers.join(' + ')} = {total}</p>

<button class="btn-primary" onclick={addNumber}> Add a number & increase click count </button>

<pre>
{JSON.stringify(numbers, null, 2)}
</pre>

<div style="margin-top: 30px;"></div>

<h1 style="font-weight: bold">{themeIndex} {themeName}</h1>
{@html html}

<style>
	hr {
		margin: 50px;
	}
</style>
