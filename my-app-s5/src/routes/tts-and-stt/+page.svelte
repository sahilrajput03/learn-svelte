<script lang="ts">
	import { getVoices } from '$lib/speechRecognitionUtil';
	import { onMount } from 'svelte';
	import type { VoiceT } from '../../types';

	let voices: VoiceT[] = $state([]);
	let showAvailableVoices = $state(!!0);

	onMount(async () => {
		voices = (await getVoices()) as VoiceT[];
	});

	// let text = $state('Whispers of autumn in the breeze,\nGolden leaves dance with gentle ease.');
	let text = $state('hello world');

	async function transcribe() {
		//      * DEMO - Speech Synthesiser - https://mdn.github.io/dom-examples/web-speech-api/speak-easy-synthesis/
		const SpeechRecognition =
			(window as any).SpeechRecognition || (window as any).webkitSpeechRecognition; // * Docs: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
		const recognition = new SpeechRecognition();
		recognition.onresult = (event: any) => {
			const transcript = event.results[0][0].transcript;
			// console.log(transcript);
			text = transcript;

			speak();
		};
		recognition.start();
		// Fired when the speech recognition service has disconnected
		// recognition.onend = (event) => {};
		// recognition.stop();
	}

	let isSpeechPlaying = $state(false);

	const speak = () => {
		const speech = new SpeechSynthesisUtterance(text); // * Docs: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
		speech.voice = voices[192] as any; // comment this line to use default `voices[0]`
		speech.lang = 'en-US'; // Set language
		// speech.lang = 'hi-IN'; // Set language
		speech.rate = 1; // Adjust speed (0.1 to 10)
		speech.pitch = 1; // Adjust pitch (0 to 2)
		speech.volume = 1; // Adjust volume (0 to 1)

		speech.onend = (event) => {
			// console.log('✅Speech has finished');
			isSpeechPlaying = false;
		};

		window.speechSynthesis.speak(speech);
		isSpeechPlaying = true;
	};

	const stopSpeaking = () => {
		window.speechSynthesis.cancel();
		// console.log('✅Speech is cancelled');
		isSpeechPlaying = false;
	};
	// window.speechSynthesis.speaking (true when speaking)
</script>

<h1 class="mb-3 text-3xl font-bold">TTS and STT</h1>
<!-- / // & Speakers -->
<div class="mb-5 text-xs text-gray-400">
	<div>
		Description: TTS using `window.SpeechSynthesisUtterance` and STT using
		`window.SpeechRecognition`.
	</div>

	<div class="mt-2 text-[0.6rem] text-orange-400 underline">
		Learn: I tried to implment download as mp3/wav and searched on google, stackoverflow and claude
		but <strong>nothing worked (no working solutions)</strong>.
	</div>

	<div class="text-[0.6rem]">
		<div class="mt-2 font-bold underline">My favorite speakers:</div>
		<li>FEMALE: 191 (treble), 192 (warm)</li>
		<li>MALE: 193 (warm)</li>
		<li class="italic">
			[TODO: Try Rishi (en-IN) with rate 1.5 and pitch 1.2],
			<a
				class="underline"
				href="https://mdn.github.io/dom-examples/web-speech-api/speak-easy-synthesis/"
				target="_blank">test in this playground</a
			>
		</li>
	</div>
</div>

<div class="my-1">Text: <input bind:value={text} class="w-full rounded-md border px-2 py-1" /></div>

<!-- For debugging `isSpeechplaying` -->
<!-- Status: {isSpeechPlaying} -->

<button
	class={`rounded ${!isSpeechPlaying ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'} px-4 py-2 font-bold text-white transition duration-300 ease-in-out`}
	onclick={!isSpeechPlaying ? speak : stopSpeaking}
	aria-label="speak"
>
	{!isSpeechPlaying ? 'speak' : 'stop'}
</button>

<button
	class="rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-blue-600"
	onclick={transcribe}
>
	transcribe
</button>

<hr class="my-8" />

<button
	class="mb-2 rounded bg-pink-300 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-pink-500"
	onclick={() => (showAvailableVoices = !showAvailableVoices)}
>
	{showAvailableVoices ? 'Hide' : 'Show'}
	Available Voices
</button>

{#if showAvailableVoices}
	<table class="border-collapse border">
		<thead>
			<tr>
				<th class="border p-2">Name</th>
				<th class="border p-2">Lang</th>
				<th class="border p-2">Default</th>
				<th class="border p-2">Local Service</th>
				<th class="border p-2">Voice URI</th>
			</tr>
		</thead>
		<tbody>
			{#each voices as voice, i}
				<tr>
					<td class="border p-2">{i}</td>
					<td class="border p-2">{voice.name}</td>
					<td class="border p-2">{voice.lang}</td>
					<td class="border p-2">{voice.default}</td>
					<td class="border p-2">{voice.localService}</td>
					<td class="border p-2">{voice.voiceURI}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
