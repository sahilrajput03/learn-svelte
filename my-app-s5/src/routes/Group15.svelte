<!-- 22/45 -->
<!-- https://svelte.dev/tutorial/svelte/capturing -->

<div>
	Bubbling (default) - the `input` handler runs first, as the event ‘bubbles’ from the target up to
	the document, followed by the outer handler.
</div>
<div onkeydown={(e) => alert(`<div> ${e.key}`)} role="presentation">
	<input onkeydown={(e) => alert(`<input> ${e.key}`)} />
</div>

<br />
<hr />
<br />

<div>Capturing - Now, the relative order is reversed.</div>
<div onkeydowncapture={(e) => alert(`<div> ${e.key}`)} role="presentation">
	<input onkeydowncapture={(e) => alert(`<input> ${e.key}`)} />
</div>

<br />
<hr />
<br />

<div>
	Bubbling + Capturing - If both capturing and non-capturing handlers exist for a given event, the
	capturing handlers will run first
</div>
<div
	onkeydown={(e) => alert(`bubbling handler: <div> ${e.key}`)}
	onkeydowncapture={(e) => alert(`capturing handler: <div> ${e.key}`)}
	role="presentation"
>
	<input
		onkeydown={(e) => alert(`bubbling handler: <input> ${e.key}`)}
		onkeydowncapture={(e) => alert(`capturing handler: <input> ${e.key}`)}
	/>
</div>

<style>
	input {
		border: 2px solid black;
	}
</style>
