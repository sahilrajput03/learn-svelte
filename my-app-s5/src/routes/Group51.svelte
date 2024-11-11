<!-- 59/75 -->
<!-- https://svelte.dev/tutorial/svelte/dimensions -->

<script>
	let w = $state();
	let h = $state();
	let size = $state(42);
</script>

<p class="mb-3 font-bold text-purple-600">
	You can add <code>clientWidth</code> , <code>clientHeight</code> , <code>offsetWidth</code> and
	<code>offsetHeight</code> bindings to any element, and Svelte will update the bound values using a
	ResizeObserver:
</p>

<label>
	<input type="range" bind:value={size} min="10" max="100" />
	font size ({size}px)
</label>

<br />

<div bind:clientWidth={w} bind:clientHeight={h}>
	<span style="font-size: {size}px" contenteditable> edit this text </span>

	<span class="size">{w} x {h}px</span>
</div>

<p class="mt-10 text-orange-600">
	ALERT: These bindings are readonly — changing the values of w and h won’t have any effect on the
	element.
</p>

<p class="mt-5 italic" style="color: brown">
	ALERT: display: inline elements do not have a width or height (except for elements with
	‘intrinsic’ dimensions, like &lt;img /&gt; and &lt;canvas/&gt;), and cannot be observed with a
	ResizeObserver. You will need to change the display style of these elements to something else,
	such as inline-block.
</p>

<style>
	div {
		position: relative;
		display: inline-block;
		padding: 0.5rem;
		background: hsla(15, 100%, 50%, 0.1);
		border: 1px solid hsl(15, 100%, 50%);
	}

	.size {
		position: absolute;
		right: -1px;
		bottom: -1.4em;
		line-height: 1;
		background: hsl(15, 100%, 50%);
		color: white;
		padding: 0.2em 0.5em;
		white-space: pre;
	}
</style>
