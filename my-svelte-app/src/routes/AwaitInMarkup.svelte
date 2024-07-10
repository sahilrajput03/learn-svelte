<script lang="ts">
	const sleep = (ms: number) => new Promise((res, rej) => setTimeout(res, ms));

	async function getRandomNumber(defaultRandomNumber = 1) {
		await sleep(1000);
		// const res = await fetch(`https://loveapi.ml/numbersapi/${id}/trivia`);
		const res = { text: () => defaultRandomNumber.toString() || '1', ok: 'ok' };
		const text = await res.text();

		if (res.ok) {
			return text;
		} else {
			throw new Error(text);
		}
	}

	let randomNumberPromise = getRandomNumber();

	function handleClick() {
		randomNumberPromise = getRandomNumber(Math.floor(Math.random() * 10 + 1));
	}
</script>

<h1>Await promise values directly in markup</h1>

<button on:click={handleClick}>Set new random number</button>

<!-- IMPORTANT: Only the most recent promise is considered, meaning you don't need to worry about **race conditions**. -->
{#await randomNumberPromise}
	<p>Loading...</p>
{:then number}
	<p>number: {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<div class="highlight">Without catch block</div>
Only use this when you're sure that your promise can't reject
{#await randomNumberPromise then number}
	<div>number: {number}</div>
{/await}

<!-- LEARN: 2. You can also omit the first block if you don't want to show anything until the promise resolves: -->
<div class="highlight mt">Without loading state</div>
{#await randomNumberPromise then number}
	<div>number: {number}</div>
{:catch error}
	<div style="color: red">{error.message}</div>
{/await}

<style>
	.highlight {
		font-weight: bolder;
		text-decoration: underline;
	}
	.mt {
		margin-top: 1rem;
	}
</style>
