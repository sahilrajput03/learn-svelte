<script lang="ts">
	import { useChat } from '@ai-sdk/svelte';
	import { onMount, tick } from 'svelte';

	// TODO: Implement a multimodal example in another component from here - https://sdk.vercel.ai/docs/guides/multi-modal-chatbot

	// Why `maxSteps` (in `usechat()`) should be set greater than 1 ?
	//      We need maxSteps more than 1 so that toolcall's response is automatically passed and new response is generated automatically.
	//      Another advantage is allow to be able to call more than 1 tool calls on its own.

	let { input, handleSubmit, messages } = useChat({ maxSteps: 5, api: '/ai-sdk' });

	// * FOR EASY TESTING
	onMount(() => {
		setTimeout(() => {
			// To show single tool call
			// input.set("What's the weather in New York?");
			//
			// To show multiple tool calls
			// input.set("What's the weather in New York in celsius?");
		}, 1_000);
	});

	$: console.log('$messages?', $messages);
</script>

<main>
	<ul>
		<!-- I'm hiding the tool call messages because they have content as empty string. -->
		{#each $messages.filter((m) => !!m.content) as message}
			<li>
				{message.role}: {message.content}
			</li>
		{/each}
	</ul>
	<form onsubmit={handleSubmit}>
		<input class="input-primary" bind:value={$input} />
		<button type="submit" class="btn-primary">Send</button>
	</form>

	<div class="fixed right-5 mt-10 text-xs">
		Some questions:
		<br />
		<li>What's the weather in New York?</li>
		<li>What's the weather in New York in celsius?</li>
	</div>

	<!-- <button onclick={() => input = "What's the weather in New York?"}>Set question -->
</main>
