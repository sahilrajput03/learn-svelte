<script>
	// Sahil; $bindable is used to make prop bound so that data can flow from child to parent component.
	// I use $bindable in `src/routes/Keypad.svelte` file as well. Docs - https://svelte.dev/docs/svelte/$bindable
	let { data = $bindable() } = $props();
	console.log('data?', data);
	const reset = () => {
		data.todos = [];
		console.log('🚀 ~ reset ~ data.todos:', data.todos);
	};
</script>

<button onclick={reset}>reset</button>

<div class="centered">
	<h1 class="mb-3 text-5xl">todos</h1>

	<label>
		add a todo:
		<input
			class="input-primary"
			type="text"
			autocomplete="off"
			onkeydown={async (e) => {
				if (e.key !== 'Enter') return;

				const input = e.currentTarget;
				const description = input.value;

				const response = await fetch('/todo', {
					method: 'POST',
					body: JSON.stringify({ description }),
					headers: {
						'Content-Type': 'application/json'
					}
				});

				const { id } = await response.json();

				data.todos = [
					...data.todos,
					{
						id,
						description,
						done: false
					}
				];

				input.value = '';
			}}
		/>
	</label>

	<ul class="todos">
		{#each data.todos as todo (todo.id)}
			<li>
				<label>
					<input
						type="checkbox"
						checked={todo.done}
						onchange={async (e) => {
							const done = e.currentTarget.checked;

							await fetch(`/todo/${todo.id}`, {
								method: 'PUT',
								body: JSON.stringify({ done }),
								headers: {
									'Content-Type': 'application/json'
								}
							});
						}}
					/>
					<span>{todo.description}</span>
					<button
						class="btn-primary btn-delete"
						style="width: 24px;"
						aria-label="Mark as complete"
						onclick={async (e) => {
							await fetch(`/todo/${todo.id}`, {
								method: 'DELETE'
							});

							data.todos = data.todos.filter((t) => t !== todo);
						}}
					></button>
				</label>
			</li>
		{/each}
	</ul>
</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	label {
		display: flex;
		width: 100%;
	}

	input[type='text'] {
		flex: 1;
	}

	span {
		flex: 1;
	}

	.btn-delete {
		border: none;
		background: url(./remove.svg) no-repeat 50% 50%;
		background-size: 1rem 1rem;
		cursor: pointer;
		height: 100%;
		aspect-ratio: 1;
		opacity: 0.5;
		transition: opacity 0.2s;
	}

	button:hover {
		opacity: 1;
	}
</style>
