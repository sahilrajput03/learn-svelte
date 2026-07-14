<script lang="ts">
	import { shikiThemes } from '$lib/shiki-utils';
	import axios from 'axios';
	import { codeToHtml } from 'shiki';
	import { onMount } from 'svelte';

	let html = $state('');

	onMount(() => {
		async function main() {
			const { data } = await axios.get('/codexp');
			console.log('🚀 ~ data?', data);

			// shiki (Refer file `Personal16.svelte`)
			const lang = 'ts'; // Eg., 'js', 'svelte', etc.
			html = await codeToHtml(data.code, { lang: lang, theme: 'dark-plus' });
		}
		main();
	});
</script>

{@html html}
