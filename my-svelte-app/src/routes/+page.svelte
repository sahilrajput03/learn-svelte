<script>
	import Dynamic from './Dynamic.svelte';
	import Listeners from './Listeners.svelte';
	import LogicalMarkup from './LogicalMarkup.svelte';
	import MagicalAwait from './MagicalAwait.svelte';

	let name = 'world';
	let src = 'pika.gif';
	let pokemon_name = 'pikachu';

	import Nested from './Nested.svelte';
	import Reactiveness from './Reactiveness.svelte';

	let string = `This string contains some <strong>HTML!!!</strong>`; // Svelte doesn't perform any sanitization of the expression inside {@html ...} before it gets inserted into the DOM. In other words, if you use this feature it's critical that you manually escape HTML that comes from sources you don't trust, otherwise you risk exposing your users to XSS attacks.

	let count = 0;
	function incrementCount() {
		count += 1;
	}

	// Reactive Declarations
	$: doubled = count * 2; // We're trying to mimic the situations when we need to reference one reactive values in other reactive values.

	//  We can also run arbitrary statements reactively
	// way 1
	$: console.log('the count is ' + count); // This log is run whenever count value is changed.
	// way 2
	$: {
		if (count === 3) {
			alert("You're at: " + count);
		}
	}
	$: if (count >= 5) {
		alert('count is dangerously high! We resetted it to 1');
		count = 1;
	}

	// Using spread props to pass all props as single object
	let myProps = {
		answer: 42,
		skyColor: 'orange',
		customMessage: ['Hello', 'world!']
	};

	import Thing from './Thing.svelte';
	let things = [
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' }
	];
	function handleClick() {
		things = things.slice(1);
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p>Hello {name.toUpperCase()}!</p>

<img {src} alt={pokemon_name} />

<br />

<!-- HTLM tags -->
<p>{@html string}</p>

<!-- Component api: https://svelte.dev/docs#run-time-client-side-component-api -->

<!-- Calling event handler on button click -->
Try to increment count value to 5
<button on:click={incrementCount}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

<!-- Demonstrating Reactive Values -->
<div>
	Doubled value is {doubled}
</div>

<!-- LEARN: Notice that even though Nested.svelte has a <p> element, the styles from App.svelte don't leak in. -->
<Nested />

<!-- Reactiveness -->
<Reactiveness />

<!-- Passing props to a component: Dynamic Component -->
<Dynamic answer={42} />

<!-- Passing no value to `answer` prop will be `undefined` but since we're using typescript it shows us erron in the vscode atleast. -->
<!-- <Dynamic /> -->

<Dynamic answer={42} skyColor="orange" />

<!-- Using spread props -->
<Dynamic {...myProps} />

<!-- Using if/else logics in Markup -->
<LogicalMarkup />

<!-- Keyed each blocks -->
<h1>Learn keys (similar to react)</h1>
<button on:click={handleClick}>Remove first thing </button>
<!-- Here, (thing.id) is the key, which tells Svelte how to figure out which DOM node to change when the component updates. -->
<!-- *WARNING*:: If you remve the `key` i.e., `(thing.id)` then svelte does *not* remove the first <Thing> component, but rather the last DOM node. Then it updates the name value in the remaining DOM nodes, but not the emoji. -->
{#each things as thing (thing.id)}
	<Thing name={thing.name} />
{/each}

<!-- MAGICAL AWAIT in Markup -->
<MagicalAwait />

<!-- Listeners Usage -->
<Listeners />

<!-- Styles are placed at the bottom of the component(Formatter do this by default). -->
<style>
	/* Importantly, these rules are scoped to the component. You won't accidentally change the style of <p> elements elsewhere in your app, as we'll see in the next step. */
	p {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>
