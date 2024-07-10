<script lang="ts">
	// Learn: We use `export` keyword in front of let declarations
	// 				to mark it as component prop. It enables us to get props
	// 				type-checking via typescript in vscode.
	export let name: string;

	// Learn: By assigning a initial value to a component prop it is
	// 				marked as optional prop.
	// Note: 	If age prop is passed via component then that value
	// 				would overwrite the default value.
	export let age: number = 10;
	let background = 'lightgrey';
</script>

<h1>Component B</h1>
<section>
	<div>Name: {name}</div>

	<div class="highlight" style="color: black; background: {background}; padding: 0rem 0.5rem">
		Age: {age}
	</div>

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
</style>
