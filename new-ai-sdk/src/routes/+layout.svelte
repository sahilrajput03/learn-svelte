<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}

<style>
	/* Sahil: `:root` is an alias for `html` */
	:root {
		/* We must set bottom margin AND padding to 0px on html element
		otherwise it causes issues with the chat input box  while typing
		on mobile android (TESTED). */
		margin: 0px 20px;
	}
</style>
