<script lang="ts">
	// Learn: We use `export` keyword in front of let declarations
	// 				to mark it prop. It enables typescript type-checking
	// 				for that prop.
	export let name: string;

	// Learn: Assigning an default value to a prop makes it an optional.
	// 			Note: Passing prop from the compoent would overwrite the prop value.
	export let age: number = 10;
	export let gender: string = 'male';
	let background = 'lightgrey';
</script>

<div class="bold">Component B</div>
<section>
	<div>Name: {name}</div>

	<div class="highlight" style="color: black; background: {background}; padding: 0rem 0.5rem">
		Age: {age}
	</div>

	<div>Gender: {gender}</div>

	<!-- Chapter: SPREAD PROPS: Conversely, if you need to reference all the props that were passed into a component, including ones that weren't declared with export, you can do so by accessing $$props directly. It's not generally recommended, as it's difficult for Svelte to optimise, but it's useful in rare cases. -->
	<div>Greet: {$$props.friends?.join(', ')}</div>
</section>

<style>
	section {
		border: 1px solid grey;
		margin-top: 1rem;
		border-radius: 1rem;
		padding: 0.3rem;
	}
	.highlight {
		padding: 0.5rem;
		border-radius: 1rem;
	}
	.bold {
		font-weight: bold;
	}
</style>
