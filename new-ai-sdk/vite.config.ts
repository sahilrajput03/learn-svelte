import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
	test: {
		workspace: [
			{
				extends: './vite.config.ts',
				plugins: [svelteTesting()],
				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	},
	server: {
		allowedHosts: ['mypot.in', 'ai.mypot.in']
	},
	// Necessary otherwise we get below message on terminal:
	// 		7:28:29 PM [vite-plugin-svelte] src/routes/+layout.svelte:17:1 No scopable elements found in template. If you're using global styles in the style tag, you should move it into an external stylesheet file and import it in JS. See https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/faq.md#where-should-i-put-my-global-styles.
	// 		7:28:31 PM [vite-plugin-svelte] src/routes/+layout.svelte:17:1 No scopable elements found in template. If you're using global styles in the style tag, you should move it into an external stylesheet file and import it in JS. See https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/faq.md#where-should-i-put-my-global-styles.
	// 		7:28:31 PM [vite] (client) ✨ new dependencies optimized: clsx, @ai-sdk/ui-utils, @ai-sdk/provider-utils, zod
	// 		7:28:31 PM [vite] (client) ✨ optimized dependencies changed. reloading
	// 		The file does not exist at "/Users/apple/Documents/github_repos/learn-svelte/new-ai-sdk/node_modules/.vite/deps/chunk-2IFVHVDX.js?v=b45d3cec" which is in the optimize deps directory. The dependency might be incompatible with the dep optimizer. Try adding it to `optimizeDeps.exclude`.
	// 		The file does not exist at "/Users/apple/Documents/github_repos/learn-svelte/new-ai-sdk/node_modules/.vite/deps/chunk-YJCN6N7D.js?v=b45d3cec" which is in the optimize deps directory. The dependency might be incompatible with the dep optimizer. Try adding it to `optimizeDeps.exclude`.
	optimizeDeps: {
		exclude: [
			'lightningcss.android-arm64.node'
		]
	}
});
