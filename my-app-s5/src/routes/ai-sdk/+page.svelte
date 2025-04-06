<script lang="ts">
	import { useChat } from '@ai-sdk/svelte';
	import { onMount, tick } from 'svelte';
	import { scrollToBottom } from '../scroll-utils';
	import { browser } from '$app/environment';
	import debounce from 'lodash.debounce';
	import type { VoiceT } from '../../types';
	import { getVoices } from '$lib/speechRecognitionUtil';
	import { blur, fade } from 'svelte/transition';

	// TODO: Implement a multimodal example in another component from here - https://sdk.vercel.ai/docs/guides/multi-modal-chatbot

	// Why `maxSteps` (in `usechat()`) should be set greater than 1 ?
	//      We need maxSteps more than 1 so that toolcall's response is automatically passed and new response is generated automatically.
	//      Another advantage is allow to be able to call more than 1 tool calls on its own.

	let { input, handleSubmit, messages } = useChat({ maxSteps: 10, api: '/ai-sdk' });

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
		// ! temp for testing only.
		// $input = 'Tell human readable current time?';
	});

	const speak = () => {
		console.log('✅ Calling speak function..');
		// return; // & For Debugging
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

		speech.onend = () => {
			isBotSpeaking = false;
			console.log('  ✅ Bot Speech finished');
		};
		window.speechSynthesis.speak(speech);
	};
	const debouncedSpeakCallback = debounce(speak, 1_000);

	let isBotSpeaking = false;
	let idOfLastMessageSpokenByBot: string | null = null;

	// Scroll to bottom whenever messages are added
	$: {
		$messages.length; // using as a dependency
		console.log('messages.length?', $messages.length, $messages);
		scrollToBottom(); // Necessary so that chat-input sticks to bottom of the screeen.
		// if (browser && chatDiv) chatDiv.scrollTop = chatDiv?.scrollHeight;
		if (browser && innerContainerDiv) {
			innerContainerDiv.scrollTop = innerContainerDiv?.scrollHeight;
		}

		if (!isBotSpeaking) {
			// TODO: Add speaking status on the start talking button when bot is speaking and change label to "stop".
			// TODO: Check if there is way to check inherently if the completion has been done by generative ai --- that can help me prevent the 1 second delay I'm having with debounce function because instead of using deboucne I can make use of that to call speech function when the message has been completed instead.
			const lastMessage = $messages?.[$messages.length - 1];
			const isLastMessageOfAssistant = lastMessage?.role === 'assistant';
			if (isLastMessageOfAssistant) {
				const isNewMessageFromBot = idOfLastMessageSpokenByBot !== lastMessage.id;
				if (isNewMessageFromBot) {
					isBotSpeaking = true;
					idOfLastMessageSpokenByBot = lastMessage.id;
					debouncedSpeakCallback();
				}
			}
		}
	}
	let isBotListening = false;
	let recognition = null as any;
	async function handleStartListening() {
		// speech to text
		let w = window as any;
		recognition = new w.webkitSpeechRecognition() || new w.SpeechRecognition(); // chatgpt
		recognition.onresult = (event) => {
			isBotListening = false;
			const transcript = event.results[0][0].transcript;
			console.log(transcript);
			$input = transcript;
			handleSubmit();
		};
		recognition.start();
		isBotListening = true;
	}
	function handleStopButton() {
		const shouldStop = isBotListening || isBotSpeaking;
		if (shouldStop) {
			recognition.stop(); // todo: test this...
			window.speechSynthesis.cancel(); // Stop any ongoing speech
			isBotListening = false;
			isBotSpeaking = false;
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
	let showPendingTodos = false;
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

	<!-- I hide chat input text box till `chatDivHeight` is computed to prevent jerky-content-shift of the input text box. . -->
	{#if chatDivHeight}
		<form transition:blur onsubmit={handleSubmit} style="margin: 0px -20px;">
			<!-- / //& Note: Below <input/> tag shows an additional bar on top of google-keyboard whch has "passwrod", "card", "map" on right side of it which is content shift issues. That's why I'm using textarea tag now.  -->
			<!-- <input class="input-primary" bind:value={$input} /> -->

			<textarea
				rows="1"
				class="input-primary w-full outline-none"
				bind:value={$input}
				onkeydown={handleKeyDown}
				placeholder="Ask AI"
			>
			</textarea>

			<!-- / //*  Send button is not needed now since "Enter" on both desktop and mobile works fine. -->
			<!-- <button
			onclick={() => (document.querySelector('.input-primary') as any).focus()}
			type="submit"
			class="btn-primary">Send</button
		> -->
		</form>

		<div class="fixed right-[10px] top-[50vh] z-20 flex flex-col items-end">
			{#if !(isBotListening || isBotSpeaking)}
				<button
					in:fade
					class="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-blue-600"
					onclick={handleStartListening}
					>🚀 Listen to me
				</button>
			{:else}
				<button
					in:fade
					class="rounded-lg bg-red-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-red-600"
					onclick={handleStopButton}
					>stop
				</button>
			{/if}

			{#if isBotListening}
				<div in:fade class="mt-1 rounded-lg border border-gray-300 bg-white px-2 text-gray-400">
					Listening 👂🏻
				</div>
			{/if}

			{#if isBotSpeaking}
				<div in:fade class="mt-1 rounded-lg border border-gray-300 bg-white px-2 text-gray-400">
					Speaking 📢
				</div>
			{/if}
		</div>
	{/if}

	<!-- / //& Container (position: fixed) -->

	<div class="fixed right-0 top-[200px] mt-10 w-full text-xs">
		<button
			class="m-2 rounded-lg border px-2 py-1"
			onclick={() => (showPendingTodos = !showPendingTodos)}
			>{showPendingTodos ? 'Hide' : 'Show'} Pending Todos</button
		>

		{#if showPendingTodos}
			<div class="bg-pink-200 py-1 text-center text-gray-500 underline">
				Tags: #Conversation Agent, #Voice Assistant, #Conversation Bot, #Realtime Bot, #Speech to
				Speech
			</div>
			<div class="bg-yellow-100 px-3 py-1 text-xs text-red-700">
				TODO:
				<ol class="ml-4 list-decimal">
					<li>Fix the issue of quickly pressing stop and start listing...</li>
					<li>Increase height on text input for phones and</li>
					<li>fix the issue of text input not showing properly sometimes.</li>
					<li>Enable the send button and change it to a send like button as it is in telegram.</li>
					<li>Fix the enter key bug when there is not text in text-input (found in mobile)</li>
				</ol>
			</div>
			<div class="bg-blue-100 px-3 py-1">
				<div>
					{#if deviceWidth}
						<div transition:fade>
							Device Resolution (width x height): {deviceWidth} x {deviceHeight}
						</div>
					{:else}
						<div>&nbsp;</div>
					{/if}
				</div>
				<div class="mt-3 text-green-500">
					<div class="underline">Some questions:</div>
					<li>What's the weather in New York?</li>
					<li>What's the weather in New York in celsius?</li>
				</div>
			</div>
		{/if}
	</div>

	<!-- <button onclick={() => input = "What's the weather in New York?"}>Set question -->
</main>
