import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// This is useful for having absolute project path to open any file in vscode.
const writeProjectPathToFile = () => {
	// Convert import.meta.url to a path
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const targetFile = path.join(__dirname, 'src', 'projectPath.ts');
	const content = `export const projectPath = "${__dirname}"`;

	fs.writeFileSync(targetFile, content);
}
writeProjectPathToFile()

// default code
export default defineConfig({
	plugins: [sveltekit()],
});
