<!-- 21/45 -->
<!-- https://svelte.dev/tutorial/svelte/inline-handlers -->

<script lang="ts">
	let m = $state({ x: 0, y: 0 });
</script>

<div
	onpointermove={(event) => {
		m.x = event.clientX;
		m.y = event.clientY;
	}}
>
	The pointer is at {Math.round(m.x)} x {Math.round(m.y)}
</div>

<style>
	div {
		border: 1px solid grey;
		position: fixed;
		left: 50px;
		right: 50px;
		top: 270px;
		bottom: 100px;
		padding: 1rem;
	}
</style>
