<script lang="ts">
	import axios from 'axios';
	import { codeToHtml } from 'shiki';
	import { onMount } from 'svelte';

	let html = $state('');
	let isFullscreen = $state(false);
	let canFullscreen = $state(true);
	let container: HTMLDivElement | null = null;

	async function toggleFullscreen() {
		if (!container || !document.fullscreenEnabled) return;

		if (document.fullscreenElement) {
			await document.exitFullscreen();
			return;
		}

		await container.requestFullscreen();
	}

	onMount(() => {
		async function main() {
			const { data } = await axios.get('/codexp');
			console.log('🚀 ~ data?', data);

			// shiki (Refer file `Personal16.svelte`)
			const lang = 'ts'; // Eg., 'js', 'svelte', etc.
			html = await codeToHtml(data.code, { lang: lang, theme: 'dark-plus' });
		}

		canFullscreen = document.fullscreenEnabled;
		const handleFullscreenChange = () => {
			isFullscreen = document.fullscreenElement === container;
		};

		document.addEventListener('fullscreenchange', handleFullscreenChange);
		main();

		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
		};
	});
</script>

<a
	class="text-blue-600"
	href="https://docs.google.com/document/d/1xvTciF4eBG5bqDbROXvnmHAPLX4nZQXdZnr4LKIyVAM/edit?tab=t.0"
	target="_blank">Google Doc - Why a code browser for mobile?</a
>

<div bind:this={container} class="codexp-page">
	<div class="code-content">
		{@html html}
	</div>

	{#if canFullscreen}
		<button
			class="fullscreen-button"
			type="button"
			onclick={toggleFullscreen}
			aria-label={isFullscreen ? 'Exit full screen' : 'Enter full screen'}
		>
			{isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
		</button>
	{/if}
</div>

<style>
	.codexp-page {
		position: relative;
	}

	.code-content {
		width: 100%;
		/* ❤️ */
	}

	.codexp-page:fullscreen {
		width: 100%;
		height: 100%;
		overflow: auto;
		background: #111827;
	}

	/* For mobile */
	@media (max-width: 400px) {
		.code-content {
			font-size: 0.5rem;
		}
		.codexp-page:fullscreen {
			padding-left: 4px;
			padding-bottom: 20px;
		}
	}

	.codexp-page:fullscreen .code-content {
		min-height: 100%;
	}

	.fullscreen-button {
		position: fixed;
		right: 1rem;
		bottom: 1rem;
		z-index: 50;
		border-radius: 9999px;
		background: rgba(15, 23, 42, 0.9);
		color: white;
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		line-height: 1;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
	}

	.fullscreen-button:hover {
		background: rgba(15, 23, 42, 1);
	}
</style>
