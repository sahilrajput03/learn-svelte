<!-- 19/45 -->
<!-- https://svelte.dev/tutorial/svelte/await-blocks -->

<script lang="ts">
	import OpenFileInVscode from './OpenFileInVscode.svelte';
	import { roll } from './utils';

	let promise = $state(roll());
</script>

<button class="btn-primary" onclick={() => (promise = roll())}> roll the dice </button>

{#await promise}
	<p>...rolling</p>
{:then number}
	<p>you rolled a {number}!</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<hr />
<br />
<br />
<br />

Without using a catch block in markup -

{#await promise then number}
	<p>you rolled a {number}!</p>
{/await}

<OpenFileInVscode relativeFilePath={(import.meta.hot as any)?.ownerPath} />
