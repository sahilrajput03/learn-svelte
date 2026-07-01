<script lang="ts">
	import source from './Personal15.svelte?raw';
	import Prism from 'prismjs';

	// import 'prismjs/components/prism-javascript';
	import { onMount } from 'svelte';

	// ✅ [TESTED] Learn: Using night owl theme: (https://www.npmjs.com/package/prism-theme-night-owl)
	import 'prism-theme-night-owl/build/style.css';

	// Learn: Using default prism theme:
	// import 'prismjs/themes/prism.css';
	// import 'prismjs/themes/prism.min.css'; // 👈 Use this if you want to use minified version.

	// Learn: The important thing is to import only one theme, for example:
	// import "prismjs/themes/prism-dark.css";
	// import "prismjs/themes/prism-okaidia.css";
	// import "prismjs/themes/prism-tomorrow.css";
	// import "prismjs/themes/prism-twilight.css";
	// import "prismjs/themes/prism-coy.css";
	// import "prismjs/themes/prism-solarizedlight.css";

	let name = 'Prismjs';
	let string = `this string contains some <strong>HTML!!!</strong>`;

	const code = `
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
`.trim();

	let language = 'javascript';

	onMount(() => {
		Prism.highlightAll();
	});
</script>

<h1>Hello {name.toUpperCase()}!</h1>

<p>This is a paragraph.</p>

<p>{string}</p>
<!-- Docs of {@html ...} https://svelte.dev/docs/svelte/@html -->
<p>{@html string}</p>

<hr class="my-5" />

<pre>
  <!-- <code class="language-javascript">{code}</code> -->
  <!-- <code class="language-javascript">{source.trim()}</code> -->
  <code class="language-html">{source.trim()}</code>

  <!-- ❌ ❌ ❌ ❌ -->
  <!-- ☹️ ☹️ ☹️ ☹️  Prism doesn't support svelte right now: https://github.com/PrismJS/prism/issues/2090 -->
  <!-- Thus below "language-svelte" is not yet supported. Why?  -->
  <!-- <code class="language-svelte">{source.trim()}</code> -->
</pre>

<style>
	p {
		color: goldenrod;
		font-family: 'Comic Sans MS', cursive;
	}
</style>
