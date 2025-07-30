<script lang="ts">
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

<div>Enter time in seconds.</div>

<input class="input-primary" bind:value={audioIntervalLengthSeconds} />

<button onclick={startAudioInterval}>Tinger</button>

<hr class="my-10" />

<div class="ml-3 text-xs italic">
	<div class="text-lg font-bold not-italic underline">Learnings</div>
	<div class="mt-3 text-green-500">
		1. Learn: Requests work even when chrome is in background on mobile or mobile screen is locked.
	</div>
	<div class="mt-3 text-red-500">
		2. Learn: A webpage can’t speak—speechSynthesis needs a foreground document. (from ChatGPT -
		https://chatgpt.com/c/688908f9-7a18-8007-89d8-6aba9e767dd5)
	</div>
	<div class="mt-3 text-red-500">
		3. Learn (Failed to install `tts` package on linode 30 july 2025): Make use of coqui API to
		produce speech via your mypot linode server.
	</div>
</div>

<style>
	input {
		width: 100px;
		text-align: center;
	}
	button {
		width: 100px;
		border: 1px solid grey;
		border-radius: 20px;
	}
</style>
