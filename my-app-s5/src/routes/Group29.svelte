<!-- 37/45 -->
<!-- https://svelte.dev/tutorial/svelte/adding-parameters-to-actions -->
<script lang="ts">
	import tippy from 'tippy.js';

	let content = $state('Hello!');

	function tooltip(node: any, fn: any) {
		console.log('tooltip action'); //& runs only once
		$effect(() => {
			console.log('tooltip $effect'); //& runs with every character add/delete in the input
			const buttonTooltip: any = tippy(node, fn());

			return buttonTooltip.destroy;
		});
	}
</script>

<input bind:value={content} />

<!-- / //& We’re passing in a function, rather than the options themselves, because the tooltip function does not re-run when the options change. -->
<button class="btn-primary" use:tooltip={() => ({ content })}> Hover me </button>

<style>
	input {
		border: 1px solid black;
	}
	:global {
		[data-tippy-root] {
			--bg: #666;
			background-color: var(--bg);
			color: white;
			border-radius: 0.2rem;
			padding: 0.2rem 0.6rem;
			filter: drop-shadow(1px 1px 3px rgb(0 0 0 / 0.1));

			* {
				transition: none;
			}
		}

		[data-tippy-root]::before {
			--size: 0.4rem;
			content: '';
			position: absolute;
			left: calc(50% - var(--size));
			top: calc(-2 * var(--size) + 1px);
			border: var(--size) solid transparent;
			border-bottom-color: var(--bg);
		}
	}
</style>
