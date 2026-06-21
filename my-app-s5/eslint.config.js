import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

// & Get all eslint warnings by running:  `npx eslint .`

export default ts.config(
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		rules: {
			'svelte/no-at-html-tags': 'off', // 20 June 2026
			'@typescript-eslint/no-unused-vars': 'off', // 20 June 2026
			'@typescript-eslint/no-explicit-any': 'off', // 20 June 2026
			// Learn: I'm disabling this because unused-expressions
			// 		  are useful in $effect to use as dependency in .svelte
			// 		  files. (20 June 2026)
			'@typescript-eslint/no-unused-expressions': 'off',
			// Below rule it allow use of `Function` as type.
			'@typescript-eslint/no-unsafe-function-type': 'off',
		},
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		files: ['**/*.ts'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	}
);
