<script>
	import Forms1 from './Forms1.svelte';
	import Forms2 from './Forms2.svelte';
	import Typography from './Typography.svelte';
</script>

<h1 class="mb-10 text-2xl font-bold">Tailwind Plugins Demo by Sahil Rajput</h1>
<!-- Typography Docs: https://github.com/tailwindlabs/tailwindcss-typography -->

<p class="font-bold underline">Plugins:</p>
<ul class="prose pl-3">
	<li>
		<code>@tailwindcss/typography</code>
		<a href="https://github.com/tailwindlabs/tailwindcss-typography" target="_blank">
			Typography Docs
		</a>
	</li>
	<li><code>@tailwindcss/forms</code></li>
	<li><code>@tailwindcss/container-queries</code></li>
</ul>

<h2 class="mb-[50px] mt-[80px] bg-black text-3xl font-bold text-white">Tailwindcss Typography</h2>
<Typography />

<h2 class="mt-[80px] bg-black text-3xl font-bold text-white">Tailwindcss Forms</h2>
<Forms1 />
<Forms2 />
