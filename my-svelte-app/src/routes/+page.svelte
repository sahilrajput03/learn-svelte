<script>
	import ComponentB from './ComponentB.svelte';
	import Listeners from './Listeners.svelte';
	import ComponentWithIfElseEach from './ComponentWithIfElseEach.svelte';
	import AwaitInMarkup from './AwaitInMarkup.svelte';
	import FoodCard from './FoodCard.svelte';
	import ComponentA from './ComponentA.svelte';
	import Reactiveness from './Reactiveness.svelte';

	let name = 'WORLD';
	let src = 'pika.gif';
	let pokemon_name = 'pikachu';

	let myHtmlString = `<div>This string contains some <strong>HTML!!!</strong></div>`; // Svelte doesn't perform any sanitization of the expression inside {@html ...} before it gets inserted into the DOM. In other words, if you use this feature it's critical that you manually escape HTML that comes from sources you don't trust, otherwise you risk exposing your users to XSS attacks.

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
	let user1 = {
		name: 'Radha',
		age: 21,
		friends: ['Arjun', 'Akshay']
	};

	let foodItems = [
		{ id: 1, name: 'apple' },
		{ id: 2, name: 'banana' },
		{ id: 3, name: 'carrot' },
		{ id: 4, name: 'doughnut' },
		{ id: 5, name: 'egg' }
	];
	function handleRemoveFirstItemUsingSlice() {
		foodItems = foodItems.slice(1);
	}
</script>

<h1>Learn SvelteKit</h1>

Quick Links:
<ul>
	<li>
		Svelte Kit Docs: <a href="https://kit.svelte.dev">kit.svelte.dev</a>
	</li>
	<li>
		Client-side component API: <a
			target="_blank"
			rel="noreferrer"
			href="https://svelte.dev/docs#run-time-client-side-component-api">Click here</a
		>
	</li>
</ul>

<section>
	<p>Hello {name.toLowerCase()}!</p>

	<img {src} alt={pokemon_name} width="300px" />
</section>

<p>This is a paragraph.</p>

<h1>Displaying a string variable as html (<i>myHtmlString</i>)</h1>
<section>{@html myHtmlString}</section>

<h1>Button Click Handler</h1>
Click to increment count (upto 5)
<button on:click={incrementCount}>
	{count}
	{count === 1 ? 'time' : 'times'}
</button>

<div>
	<i>doubled</i> (reactive value): {doubled}
</div>

<h1>Text with class names</h1>

<p class="warning">This text has class "warning"</p>

<!-- LEARN: Notice that even though Nested.svelte has a <p> element and div with class "warning", the styles from App.svelte don't leak in which is so cool! -->
<ComponentA />

<!-- Reactiveness -->
<Reactiveness />

<section>
	<h1>Passing props to a component & using default props</h1>
	<ComponentB name={'Alice'} />
	<ComponentB
		name={'Bob'}
		age={21}
		comments={{
			// Comment 1
			/* Comment 2 */
		}}
		{...{
			// Comment 3
		}}
		{...{
			/* Comment 4 */
		}}
	/>
	<!-- Using spread props -->
	<ComponentB {...user1} />
	<!-- ! hello -->

	<!-- Passing no value to `name` prop would act as `undefined` but since we're using typescript it shows us error in the vscode atleast, that's awesome!. -->
	<!-- <ComponentB /> -->
</section>

<ComponentWithIfElseEach />

<!-- Keyed each blocks -->
<h1>Learn keys for #each similar to id concept of react</h1>
<button on:click={handleRemoveFirstItemUsingSlice}> Remove first thing </button>
<!-- * Here, (foodItem.id) is the key, which tells Svelte how to figure out which DOM node to change when the component updates. -->
<!-- *WARNING*:: If you remove the `key` i.e., `(foodItem.id)` then svelte does *not* remove the first <Thing> component, but rather the last DOM node. Then it updates the name value in the remaining DOM nodes, but not the emoji. -->
<h1>Boom?</h1>
{#each foodItems as foodItem (foodItem.id)}
	<FoodCard name={foodItem.name} />
{/each}

<AwaitInMarkup />

<Listeners />

<!-- Styles are placed at the bottom of the component(Formatter do this by default). -->
<style>
	/* Importantly, these rules are scoped to the component. You won't accidentally change the style of <p> elements elsewhere in your app, as we'll see in the next step. */
	p {
		color: purple;
	}
	.warning {
		color: red;
	}
</style>
