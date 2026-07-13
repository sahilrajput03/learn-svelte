<script lang="ts">
	import { onMount } from 'svelte';
	import source from './Group2.svelte?raw';
	// import source2 from './Shared.svelte?raw'; // works [TESTED✅]
	import { codeToHtml } from 'shiki';
	import { shikiThemes } from '$lib/shiki-utils';
	import { sleep } from '$lib/time-utils';

	let html = $state('');
	let themeName = $state('');
	let themeIndex = $state();

	// ❤️ My Notes of Shiki:
	// https://docs.google.com/document/d/1OgimIPsmCXVlR2B6HI3YSbkDGqyYGwhaCpqOToeKSJg

	onMount(async () => {
		// Docs: Supported Langs: https://shiki.style/languages
		const lang = 'svelte'; // Eg., 'js', 'svelte', etc.
		// html = await codeToHtml(source, { lang: lang, theme: 'nord'  })

		// Checking out different themes from shikiThemes array
		while (true) {
			for (let i = 0; i < shikiThemes.length; i++) {
				themeIndex = i;
				const element = shikiThemes[i];
				html = await codeToHtml(source, { lang: lang, theme: element.id });
				themeName = element.name;
				await sleep(2_000);
			}
		}
	});

	// Implementing copy feature via ChatGPT (https://chatgpt.com/c/6a54f43e-7850-83ee-98e7-dab2d6cd635a)
	let copyButtonText = $state('Copy');

	async function copy() {
		await navigator.clipboard.writeText(source);
		copyButtonText = 'Copied ✅';
		setTimeout(() => (copyButtonText = 'Copy'), 2_000);
	}
</script>

<div class="text-2xl font-bold">File: `Group2.svelte`</div>

<div class="italic text-gray-500">
	Note: In this file I have setup a slideshow to show different themes of Shiki syntax highlighter.
	It will change the theme every few seconds as specified in the code of this file.
</div>

<h1 class="mt-3 font-bold">{themeIndex} {themeName}</h1>
<!-- {@html html} -->

<div class="personal16 relative">
	<button class="absolute right-1 top-1 z-[10] rounded-md bg-white/40 px-2 py-1" onclick={copy}>
		{copyButtonText}
	</button>
	{@html html}
</div>

<style>
	/* To show line numbers. (Note: If I don't use :global below css
		doesn't work apply to the shiki code even though the css is
		actually output the html file.
		ChatGPT: https://chatgpt.com/c/6a542c9f-a6e4-83ee-a882-821954590238 )
		✅ Check :global in your Learn Svelte Doc for more svelte docs links and notes.
	*/

	:global {
		.personal16 {
			.shiki .line {
				counter-increment: line;
			}
			.shiki .line::before {
				content: counter(line);
				display: inline-block;
				width: 3em;
				margin-right: 1em;
				color: #888;
				text-align: right;
			}
		}
	}
</style>
