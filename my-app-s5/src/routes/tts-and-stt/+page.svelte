<script lang="ts">
	import { getVoices } from '$lib/speechRecognitionUtil';
	import { onMount } from 'svelte';
	import type { VoiceT } from '../../types';

	let voices: VoiceT[] = $state([]);
	let showAvailableVoices = $state(!!0);

	onMount(async () => {
		voices = (await getVoices()) as VoiceT[];
	});

	let text = $state('Whispers of autumn in the breeze,\nGolden leaves dance with gentle ease.');

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

	const speak = () => {
		const speech = new SpeechSynthesisUtterance(text); // * Docs: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
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
</script>

<h1 class="mb-3 text-3xl font-bold">TTS and STT</h1>
<div class="mb-5 text-xs text-gray-400">
	Description: TTS using `window.SpeechSynthesisUtterance` and STT using `window.SpeechRecognition`.
</div>

<div class="my-1">Text: <input bind:value={text} class="w-full rounded-md border px-2 py-1" /></div>

<button
	class="rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-blue-600"
	onclick={speak}
	aria-label="speak"
>
	speak
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
