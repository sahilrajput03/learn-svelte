<script lang="ts">
	import OpenAI from 'openai';
	import { fade } from 'svelte/transition';

	const VITE_OPEN_AI_API_KEY = import.meta.env?.VITE_OPEN_AI_API_KEY;
	// console.log('OPEN_AI_API_KEY?', VITE_OPEN_AI_API_KEY);

	if (!VITE_OPEN_AI_API_KEY) {
		console.log('ERROR-SAHIL: VITE_OPEN_AI_API_KEY not found in environment.');
	}

	let openai: OpenAI;
	// Only initiate openai if we have api key otherwise openai throws error
	if (VITE_OPEN_AI_API_KEY) {
		openai = new OpenAI({
			apiKey: VITE_OPEN_AI_API_KEY,
			dangerouslyAllowBrowser: true
		});
	}

	let transcribedText = $state('');
	let isRecording = $state(false);
	let isTranscribing = $state(false);

	let recordedAudioButton: HTMLAudioElement;

	let rec: MediaRecorder;
	let audioChunks: Blob[] = []; // this need not to be state

	// convert audio to text
	const transcribe = async (blob: Blob) => {
		const file = new File([blob], 'myFile.mp3', { type: 'audio/mp3' });

		const transcription = await openai.audio.transcriptions.create({
			file: file,
			// language: 'en', // (output language)
			model: 'whisper-1'
			// response_format: "srt", // default = "json" (valids: "text", "vtt", "srt", )
		});
		console.log('transcription?', transcription.text);
		transcribedText = transcription.text;
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
				recordedAudioButton.autoplay = true;
				transcribe(blob);
			}
		};
	}

	const handleRecordButton = () => {
		isRecording = true;
		transcribedText = '';
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

<div class="mb-3 text-xl font-bold">Personal1 - Record and transcribe with OpenAI</div>

{#if !VITE_OPEN_AI_API_KEY}
	<div class="py-3 text-4xl font-bold text-red-600">
		API Key is not defined in environment requried to test this transcription example with OpenAI.
	</div>
{/if}

<div in:fade>
	{#if !isRecording && !isTranscribing}
		<button in:fade class="btn-primary" type="button" onclick={handleRecordButton}>Record</button>
	{:else if isRecording}
		<button in:fade class="btn-primary" type="button" onclick={handleStopRecord}> Stop </button>
	{:else}
		<!-- Setting this div height (to prevent content shift) because above button's height is 30px as checked from browser dev tools. -->
		<div style:height="30px"></div>
	{/if}
</div>

<p class="mt-5" in:fade>
	<audio bind:this={recordedAudioButton}></audio>
</p>

<div class="mt-3">
	{#if isTranscribing}
		<i style="color: grey" in:fade>Transcribing now...</i>
	{:else}
		<div transition:fade>{transcribedText}</div>
	{/if}
</div>
