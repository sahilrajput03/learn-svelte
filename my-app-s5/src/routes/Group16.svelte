<!-- 23/45 -->
<!-- https://svelte.dev/tutorial/svelte/component-events -->

<script lang="ts">
	import OpenFileInVscode from './OpenFileInVscode.svelte';
	import Stepper from './Stepper.svelte';

	let value = $state(0);
</script>

<p>The current value is {value}</p>

<Stepper increment={() => (value += 1)} decrement={() => (value -= 1)} />

<OpenFileInVscode relativeFilePath={(import.meta.hot as any)?.ownerPath} />
