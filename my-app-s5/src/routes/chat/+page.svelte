<!-- Src - https://svelte.dev/docs/svelte/lifecycle-hooks#Deprecated:-beforeUpdate-afterUpdate-Chat-window-example -->
<!-- Check the `AFTER` link for below code. -->
<script lang="ts">
	import { tick } from 'svelte';
	import type { KeyboardEventHandler } from 'svelte/elements';

	let theme = $state('dark');
	let messages = $state([
		'welcome to runechat!',
		'this is a place to hang out and talk about runes'
	]);

	let viewport: HTMLDivElement;

	$effect.pre(() => {
		messages;

		// Sahil: We use value `50` (px) such that we only scroll to bottom if the has
		// scrolled 2 or less messages (rought equals to 50px <2x24=48px>).
		const autoscroll =
			viewport && viewport.offsetHeight + viewport.scrollTop > viewport.scrollHeight - 50;

		// $inspect('viewport.offsetHeight?', viewport.offsetHeight);
		// $inspect('viewport.scrollTop?', viewport.scrollTop);

		if (autoscroll) {
			tick().then(() => {
				viewport.scrollTo(0, viewport.scrollHeight);
			});
		}
	});

	function handleKeydown(event: any) {
		if (event.key === 'Enter') {
			const text = event.target.value;
			if (!text) return;

			messages = [...messages, text];
			event.target.value = '';
		}
	}

	function toggle() {
		theme = theme === 'dark' ? 'light' : 'dark';
	}
</script>

<div class="chat" class:dark={theme === 'dark'}>
	<div class="viewport" bind:this={viewport}>
		<h1>runechat</h1>
		{#each messages as message}
			<p>{message}</p>
		{/each}
	</div>

	<input placeholder="type message here" onkeydown={handleKeydown} />

	<button onclick={toggle}> Toggle dark mode </button>
</div>

<style>
	:global(body) {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.viewport {
		flex: 1 1 auto;
		margin: 0 0 0.5em 0;
		overflow-y: auto;
		outline: 1px solid red;
	}

	.chat {
		--bg: white;
		--fg: black;
		display: flex;
		flex-direction: column;
		height: 480px;
		width: 320px;
		max-width: 100%;
		gap: 0.5em;
		border: 1px solid black;
		background: var(--bg);
		padding: 1em;
		border-radius: 0.5em;
		box-sizing: border-box;
	}

	.chat.dark {
		--bg: black;
		--fg: white;
	}

	h1 {
		color: var(--fg);
		font-size: 3em;
		padding: 1em 0 1em 0;
		margin: 0;
		border-bottom: 1px solid #999;
	}

	p {
		color: var(--fg);
	}

	button,
	input {
		font-family: inherit;
		font-size: inherit;
		padding: 0.3em;
		border-radius: 4px;
		border: 1px solid #999;
	}
</style>
