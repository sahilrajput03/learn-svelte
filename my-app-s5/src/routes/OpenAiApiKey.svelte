<script lang="ts">
	import { onMount } from 'svelte';
	let openAiApiKey = $state('');

	onMount(() => {
		openAiApiKey = localStorage.getItem('oai') || '';
	});

	const handleSaveOpenAIAPIKey = () => {
		localStorage.setItem('oai', openAiApiKey);
		alert('OpenAI API key saved to localstorage.');
	};
	const handleClearOpenAIAPIkey = () => {
		localStorage.clear();
		openAiApiKey = '';
	};
</script>

<div class="flex">
	<div>Enter Open AI API key:</div>
	<input class="input-primary ms-3 w-[50px] text-xs" bind:value={openAiApiKey} />
</div>
<br />
<button class="btn-primary mb-3" onclick={handleSaveOpenAIAPIKey}>Save to local storage</button>
<button class="btn-primary mb-3" onclick={handleClearOpenAIAPIkey}>Clear local storage</button>
