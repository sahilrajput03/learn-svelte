<script lang="ts">
	let m = { x: 0, y: 0 };

	// MouseEvent? https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.mouseevent.html
	function handleMousemove(event: MouseEvent) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
	let m2 = { x: 0, y: 0 };

	function greet() {
		alert('Hello Pikachu.');
	}
</script>

<h1>Listeners Handling</h1>

<div class="mouse-area" on:mousemove={handleMousemove} style="background: deeppink">
	Mouse Position: {m.x} x {m.y}
</div>

<!--
	* INLINE EVENT HANDLERS *
	Update: I think right statement from Svelte is outdated as it seems to syntax highlight without
						any quote at all (amazing Svelte). =>  ALSO: The quote marks are optional, but they're
						helpful for syntax highlighting in some environments
						 
	Edge over react for inline functions. In svelte there is no need to avoid
					inline event handlers for performance reasons, particularly inside loops.
					In Svelte — the compiler will always do the right thing, whichever form
					you choose i.e., inline or full function definition. -->
<div
	class="mouse-area"
	style="background: aquamarine"
	on:mousemove={(e) => (m2 = { x: e.clientX, y: e.clientY })}
>
	Mouse Position: {m2.x} x {m2.y} (using inline event handler)
</div>

<h3>Event Modifier Chapter</h3>
<div>Keeping it here for easy reference later on.</div>
<img src="/event-modifier-chapter.png" width="400" alt="Lovely chapter" />

<h3>Modifiers</h3>
DOM event handlers can have modifiers that alter their behaviour. For example, a handler with a
<code>once</code>
modifier will only run once irrespective of number of times it is clicked:
<button on:click|once={greet}>Click me</button>

<style>
	.mouse-area {
		padding: 1.5rem 2rem;
		display: inline-block;
	}
	code {
		color: darkgreen;
		font-weight: bolder;
	}
</style>
