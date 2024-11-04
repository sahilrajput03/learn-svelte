<!-- 12/45 -->

<script lang="ts">
	import Nested2 from './Nested2.svelte';
	import OpenFileInVscode from './OpenFileInVscode.svelte';
</script>

<Nested2 answer={'42'} />
<Nested2 />

<OpenFileInVscode relativeFilePath={(import.meta.hot as any)?.ownerPath} />
