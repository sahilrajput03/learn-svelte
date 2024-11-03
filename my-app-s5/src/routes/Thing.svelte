<!-- This file is consumed in file://./Group11.svelte -->
<script lang="ts">
	const emojis: Record<string, string> = {
		apple: '🍎',
		banana: '🍌',
		carrot: '🥕',
		doughnut: '🍩',
		egg: '🥚'
	};

	// `name` is updated whenever the prop value changes...
	type PropsType = { name: string };
	let { name }: PropsType = $props();

	// ...but `emoji` is fixed upon initialisation
	const emoji = emojis[name];
</script>

<p>{emoji} = {name}</p>
