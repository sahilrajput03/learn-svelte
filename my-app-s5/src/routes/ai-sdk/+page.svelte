<script lang="ts">
	import { useChat } from '@ai-sdk/svelte';
	import { onMount, tick } from 'svelte';
	import { isBrowser, scrollToBottom } from '../scroll-utils';

	// TODO: Implement a multimodal example in another component from here - https://sdk.vercel.ai/docs/guides/multi-modal-chatbot

	// Why `maxSteps` (in `usechat()`) should be set greater than 1 ?
	//      We need maxSteps more than 1 so that toolcall's response is automatically passed and new response is generated automatically.
	//      Another advantage is allow to be able to call more than 1 tool calls on its own.

	let { input, handleSubmit, messages } = useChat({ maxSteps: 5, api: '/ai-sdk' });

	let chatDiv: HTMLDivElement;
	let chatDivHeight: number;

	let innerContainerDiv: HTMLDivElement;

	let deviceWidth: number;
	let deviceHeight: number;

	let kk;

	// * FOR EASY TESTING
	onMount(() => {
		setTimeout(() => {
			// To show single tool call
			// input.set("What's the weather in New York?");
			//
			// To show multiple tool calls
			// input.set("What's the weather in New York in celsius?");
		}, 1_000);

		// `chatDiv.offsetTop`  = Distance between top edge of body tag and top edge
		// 		of the `chatdiv`. And since we have margin of "20px" on all edges the
		// 		top margin is not included in `chatDiv.offsetTop`. Also we need to
		// 		take consideration of bottom margin ("20px") on body tag as well.
		const heightOfTextAreaForm = 36;

		chatDivHeight = window.innerHeight - chatDiv.offsetTop - heightOfTextAreaForm;
	});

	// Scroll to bottom whenever messages are added
	$: {
		$messages.length;
		scrollToBottom();
		// if (isBrowser() && chatDiv) chatDiv.scrollTop = chatDiv?.scrollHeight;
		if (isBrowser() && innerContainerDiv)
			innerContainerDiv.scrollTop = innerContainerDiv?.scrollHeight;
	}

	function resizeCallback() {
		deviceWidth = window.innerWidth;
		deviceHeight = window.innerHeight;
	}

	onMount(() => {
		resizeCallback();
		window.addEventListener('resize', resizeCallback);
		return () => window.removeEventListener('resize', resizeCallback);
	});

	// $: console.log('$messages?', $messages);

	function handleKeyDown(e: any) {
		// Submit when Enter key is pressed (this is needed because textarea's defautl enter behavior creates a new line character)
		if (e.keyCode == 13) {
			handleSubmit();
			// When enter is pressed we are left with a new line character which prevent showing the placeholder text.
			setTimeout(() => ($input = ''), 200);
		}
	}
</script>

<main>
	<!-- <div class="h-[200vh]">i have height of 200px</div> -->

	<div bind:this={chatDiv} class="flex flex-col justify-end" style={`height: ${chatDivHeight}px;`}>
		<!-- Note: Setting `overflow-y-auto` on above div doesn't work so I'm setting this on below div instead. -->
		<div bind:this={innerContainerDiv} class="overflow-y-auto">
			<!-- I'm hiding the toolCalls messages because they have content as empty string. -->
			{#each $messages.filter((m) => !!m.content) as message}
				<div>
					<span class="text-sm font-bold underline">{message.role.toUpperCase()}:</span>
					{message.content}
				</div>
			{/each}
		</div>
	</div>

	<form onsubmit={handleSubmit} style="margin: 0px -20px;">
		<!-- / //& Below input shows an additional bar on top of google-keyboard whch has "passwrod", "card", "map" on right side of it which is content shift issues. That's why I'm using textarea tag now.  -->
		<!-- <input class="input-primary" bind:value={$input} /> -->

		<textarea
			rows="1"
			class="input-primary w-full outline-none"
			bind:value={$input}
			onkeydown={handleKeyDown}
			placeholder="Ask AI"
		>
		</textarea>

		<!-- / //*  Send button is now needed since "Enter" on both desktop and mobile works fine. -->
		<!-- <button
			onclick={() => (document.querySelector('.input-primary') as any).focus()}
			type="submit"
			class="btn-primary">Send</button
		> -->
	</form>

	<!-- Position Fixed element -->
	<div class="fixed right-5 top-16 mt-10 text-xs text-green-500">
		<div>Device Width: {deviceWidth}</div>
		<div>Device Height: {deviceHeight}</div>
		<br />
		Some questions:
		<br />
		<li>What's the weather in New York?</li>
		<li>What's the weather in New York in celsius?</li>
	</div>

	<!-- <button onclick={() => input = "What's the weather in New York?"}>Set question -->
</main>
