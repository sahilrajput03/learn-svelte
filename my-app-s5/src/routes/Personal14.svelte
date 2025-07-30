<script lang="ts">
	import { getTime, speak } from '$lib/speak';

	let audioInterval: NodeJS.Timeout | null = $state(null);
	let audioIntervalLengthSeconds = $state(3);

	async function playDing() {
		// ! Learn: A webpage can’t speak—speechSynthesis needs a foreground document. (from ChatGPT - https://chatgpt.com/c/688908f9-7a18-8007-89d8-6aba9e767dd5)
		// ! Learn (Failed to install `tts` package on linode 30 july 2025): Make use of coqui API to produce speech via your mypot linode server.
		// speak('Time is ' + getTime());

		// Learn: Requests work even when chrome is in background on mobile or mobile screen is locked.
		// await axiosInstance.get('/'); // works even when screen is locked.

		const audio = new Audio('/ding.mp3');
		audio.play().catch((e) => {
			console.warn('Audio play was prevented by the browser:', e);
		});
	}

	function startAudioInterval() {
		if (audioInterval) {
			clearInterval(audioInterval);
		}
		playDing();
		audioInterval = setInterval(playDing, audioIntervalLengthSeconds * 1_000);
	}
</script>

<h1 class="mb-2 text-2xl font-bold">Tinger</h1>

<span>Seconds:</span>

<input type="tel" class="input-primary" bind:value={audioIntervalLengthSeconds} />

<button class=" border-none bg-pink-400 text-white" onclick={startAudioInterval}>Tinger</button>

<hr class="my-10" />

<div class="ml-3 text-xs">
	<div class="text-lg font-bold underline">Learnings</div>
	<div class="mt-1 text-green-500">
		1. Learn: ✅ HTTP requests work even when chrome is in background on mobile and even when mobile
		screen is locked.
	</div>
	<div class="mt-1 text-red-500">
		2. Learn: A webpage can’t speak via <code class="bg-black px-1 text-white"
			>window.speechSynthesis</code
		> because the webpage needs to be in foreground only. (from ChatGPT - https://chatgpt.com/c/688908f9-7a18-8007-89d8-6aba9e767dd5)
	</div>
	<div class="mt-1 text-red-500">
		3. Learn (Failed to install <code class="bg-black px-1 text-white">tts</code> package on linode on
		30 July 2025) for the intention of making coqui API to produce speech via your mypot linode server.
	</div>
</div>

<style>
	input {
		width: 100px;
		text-align: left;
		border-radius: 1rem;
		border-color: gray;
		font-size: 0.875rem;
	}
	button {
		width: 100px;
		border-radius: 20px;
	}
</style>
