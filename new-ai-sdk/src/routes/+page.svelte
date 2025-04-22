<script lang="ts">
	import { browser } from '$app/environment';
	import { scrollToBottom } from '$lib/scroll-utils';
	import { getVoices } from '$lib/speechRecognitionUtil';
	import type { VoiceT } from '$lib/types';
	import { veryLongMessageForUiTesting } from '$lib/utils-sample-messages';
	import { Chat } from '@ai-sdk/svelte';
	import { onMount, tick } from 'svelte';
	import { blur, fade } from 'svelte/transition';

	// Guide: https://sdk.vercel.ai/docs/getting-started/svelte#how-does-ai-sdksvelte-differ-from-ai-sdkreact
	// Important notes about using `ai-sdk/svelte` -  How does @ai-sdk/svelte differ from @ai-sdk/react? - https://sdk.vercel.ai/docs/getting-started/svelte#how-does-ai-sdksvelte-differ-from-ai-sdkreact

	const chat = new Chat({
		// initialMessages: [
		// 	{
		// 		id: '7f2ab8de-9160-4e6c-bea2-be0516a70793',
		// 		role: 'user',
		// 		content: 'Hi there.'
		// 		// content: veryLongMessageForUiTesting
		// 	}
		// ],
		initialInput: 'Hi',
		// initialInput: 'What is weather in Chandigarh, India?', // For testing tool call
		// initialInput: 'Set a reminder at 12 am to buy Choco Latte Coffee', // For testing tool call
		// initialInput: 'Set a reminder in 1 mins to buy Choco Latte Coffee at 1:23am.', // For testing tool call
		// initialInput: 'Give me a 250 words story please.', // For testing tool call
		maxSteps: 10
	});

	let chatDiv: HTMLDivElement;
	let chatDivHeight = $state<number>();

	let innerContainerDiv: HTMLDivElement;
	let chatInputContainer = $state<HTMLDivElement>();

	let deviceWidth = $state<number>();
	let deviceHeight = $state<number>();
	let voices: VoiceT[] = [];

	let isBotSpeaking = $state(false);
	const speak = () => {
		// return; // TEMPORARLY STOPPING FOR TESTING TO PREVENT ABUSE OF GOOGLE TTS LEADING TO BAN OF MY IP TEMPORARILY.
		isBotSpeaking = true;
		console.log('✅ Calling speak function..');
		// return; // & For Debugging
		const messages = $state.snapshot(chat.messages);
		const lastMessage = messages[messages.length - 1];
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

	onMount(async () => {
		// `chatDiv.offsetTop`  = Distance between top edge of body tag and top edge
		// 		of the `chatdiv`. And since we have margin of "20px" on all edges the
		// 		top margin is not included in `chatDiv.offsetTop`. Also we need to
		// 		take consideration of bottom margin ("20px") on body tag as well.
		// console.log('chatInputContainer?.clientHeight?', chatInputContainer?.clientHeight);
		chatDivHeight = window.innerHeight - chatDiv.offsetTop - chatInputContainer!.clientHeight;
		voices = (await getVoices()) as VoiceT[];
	});

	$effect(() => {
		// Scroll to bottom whenever messages are added
		const messages = $state.snapshot(chat.messages);
		if (messages.length !== 0 && chat.status === 'ready') {
			const lastMessage = messages[messages.length - 1];
			// console.log('Should trigger speak fn now: ', lastMessage.content);
			speak();
			scrollToBottom(); // Necessary so that chat-input sticks to bottom of the screeen.
			if (browser && innerContainerDiv) {
				// Scroll the innerContainerDiv element to the bottom of its scrollable content.
				innerContainerDiv.scrollTop = innerContainerDiv?.scrollHeight;
			}
		}

		// tick().then(() => {
		// 	scrollToBottom();
		// });
	});

	let isBotListening = $state(false);
	let recognition = null as any;
	async function handleStartListening() {
		// speech to text
		let w = window as any;
		recognition = new w.webkitSpeechRecognition() || new w.SpeechRecognition(); // chatgpt
		recognition.onresult = (event) => {
			isBotListening = false;
			const transcript = event.results[0][0].transcript;
			console.log('Transcript?', transcript);
			chat.input = transcript;
			chat.handleSubmit();
		};
		recognition.start();
		isBotListening = true;
	}

	function handleStopButton() {
		const shouldStop = isBotListening || isBotSpeaking;
		if (shouldStop) {
			recognition.stop();
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

	function handleKeyDown(e: any) {
		// When enter is pressed we are left with a new line character
		//      which prevent showing the placeholder text. That's why we need `e.preventDefault()`
		if (e.keyCode == 13) {
			e.preventDefault();
			chat.handleSubmit();
		}
	}

	let showPendingTodos = $state(false);

	const negativeHorizontalMargins = `margin: 0px -20px;`;
</script>

<main>
	<!-- For test -->
	<div class="text-center font-bold">New AI SDK</div>

	<!-- <div class="h-[200vh]">i have height of 200px</div> -->

	<div bind:this={chatDiv} class="flex flex-col justify-end" style={`height: ${chatDivHeight}px;`}>
		<!-- Note: Setting `overflow-y-auto` on above div doesn't work so I'm setting this on below div instead. -->
		<div
			bind:this={innerContainerDiv}
			class="overflow-y-auto px-[20px]"
			style={`${negativeHorizontalMargins}`}
		>
			<!-- I'm hiding the toolCalls messages because they have content as empty string. -->
			{#each chat.messages as message, messageIndex (messageIndex)}
				<div transition:fade>
					<!-- <span class="text-sm font-bold underline">{message.role.toUpperCase()}:</span> -->
					<!-- message -->
					{#each message.parts as part, partIndex (partIndex)}
						{#if part.type === 'text'}
							<!-- Note: We give max-wdith 90% on mobiles and 70% on desktop view (md=768px). -->
							<div
								class={`mb-[7px] w-fit max-w-[90%] rounded-[15px] px-[8px] pt-[5px] pb-[6px] md:max-w-[70%] ${message.role === 'user' ? 'ml-auto rounded-br-xs text-white' : 'rounded-bl-xs text-black'}`}
								style={`background: ${
									message.role === 'user' ? 'rgb(135, 117, 218)' : 'rgb(239, 243, 244)'
								};`}
							>
								{part.text}
							</div>
							<!-- {:else if part.type === 'tool-invocation'}
							<pre>{JSON.stringify(part.toolInvocation, null, 2)}</pre> -->
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<!-- I hide chat input text box till `chatDivHeight` is computed to prevent jerky-content-shift of the input text box. . -->
	<!-- Note using variable in clas for `visibility: hidden` is not working properly with tailwind classes that's why I'm using simply style property to set visibility. -->
	<div
		bind:this={chatInputContainer}
		class="px-[11px] pt-[10px] pb-[20px]"
		transition:blur
		style={`visibility: ${!chatDivHeight ? 'hidden' : 'visible'}; ${negativeHorizontalMargins}`}
	>
		<!-- / //& Note: Below <input/> tag shows an additional bar on top of google-keyboard whch has "passwrod", "card", "map" on right side of it which is content shift issues. That's why I'm using textarea tag now.  -->
		<!-- <input class="input-primary" bind:value={$input} /> -->

		<div class="flex rounded-2xl border-1">
			<textarea
				rows="2"
				class="input-primary w-full border-0 bg-transparent outline-none"
				bind:value={chat.input}
				onkeydown={handleKeyDown}
				placeholder="Ask AI"
			>
			</textarea>
			<button
				class="btn-primary flex items-center px-2"
				onmousedown={(e) => {
					// Prevent focus shift so that when send button is pressed
					//      keyboard doesn't close on android (tested on poco m4)
					e.preventDefault();
				}}
				onclick={(e) => {
					chat.handleSubmit();
				}}
			>
				<img class="mr-[5px]" width="25px" src="/send-button.svg" alt="send key" />
			</button>
		</div>
	</div>

	{#if chatDivHeight}
		<div class="fixed top-[50vh] right-[10px] z-20 flex flex-col items-end">
			{#if !(isBotListening || isBotSpeaking)}
				<!-- Note: I use onpointerdown to prevent keyboard closing on tapping button on android. (From ChatGPT) -->
				<button
					in:fade={{ duration: 200 }}
					class="aspect-[1] h-[95px] rounded-full px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-blue-600"
					onclick={handleStartListening}
					style="background: rgb(135, 117, 218); 
						box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);"
					onpointerdown={(e) => e.preventDefault()}
					>🚀 Listen to me
				</button>
			{:else}
				<!-- Note: I use onpointerdown to prevent keyboard closing on tapping button on android. (From ChatGPT) -->
				<button
					in:fade={{ duration: 200 }}
					class="aspect-[1] rounded-full bg-red-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-red-600"
					onclick={handleStopButton}
					onpointerdown={(e) => e.preventDefault()}
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
	<div class="fixed top-[20px] right-0 mt-10 w-full text-xs">
		<button
			class="m-2 rounded-lg border bg-gray-100 px-2 py-1"
			onclick={() => (showPendingTodos = !showPendingTodos)}
			>{showPendingTodos ? 'Hide' : 'Show'} Todos</button
		>

		{#if showPendingTodos}
			<div class="bg-pink-200 py-1 text-center text-gray-500 underline">
				Tags: #Conversation Agent, #Voice Assistant, #Conversation Bot, #Realtime Bot, #Speech to
				Speech
			</div>
			<div class="bg-yellow-100 px-3 py-1 text-xs text-red-700">
				TODO:
				<ol class="ml-4 list-decimal">
					<li>
						<strong
							>TODO: Using media query --- make enter key to `chat.submitHandler` on desktop and
							enter key as new line in mobile phones as it happens in TWITTER WEB UI & TELEGRAM APP.
							For now mobile `Enter` key act as sending message.
						</strong>
					</li>
					<li><u>Reminder Tips:</u> Set a reminder in 5 mins to go meet Alice.</li>
					<li>Fix the issue of quickly pressing stop and start listing...</li>
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

<style>
	textarea {
		/* Hide resizer for textarea */
		resize: none;
	}
	textarea:focus {
		/* Necessary otherwise textarea ges a blue outline when focussed */
		box-shadow: none;
	}
</style>
