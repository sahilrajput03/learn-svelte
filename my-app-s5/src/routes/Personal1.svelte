<script lang="ts">
	import OpenAI from 'openai';

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

	let recordButton: HTMLButtonElement;
	let stopRecordButton: HTMLButtonElement;
	let recordedAudioButton: HTMLAudioElement;
	let transcribedText = $state('<transcribed text here>');

	let rec: MediaRecorder;
	let audioChunks: Blob[] = []; // this need not to be state

	const myTranscribeFn = async (blob: Blob) => {
		const file = new File([blob], 'myFile.mp3', { type: 'audio/mp3' });

		const transcription = await openai.audio.transcriptions.create({
			file: file,
			// language: 'en', // (output language)
			model: 'whisper-1'
			// response_format: "srt", // default = "json" (valids: "text", "vtt", "srt", )
		});
		console.log('transcription?', transcription.text);
		transcribedText = transcription.text;
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
				myTranscribeFn(blob);
			}
		};
	}

	const handleRecordButton = () => {
		recordButton.disabled = true;
		stopRecordButton.disabled = false;
		audioChunks = [];
		rec.start();
	};
	const handleStopRecord = () => {
		recordButton.disabled = false;
		stopRecordButton.disabled = true;
		rec.stop();
	};
</script>

<div class="mb-3 text-xl font-bold">Personal1 - Record and transcribe with OpenAI</div>

{#if !VITE_OPEN_AI_API_KEY}
	<div class="py-3 text-4xl font-bold text-red-600">
		API Key is not defined in environment requried to test this transcription example with OpenAI.
	</div>
{/if}

<p>
	<button bind:this={recordButton} class="btn-primary" type="button" onclick={handleRecordButton}
		>Record</button
	>
	<button
		bind:this={stopRecordButton}
		class="btn-primary"
		type="button"
		disabled
		onclick={handleStopRecord}>Stop</button
	>
</p>
<p>
	<audio bind:this={recordedAudioButton}></audio>
</p>

<p class="mt-3">
	{transcribedText}
</p>

<hr class="my-3" />

<div class="mt-[300px] text-purple-600">
	Tip: You can give id1 to an element and then you can direclty access it via a variables named
	`id1`. You can use this technique while debugging in browser as well.
</div>
