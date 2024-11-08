<!-- 66/75 -->
<!-- https://svelte.dev/tutorial/svelte/svelte-head -->

<script>
	const themes = ['margaritaville', 'retrowave', 'spaaaaace', 'halloween'];
	let selected = $state(themes[0]);
</script>

<svelte:head>
	<link rel="stylesheet" href="https://svelte.dev/tutorial/stylesheets/{selected}.css" />
</svelte:head>

<h1>Welcome to my site!</h1>

<select bind:value={selected}>
	<option disabled>choose a theme</option>

	{#each themes as theme}
		<option>{theme}</option>
	{/each}
</select>

<div class="mt-20 bg-slate-100 px-3">
	Note: In server-side rendering (SSR) mode, contents of &lt;svelte:head&gt; are returned separately
	from the rest of your HTML.
</div>
