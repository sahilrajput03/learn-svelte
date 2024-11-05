<!-- 25/45 -->
<!-- https://svelte.dev/tutorial/svelte/text-inputs -->

<script lang="ts">
	let name = $state('world');
</script>

<input bind:value={name} />

<h1>Hello {name}!</h1>

<style>
	input {
		border: 1px solid black;
	}
</style>
