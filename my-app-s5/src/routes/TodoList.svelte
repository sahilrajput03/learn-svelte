<script lang="ts">
	import { send, receive } from './transition2';

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
