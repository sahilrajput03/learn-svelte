import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { writeProjectPathToFile } from './sahil.utils'

// Sahil's utils to help support feature --- open current component file in vscode directly from browser.
writeProjectPathToFile()

// default code
export default defineConfig({
	plugins: [sveltekit()],
});
