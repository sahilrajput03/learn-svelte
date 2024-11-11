<script lang="ts">
	let position = $state(0);
	let isRecording = $state(false);

	let isTouch = $state(false);

	const handleCursorPosition = (e: any) => {
		console.log('Caret at: ', e.target.selectionStart);
		position = e.target.selectionStart;
	};
</script>

<div>
	<h1 class="text-xl font-bold">Text box with character position tracking</h1>

	<button
		class="btn-primary mt-2 w-full"
		onmousedown={() => (isTouch = true)}
		onmouseup={() => (isTouch = false)}
		ontouchstart={(event) => (isTouch = true)}
		ontouchend={(event) => (isTouch = false)}
	>
		{isTouch ? 'touched' : 'Please touch me and hold to record'}
	</button>

	<button
		class="btn-primary record-button mt-3 w-full"
		onclick={() => (isRecording = !isRecording)}
	>
		{isRecording ? 'recording now and input disabled' : 'Start recording'}
	</button>

	<hr />
	Position: {position}
	<br />

	<textarea
		style="width: 100%; border: 1px solid black;"
		disabled={isRecording || isTouch}
		id="foobar"
		rows="8"
		{...{
			// For both mobile (i.e, one tap) and desktop
			// onClick={handleCursorPosition}
		}}
		{...{
			// For touch devices (mobile) when touch and move the cursor as that doesn't triger `onClick`
		}}
		onblur={handleCursorPosition}
	></textarea>
</div>
