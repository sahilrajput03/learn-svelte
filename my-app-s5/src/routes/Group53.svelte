<!-- 61/75 -->
<!-- https://svelte.dev/tutorial/svelte/component-bindings -->

<script>
	import Keypad from './Keypad.svelte';

	let pin = $state('');

	let view = $derived(pin ? pin.replace(/\d(?!$)/g, '•') : 'enter your pin');

	function onsubmit() {
		alert(`submitted ${pin}`);
	}
</script>

<h1 style="opacity: {pin ? 1 : 0.4}">
	{view}
</h1>

<Keypad bind:value={pin} {onsubmit} />

<p class="mt-4 font-bold text-orange-600">
	Note: Use component bindings sparingly. It can be difficult to track the flow of data around your
	application if you have too many of them, especially if there is no ‘single source of truth’.
</p>
