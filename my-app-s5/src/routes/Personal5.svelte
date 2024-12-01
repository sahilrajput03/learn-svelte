<script lang="ts">
	import { onMount } from 'svelte';

	let deviceWidth = $state();
	let deviceHeight = $state();

	function resizeCallback() {
		deviceWidth = window.innerWidth;
		deviceHeight = window.innerHeight;
	}

	onMount(() => {
		resizeCallback();
		window.addEventListener('resize', resizeCallback);
		return () => window.removeEventListener('resize', resizeCallback);
	});
</script>

<div class="text-3xl">Hello personal 5</div>

Device Width: {deviceWidth}
<br />
Device Height: {deviceHeight}
