<!-- 57/75 -->
<!-- https://svelte.dev/tutorial/svelte/each-block-bindings -->

<script>
	let todos = $state([
		{ done: false, text: 'finish Svelte tutorial' },
		{ done: false, text: 'build an app' },
		{ done: false, text: 'world domination' }
	]);

	function add() {
		todos.push({
			done: false,
			text: ''
		});
	}

	function clear() {
		todos = todos.filter((t) => !t.done);
	}

	let remaining = $derived(todos.filter((t) => !t.done).length);
</script>

<div class="centered">
	<h1>todos</h1>

	<ul class="todos">
		{#each todos as todo}
			<li class:done={todo.done}>
				<!-- Sahil: This is so much love to see binding it directly. Svelte is bloody awesome! ❤️ -->
				<input type="checkbox" bind:checked={todo.done} />

				<input type="text" placeholder="What needs to be done?" bind:value={todo.text} />
			</li>
		{/each}
	</ul>

	<p>{remaining} remaining</p>

	<button class="btn-primary" onclick={add}> Add new </button>

	<button class="btn-primary" onclick={clear}> Clear completed </button>
</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	.done {
		opacity: 0.4;
	}

	li {
		display: flex;
	}

	input[type='text'] {
		flex: 1;
		padding: 0.5em;
		margin: -0.2em 0;
		border: none;
	}
</style>
