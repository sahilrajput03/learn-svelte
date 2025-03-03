<script lang="ts">
	import { onMount } from 'svelte';
	import { setupWordsState, wordsState } from './shared.svelte';

	let inputText = $state('');
	setupWordsState();
</script>

<div class="text-3xl">Personal6a - Vocab Collector for Books</div>

{#each wordsState.words as word, index (index)}
	<li>{word}</li>
{/each}

<br />

<input
	class="input-primary"
	bind:value={inputText}
	onkeypress={(e: any) => {
		if (e.key === 'Enter') {
			if (!wordsState.words.find((word) => word.includes(e.target.value.toLowerCase()))) {
				wordsState.words.push(e?.target?.value.toLowerCase() as string);
				inputText = '';
			} else {
				alert(e.target.value + ' is already added.');
			}
		}
	}}
	placeholder="word"
/>

<br />
<button class="btn-primary mt-3" onclick={() => (wordsState.words = [])}>Clear all words</button>
