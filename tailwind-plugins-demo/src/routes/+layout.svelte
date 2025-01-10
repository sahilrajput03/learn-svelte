<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="p-5">
	{@render children()}
</div>
