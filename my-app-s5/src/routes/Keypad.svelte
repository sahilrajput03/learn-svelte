<!-- This file is consumed in file://./Group53.svelte -->

<script lang="ts">
	type PropsType = { value: string; onsubmit: Function };
	let { value = $bindable(), onsubmit }: PropsType = $props();

	const select = (num: number) => () => (value += num);
	const clear = () => (value = '');
</script>

<div class="keypad">
	<button class="btn-primary btn-blue" onclick={select(1)}>1</button>
	<button class="btn-primary btn-blue" onclick={select(2)}>2</button>
	<button class="btn-primary btn-blue" onclick={select(3)}>3</button>
	<button class="btn-primary btn-blue" onclick={select(4)}>4</button>
	<button class="btn-primary btn-blue" onclick={select(5)}>5</button>
	<button class="btn-primary btn-blue" onclick={select(6)}>6</button>
	<button class="btn-primary btn-blue" onclick={select(7)}>7</button>
	<button class="btn-primary btn-blue" onclick={select(8)}>8</button>
	<button class="btn-primary btn-blue" onclick={select(9)}>9</button>

	<button class="btn-primary btn-blue" disabled={!value} onclick={clear}> clear </button>

	<button class="btn-primary btn-blue" onclick={select(0)}>0</button>

	<button class="btn-primary btn-blue" disabled={!value} onclick={onsubmit as any}> submit </button>
</div>

<style>
	.btn-blue {
		background: rgb(115, 193, 252);
		border: 0px solid black;
	}
	.btn-blue:disabled {
		filter: grayscale(1);
		opacity: 0.4;
	}

	.keypad {
		display: grid;
		grid-template-columns: repeat(3, 5em);
		grid-template-rows: repeat(4, 3em);
		grid-gap: 0.5em;
	}

	button {
		margin: 0;
	}
</style>
