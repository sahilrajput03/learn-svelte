<!-- https://svelte.dev/tutorial/kit/get-handlers -->
<script>
	import axios from 'axios';

	let number = $state();

	async function roll() {
		// const data = await (await fetch('/roll')).json(); // Using fetch
		const { data } = await axios.get('/roll'); // Using axios
		// console.log("🚀 ~ data?", data)
		number = data;
	}
</script>

<button class="btn-primary" onclick={roll}>Roll the dice</button>

{#if number !== undefined}
	<p>You rolled a {number}</p>
{/if}
