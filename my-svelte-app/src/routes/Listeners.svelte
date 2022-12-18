<script lang="ts">
	let m = { x: 0, y: 0 };

	// MouseEvent? https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.mouseevent.html
	function handleMousemove(event: MouseEvent) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
	let m2 = { x: 0, y: 0 };
</script>

<div
	on:mousemove={handleMousemove}
	style="background: deeppink; padding: 3rem 5rem; display: inline-block; width: 40vw"
>
	Hover in this region to get mouse position is {m.x} x {m.y}
</div>

<!-- **INLINE EVENT HANDLERS** -->
<!-- UPDATE -- I think right statement from Svelte is outdated as it seems to syntax highlight without any quote at all (amazing Svelte). =>  ALSO: The quote marks are optional, but they're helpful for syntax highlighting in some environments. -->
<!-- BONUS(Svelte is *better* than react): In some frameworks you may see recommendations to avoid inline event handlers for performance reasons, particularly inside loops. That advice doesn't apply to Svelte — the compiler will always do the right thing, whichever form you choose. -->
<div
	style="background: aquamarine; padding: 3rem 5rem; display: inline-block; width: 40vw"
	on:mousemove={(e) => (m2 = { x: e.clientX, y: e.clientY })}
>
	The mouse position is {m2.x} x {m2.y} (using inline event handler)
</div>

<h3>Event Modiier Chapter</h3>
<img src="/event-modifier-chapter.png" alt="Lovely chapter">