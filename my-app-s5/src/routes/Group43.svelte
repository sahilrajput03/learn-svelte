<script lang="ts">
	import OpenFileInVscode from './OpenFileInVscode.svelte';
</script>

<!-- 51/75 -->
<!-- https://svelte.dev/tutorial/svelte/passing-snippets -->

<p>
	The only thing necessary for the triumph of evil is for good men to do nothing. ~ Edmund Burke
</p>

<br />

<p>Todo:</p>

<OpenFileInVscode relativeFilePath={(import.meta.hot as any)?.ownerPath} />
