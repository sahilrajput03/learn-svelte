<!-- 64/75 -->
<!-- https://svelte.dev/tutorial/svelte/svelte-document -->

<script lang="ts">
	let selection = $state('');

	const onselectionchange = (e: any) => {
		selection = document?.getSelection?.()?.toString() as any;
	};
</script>

<svelte:document {onselectionchange} />

<h1>Select this text to fire events</h1>
<p>Selection: {selection}</p>

<div class="mt-5 text-red-600 underline">
	Note: Avoid mouseenter and mouseleave handlers on this element, as these events are not fired on
	document in all browsers. Use &lt;svelte:body&gt; instead.
</div>
