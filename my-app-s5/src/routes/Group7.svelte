<!-- 14/45 -->
<script lang="ts">
	import OpenFileInVscode from './OpenFileInVscode.svelte';

	let count = $state(0);

	function increment() {
		count += 1;
	}
</script>

<button class="btn-primary" onclick={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

{#if count > 10}
	<p>{count} is greater than 10</p>
{/if}

<OpenFileInVscode relativeFilePath={(import.meta.hot as any)?.ownerPath} />
