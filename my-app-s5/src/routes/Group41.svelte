<!-- 49/75 -->
<!-- https://svelte.dev/tutorial/svelte/reactive-builtins -->

<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';
	import OpenFileInVscode from './OpenFileInVscode.svelte';

	let date = new SvelteDate();

	const pad = (n: number) => (n < 10 ? '0' + n : n);

	$effect(() => {
		const interval = setInterval(() => {
			date.setTime(Date.now());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<p>The time is {date.getHours()}:{pad(date.getMinutes())}:{pad(date.getSeconds())}</p>

<OpenFileInVscode relativeFilePath={(import.meta.hot as any)?.ownerPath} />
