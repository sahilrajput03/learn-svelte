<!-- 38/45 -->
<!-- https://svelte.dev/tutorial/svelte/transition -->

<script lang="ts">
	import { fade } from 'svelte/transition';

	let visible = $state(true);
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<!-- Using `transition` directive. -->
	<p transition:fade>
		Transition: Fades in and out.
		<br />
		Great software is art, great business is art. Starting a new country at some level is art. Art can
		not be forced. In a sense art is done for its own sake. Its not done for any external purpose. If
		you're doing it for money, its you're hurting its capability to be art. It can still be a great art
		though. ~ Naval (Ranveer's Show)
	</p>
{/if}
