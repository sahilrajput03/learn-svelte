<script lang="ts">
	const sleep = (ms: number) => new Promise((res, rej) => setTimeout(res, ms));

	async function getRandomNumber(id = 1) {
		console.log('id?', id);
		// await sleep(1000);
		const res = await fetch(`https://loveapi.ml/numbersapi/${id}/trivia`);
		const text = await res.text();

		if (res.ok) {
			return text;
		} else {
			throw new Error(text);
		}
	}

	let triviaPromise = getRandomNumber();

	function handleClick() {
		triviaPromise = getRandomNumber(Math.floor(Math.random() * 10 + 1));
	}
</script>

<h1>Svelte makes it easy to await the value of promises directly in your markup</h1>

<button on:click={handleClick}>Load new trivia</button>

<!-- IMPORTANT: Only the most recent promise is considered, meaning you don't need to worry about **race conditions**. -->
{#await triviaPromise}
	<p>Loading...</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<!-- LEARN: 1. If you know that **your promise can't reject, you can *OMIT* the catch block**. -->
<h3>Without catch block (Only use when you're sure that your promise can't reject)</h3>
{#await triviaPromise then number}
	<p>the number is {number}</p>
{/await}

<!-- LEARN: 2. You can also omit the first block if you don't want to show anything until the promise resolves: -->
<h3>Without loading state</h3>
{#await triviaPromise then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
