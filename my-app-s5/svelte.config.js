import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'; // from `npx sv create`

// Note: I tried to use non-type typescript features by tying the method in docs but that doesn't seem tot work at the moment. Source: https://svelte.dev/docs/svelte/typescript#Preprocessor-setup
// To use non-type-only TypeScript features within Svelte components, you need to add a preprocessor that will turn TypeScript into JavaScript.
// import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		version: {
			// Sahil: I added this inspired by sveltekit tutorial: https://svelte.dev/tutorial/kit/updated-store
			pollInterval: 10_000
		}
	},

	// `SVELTE-VITE INSPECTOR`
	// `npm install --save-dev @sveltejs/vite-plugin-svelte`
	// Docs: https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/inspector.md
	vitePlugin: {
		inspector: {
			toggleKeyCombo: 'meta-shift', // shortcut to trigger inspector. Use `Esc` to cancel
			showToggleButton: 'always',
			toggleButtonPos: 'bottom-right'
		}
	}
};

export default config;
