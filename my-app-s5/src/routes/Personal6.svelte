<script lang="ts">
	import { onMount } from 'svelte';

	let words = $state<string[]>([]);
	let value = $state('');

	onMount(() => {
		words = JSON.parse(localStorage.getItem('words')!) ?? [];
	});

	const saveToLocalStorage = (val: string[]) => localStorage.setItem('words', JSON.stringify(val));
	$effect(() => {
		console.log('effect now....');
		if (words) {
			saveToLocalStorage(words); // wheneer `value` changes we update to localStorage
		}
	});
</script>

<div class="text-3xl">Personal6 - Vocab Collector for Books</div>

{#each words as word, index (index)}
	<li>{word}</li>
{/each}

<br />

<input
	class="input-primary"
	bind:value
	onkeypress={(e: any) => {
		if (e.key === 'Enter') {
			if (!words.find((word) => word.includes(e.target.value.toLowerCase()))) {
				words.push(e?.target?.value.toLowerCase() as string);
				value = '';
			} else {
				alert(e.target.value + ' is already added.');
			}
		}
	}}
	placeholder="word"
/>

<br />
<button class="btn-primary mt-3" onclick={() => (words = [])}>Clear all words</button>
