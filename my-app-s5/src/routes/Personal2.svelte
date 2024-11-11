<script lang="ts">
	let isTouch = $state(false);
</script>

<div class="text-xl font-bold">Touch and Hold Feature for mobile and desktop</div>

<li>
	For mobile: `ontouchstart` and `ontouchend` only fires on mobile (<a
		class=" text-blue-600 underline"
		href="https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events"
	>
		touch events
	</a>)
</li>
<li>For desktop: `onmousedown` and `onmouseup` only fires on desktop</li>

<button
	class="btn-primary mt-2 w-full"
	onmousedown={() => (isTouch = true)}
	onmouseup={() => (isTouch = false)}
	ontouchstart={(event) => (isTouch = true)}
	ontouchend={(event) => (isTouch = false)}
>
	{isTouch ? 'touched' : 'Please touch me and hold'}
</button>
