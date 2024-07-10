<script lang="ts">
	const emojis: Record<string, string> = {
		apple: '🍎',
		banana: '🍌',
		carrot: '🥕',
		doughnut: '🍩',
		egg: '🥚'
	};

	// `name` is updated whenever the prop value changes...
	export let name = '<no_name>';

	// and if you don't set id to #each argument then you'll
	// notice emoji varialbe is not getting updated properly
	// similar to id mismatch issue in react.
	const emoji = emojis[name];
</script>

<p>
	<span>The emoji for {name} is {emoji}</span>
</p>

<style>
	p {
		margin: 0.8em 0;
	}
	span {
		display: inline-block;
		padding: 0.2em 1em 0.3em;
		text-align: center;
		border-radius: 0.2em;
		background-color: #ffdfd3;
	}
</style>
