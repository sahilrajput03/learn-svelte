<script lang="ts">
	import { useChat } from '@ai-sdk/svelte';
	import { onMount, tick } from 'svelte';
	import { scrollToBottom } from '../scroll-utils';
	import { browser } from '$app/environment';
	import debounce from 'lodash.debounce';
	import type { VoiceT } from '../../types';
	import { getVoices } from '$lib/speechRecognitionUtil';
	import { fade } from 'svelte/transition';

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

	let voices: VoiceT[] = [];

	onMount(async () => {
		voices = (await getVoices()) as VoiceT[];
	});

	const speak = () => {
		// return console.log('speaking now?...'); // & For Debugging
		const lastMessage = $messages[$messages.length - 1];
		const speech = new SpeechSynthesisUtterance(lastMessage.content); // * Docs: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
		speech.voice = voices[192] as any; // comment this line to use default `voices[0]`
		// 		FEMALE: 191 (treble), 192 (warm),
		// 		MALE: 193 (warm),
		speech.lang = 'en-US'; // Set language
		// speech.lang = 'hi-IN'; // Set language
		speech.rate = 1; // Adjust speed (0.1 to 10)
		speech.pitch = 1; // Adjust pitch (0 to 2)
		speech.volume = 1; // Adjust volume (0 to 1)

		window.speechSynthesis.speak(speech);
	};
	const debouncedSpeakCallback = debounce(speak, 1_000);

	// Scroll to bottom whenever messages are added
	$: {
		$messages.length; // using as a dependency
		const isLastMessageOfAssistant = $messages?.[$messages.length - 1]?.role === 'assistant';
		if (isLastMessageOfAssistant) {
			debouncedSpeakCallback();
		}
		scrollToBottom(); // Necessary so that chat-input sticks to bottom of the screeen.
		// if (browser && chatDiv) chatDiv.scrollTop = chatDiv?.scrollHeight;
		if (browser && innerContainerDiv) {
			innerContainerDiv.scrollTop = innerContainerDiv?.scrollHeight;
		}
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
				<div transition:fade>
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
	<div class="fixed right-0 top-[100px] mt-10 text-xs text-green-500">
		<div class="bg-yellow-100 px-3 py-1 text-xs text-red-700">
			TODO:
			<li>Increase height on text input for phones and</li>
			<li>fix the issue of text input not showing properly sometimes.</li>
			<li>Fix the initial initial jerk of text input.</li>
		</div>

		<div class="bg-blue-100 px-3 py-1">
			<div>Device Width: {deviceWidth}</div>
			<div>Device Height: {deviceHeight}</div>
			<br />
			Some questions:
			<br />
			<li>What's the weather in New York?</li>
			<li>What's the weather in New York in celsius?</li>
		</div>
	</div>

	<!-- <button onclick={() => input = "What's the weather in New York?"}>Set question -->
</main>
