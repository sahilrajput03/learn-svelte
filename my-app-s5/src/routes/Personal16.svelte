<script lang="ts">
	import { onMount } from 'svelte';
	import source from './Group2.svelte?raw';
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
</script>

<div class="text-2xl font-bold">File: `Group2.svelte`</div>

<h1 style="font-weight: bold">{themeIndex} {themeName}</h1>
{@html html}

<style>
</style>
