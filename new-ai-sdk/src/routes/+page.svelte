<script>
	import { Chat } from '@ai-sdk/svelte';

	// Guide: https://sdk.vercel.ai/docs/getting-started/svelte#how-does-ai-sdksvelte-differ-from-ai-sdkreact
	// Important notes about using `ai-sdk/svelte` -  How does @ai-sdk/svelte differ from @ai-sdk/react? - https://sdk.vercel.ai/docs/getting-started/svelte#how-does-ai-sdksvelte-differ-from-ai-sdkreact

	const chat = new Chat({
		// initialInput: '',
		initialInput: 'What is weather in Chandigarh, India?', // For testing tool call
		maxSteps: 10
	});

	$effect(() => {
		const messages = $state.snapshot(chat.messages);
		if (messages.length !== 0 && chat.status === 'ready') {
			const lastMessage = messages[messages.length - 1];
			// console.log('Speaking now: ', lastMessage.content);
		}
	});
</script>

<main>
	<!-- For test -->
	<div>new-ai-sdk</div>

	<ul>
		{#each chat.messages as message, messageIndex (messageIndex)}
			<li>
				<div>{message.role}</div>
				<div>
					{#each message.parts as part, partIndex (partIndex)}
						{#if part.type === 'text'}
							<div>{part.text}</div>
							<!-- {:else if part.type === 'tool-invocation'}
							<pre>{JSON.stringify(part.toolInvocation, null, 2)}</pre> -->
						{/if}
					{/each}
				</div>
			</li>
		{/each}
	</ul>
	<form onsubmit={chat.handleSubmit}>
		<input bind:value={chat.input} />
		<button type="submit">Send</button>
	</form>
</main>
