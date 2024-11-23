<script lang="ts">
	import { send, receive } from './transition2';
	import { flip } from 'svelte/animate';

	type TodoType = {
		id?: string;
		description: string;
		done: boolean;
	};

	type PropsType = {
		todos: TodoType[];
		remove: Function;
	};
	let { todos, remove }: PropsType = $props();
</script>

<ul class="todos">
	{#each todos as todo (todo)}
		<li
			class="my-1"
			class:done={todo.done}
			in:receive={{ key: todo.id }}
			out:send={{ key: todo.id }}
			animate:flip={{ duration: 200 }}
		>
			<label>
				<input style="margin-right: 5px;" type="checkbox" bind:checked={todo.done} />
				<span>{todo.description}</span>
				<button onclick={() => remove(todo)} aria-label="Remove"></button>
			</label>
		</li>
	{/each}
</ul>

<style>
	label {
		width: 100%;
		height: 100%;
		display: flex;
		/* Sahil: */
		padding: 0.5em;
		/* Sahil: Giving default background color to each label */
		background-color: #eee;
	}

	.done > label {
		/* Sahil: We override the label having "done" class with a greener background color */
		background-color: rgb(180, 240, 100);
	}

	span {
		flex: 1;
	}

	button {
		background-image: url(./remove.svg);
		/* Sahil: I added below two properties */
		width: 20px;
		background-repeat: no-repeat;
	}
</style>
