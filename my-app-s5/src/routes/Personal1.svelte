<script lang="ts">
	import OpenAI from 'openai';
	import { fade } from 'svelte/transition';
	import { copyToClipboard, roundToTwoDecimals } from './utils';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Groq from 'groq-sdk';

	let openai: OpenAI;
	let OPEN_AI_API_KEY = $state('');

	let groq: Groq;
	let GROQ_API_KEY = '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'; // i am temporarily putting this here

	const defautlCopyToClipboardButtonText = 'Copy to clipboard';
	let copyToClipboardButtonText = $state(defautlCopyToClipboardButtonText);

	onMount(() => {
		const oai = localStorage.getItem('oai');
		if (oai) {
			// Only initiate openai if we have api key otherwise openai throws error
			openai = new OpenAI({
				apiKey: oai,
				dangerouslyAllowBrowser: true
			});
			OPEN_AI_API_KEY = oai; // When `OPEN_AI_API_KEY` is set we show key not found to user in the UI.
		} else {
			console.log('ERROR-SAHIL: `open ai` key not found in local storage.');
		}

		if (GROQ_API_KEY) {
			// Only initiate groq if we have api key otherwise openai throws error
			groq = new Groq({
				apiKey: GROQ_API_KEY,
				dangerouslyAllowBrowser: true
			});
		} else {
			console.log('ERROR-SAHIL: `groq` key not found in local storage.');
		}
	});

	let transcribedText = $state('');
	let isRecording = $state(false);
	let isTranscribing = $state(false);

	// svelte-ignore non_reactive_update
	let recordedAudioButton: HTMLAudioElement;

	let rec: MediaRecorder;
	let audioChunks: Blob[] = []; // this need not to be state
	let transcribeTime = $state('');

	// convert audio to text
	const transcribe = async (blob: Blob) => {
		const file = new File([blob], 'myFile.mp3', { type: 'audio/mp3' });
		const startTime = new Date();

		async function transcribeWithOpenAI() {
			const transcription = await openai.audio.transcriptions.create({
				file: file,
				// language: 'en', // (output language)
				model: 'whisper-1'
				// response_format: "srt", // default = "json" (valids: "text", "vtt", "srt", )
			});
			return transcription.text;
		}

		// https://console.groq.com/docs/speech-text
		async function transcribeWithGroq() {
			const transcription = await groq.audio.transcriptions.create({
				file: file, // Required path to audio file - replace with your audio file!
				model: 'whisper-large-v3', // (whisper-large-v3, whisper-large-v3-turbo, distil-whisper-large-v3-en)
				// prompt: 'Specify context or spelling', // Optional
				response_format: 'json', // Optional
				language: 'en' // Optional
				// temperature: 0.0 // Optional
			});
			return transcription.text;
		}

		// & Using openAI
		// const text = await transcribeWithOpenAI();

		// & Using Groq
		const text = await transcribeWithGroq();

		// Calculate time taken in milliseconds
		let timeTaken: number = new Date().getTime() - startTime.getTime();
		let roundedToTwoDecimals = roundToTwoDecimals(timeTaken / 1000);

		transcribeTime = `${roundedToTwoDecimals}s`;
		console.log('transcription?', text);
		transcribedText += text;
		isTranscribing = false;
	};

	// Why check `navigator.mediaDevices` is defined or not? (src: https://stackoverflow.com/questions/67663961/cannot-read-property-getusermedia-of-undefined-over-https)
	if (navigator.mediaDevices) {
		// ? Please never remove above check because sometimes `mediaDevices` can be undefined and we must catch this error via our `alert('navigator.mediaDevices is undefined!');`
		navigator.mediaDevices?.getUserMedia({ audio: true }).then((stream) => {
			handlerFunction(stream);
		});
	} else {
		// NOTE: For running on mobile in development server please make sure you run server via command - `nr deve -- --host`
		// This alert is very very helpful in testing on development server on mobile phone as it can easily detect if you still haven't added your origin (http://192.168.10.209:5173 <from your svelte dev server>) in the "Insecure origins treated as secure" list on `chrome://flags` on your mobile
		alert('navigator.mediaDevices is undefined!');
	}

	function handlerFunction(stream: MediaStream) {
		rec = new MediaRecorder(stream);
		rec.ondataavailable = (e) => {
			audioChunks.push(e.data);
			if (rec.state == 'inactive') {
				let blob = new Blob(audioChunks, { type: 'audio/mp3' });
				recordedAudioButton.src = URL.createObjectURL(blob);
				recordedAudioButton.controls = true;
				// recordedAudioButton.autoplay = true; // Uncommend this line to automatically play audio after recording is done
				transcribe(blob);
			}
		};
	}

	const handleRecordButton = () => {
		isRecording = true;
		// transcribedText = ''; // i'm now appenind all text. User can clear text simply by using "Clear" button now.
		transcribeTime = '';
		audioChunks = [];
		rec.start();
	};
	const handleStopRecord = () => {
		isRecording = false;
		rec.stop();
		isTranscribing = true;
	};
	$inspect({ isRecording, transcribedText });
</script>

<div class="mb-1 text-xl font-bold">Personal1 - Record and transcribe with OpenAI / Groq</div>

<div class="mb-3 text-xs italic text-gray-400">
	Tip: I can revoke the API_KEY immediately from the OpenAI/Groq if its ever compromised in worst
	case scenario.
</div>

{#if !OPEN_AI_API_KEY}
	<div class=" text-xl font-bold italic text-red-600">API Key is not found in localstorage.</div>
{/if}

<!-- * I want to show this button at all times in order to allow user to clear their openai api key from local storage. -->
<div class="flex items-center">
	<button
		onclick={(e) => {
			e.preventDefault();
			goto('/open-ai-api-key');
		}}
		class="my-3 block text-sm text-blue-700 underline"
	>
		Set OpenAI API key
	</button>

	<div
		class={`ms-2 h-[10px] w-[10px] rounded ${!!OPEN_AI_API_KEY ? 'bg-green-500' : 'bg-red-400'}`}
	></div>
</div>

<div in:fade style:display={OPEN_AI_API_KEY ? 'flex' : 'none'} class="justify-end md:justify-start">
	{#if !isRecording && !isTranscribing}
		<button
			in:fade
			class="rounded-sm border border-solid border-[black] bg-white px-[50px] py-0.5"
			onclick={handleRecordButton}
		>
			<b>Record</b></button
		>
	{:else if isRecording}
		<button
			in:fade
			class="rounded-sm border border-solid border-[black] bg-white px-[50px] py-0.5"
			onclick={handleStopRecord}
		>
			Stop
		</button>
	{:else}
		<button
			in:fade
			class="rounded-sm border border-solid border-[black] bg-white px-[50px] py-0.5 text-green-600"
			disabled
		>
			Transcribing...
		</button>
	{/if}
</div>

<div class="mt-3">
	<div transition:fade>{transcribedText}</div>
	<div class="flex justify-end md:justify-start">
		<button
			class="mr-2 rounded-sm border border-solid border-[black] bg-white px-[20px] py-0.5"
			onclick={() => {
				transcribedText = '';
				transcribeTime = '';
			}}
		>
			Clear
		</button>

		<button
			class="rounded-sm border border-solid border-[black] bg-white px-[20px] py-0.5"
			onclick={() => {
				copyToClipboard(transcribedText);
				copyToClipboardButtonText = 'copied!';
				setTimeout(() => {
					copyToClipboardButtonText = defautlCopyToClipboardButtonText;
				}, 1000);
			}}
		>
			{copyToClipboardButtonText}
		</button>
	</div>
	<div class="mt-5 text-xs italic">{transcribeTime}</div>
	<p class="mt-5" in:fade>
		<audio bind:this={recordedAudioButton}></audio>
	</p>
</div>
