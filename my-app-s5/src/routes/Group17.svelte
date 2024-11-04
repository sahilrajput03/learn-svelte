<!-- 24/45 -->
<!-- https://svelte.dev/tutorial/svelte/spreading-events -->

<script lang="ts">
	import BigRedButton from './BigRedButton.svelte';
	import OpenFileInVscode from './OpenFileInVscode.svelte';

	const greet = () => {
		alert('Hi!');
	};
</script>

<BigRedButton onclick={greet} />

<OpenFileInVscode relativeFilePath={(import.meta.hot as any)?.ownerPath} />
