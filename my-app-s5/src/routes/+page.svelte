<script module>
	export const idOfComponentToShow = $state<{ value: string | null }>({ value: null });
</script>

<script lang="ts">
	import { onMount, tick, type Component } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	// ChatGPT: https://chatgpt.com/c/6a46754e-7488-83ee-b0ad-fcb922dc6cf4
	// Note: This is necessary so that Vite can find the files and include them in the build.
	// 		Note: The pattern `'$lib/**/*.ts'` matches files like:
	// 			`files['$lib/time-utils.ts'], files['$lib/components/Button.svelte']`.
	const currentDirAndParentDirFiles = import.meta.glob(['./*.svelte', './*.ts', '../*.ts'], {
		query: '?raw',
		import: 'default',
	});

	//	Note: We get below error if we try to import `./lib/**/*.ts` instead of `./lib/*.ts`:
	//			❌ Build failed in 17.56s		error during build:
	//				Cannot import $lib/server/database.ts?raw into client-side code:
	//				Cannot import $lib/server/database.ts?raw into client-side code:
	let libFilesWithSrcDirectoryPrefix = import.meta.glob(['$lib/*.ts'], {
		query: '?raw',
		import: 'default',
	});
	// Converting paths from `/src/lib` to `./lib`.
	const libFiles = Object.fromEntries(
		Object.entries(libFilesWithSrcDirectoryPrefix).map(([path, loader]) => [
			path.replace('/src/lib', './lib'),
			loader,
		]),
	);
	const files = { ...currentDirAndParentDirFiles, ...libFiles };

	// Note: Keep below commented code as it as it is useful for debugging.
	// console.log('🚀 ~ files?', typeof files, Array.isArray(files)); // 'object', false
	// const loader = files['./Group2.svelte'];
	// if (loader) {
	// 	loader().then((source) => {
	// 		console.log('🚀 ~ source?', source);
	// 	});
	// }

	import OpenFileInVscode from './OpenFileInVscode.svelte';
	import Group1 from './Group1.svelte';
	import Group2 from './Group2.svelte';
	import Group3 from './Group3.svelte';
	import Group4 from './Group4.svelte';
	import Group5 from './Group5.svelte';
	import Group6 from './Group6.svelte';
	import Group7 from './Group7.svelte';
	import Group8 from './Group8.svelte';
	import Group9 from './Group9.svelte';
	import Group10 from './Group10.svelte';
	import Group11 from './Group11.svelte';
	import Group12 from './Group12.svelte';
	import Group13 from './Group13.svelte';
	import Group14 from './Group14.svelte';
	import Group15 from './Group15.svelte';
	import Group16 from './Group16.svelte';
	import Group17 from './Group17.svelte';
	import Group18 from './Group18.svelte';
	import Group19 from './Group19.svelte';
	import Group20 from './Group20.svelte';
	import Group21 from './Group21.svelte';
	import Group22 from './Group22.svelte';
	import Group23 from './Group23.svelte';
	import Group24 from './Group24.svelte';
	import Group25 from './Group25.svelte';
	import Group26 from './Group26.svelte';
	import Group27 from './Group27.svelte';
	import Group27b from './Group27b.svelte';
	import Group28 from './Group28.svelte';
	import Group29 from './Group29.svelte';
	import Group30 from './Group30.svelte';
	import Group31 from './Group31.svelte';
	import Group32 from './Group32.svelte';
	import Group33 from './Group33.svelte';
	import Group34 from './Group34.svelte';
	import Group35 from './Group35.svelte';
	import Group36 from './Group36.svelte';
	import Group37 from './Group37.svelte';
	import Group38 from './Group38.svelte';
	import Group39 from './Group39.svelte';
	import Group40 from './Group40.svelte';
	import Group41 from './Group41.svelte';
	import Group42 from './Group42.svelte';
	import Group43 from './Group43.svelte';
	import Group44 from './Group44.svelte';
	import Group45 from './Group45.svelte';
	import Group46 from './Group46.svelte';
	import Group47 from './Group47.svelte';
	import Group48 from './Group48.svelte';
	import Group49 from './Group49.svelte';
	import Group50 from './Group50.svelte';
	import Group61 from './Group61.svelte';
	import Group61b from './Group61b.svelte';
	import Group62 from './Group62.svelte';
	import Group63 from './Group63.svelte';
	import Group64 from './Group64.svelte';
	import Group65 from './Group65.svelte';
	import Group66 from './Group66.svelte';
	import Group67 from './Group67.svelte';
	import Group68 from './Group68.svelte';
	import Group69 from './Group69.svelte';
	import Group51 from './Group51.svelte';
	import Personal1 from './Personal1.svelte';
	import Personal2 from './Personal2.svelte';
	import Personal3 from './Personal3.svelte';
	import Personal4 from './Personal4.svelte';
	import Personal5 from './Personal5.svelte';
	import Personal6 from './Personal6.svelte';
	import Personal7 from './Personal7.svelte';
	import Personal6a from './Personal6a.svelte';
	import Personal8 from './Personal8.svelte';
	import Personal9 from './Personal9.svelte';
	import Group52 from './Group52.svelte';
	import Group53 from './Group53.svelte';
	import Group54 from './Group54.svelte';
	import Group55 from './Group55.svelte';
	import Group56 from './Group56.svelte';
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import { pushState, replaceState } from '$app/navigation';
	import Example1 from './Example1.svelte';
	import { copyToClipboard } from './utils';
	import Flexbox1 from './Flexbox1.svelte';
	import Flexbox2 from './Flexbox2.svelte';
	import Grid1 from './Grid1.svelte';
	import Personal10 from './Personal10.svelte';
	import Personal11 from './Personal11.svelte';
	import Personal12 from './Personal12.svelte';
	import Personal13 from './Personal13.svelte';
	import Personal14 from './Personal14.svelte';
	import Personal15 from './Personal15.svelte';
	import Personal16 from './Personal16.svelte';
	import { codeToHtml } from 'shiki';
	import Personal17 from './Personal17.svelte';

	type ComponentsItemType = {
		id: string;
		name: string;
		component: Component;
		svelteTutorialLink?: string;
		// This is used to show code in browser.
		sourceFiles?: Array<{
			title: string;
			path: string;
		}>;
	};

	let isLoading = $state(true);
	// UUID Generator: https://www.uuidgenerator.net/
	let componentItems = $state<Array<ComponentsItemType>>([
		{
			id: 'eba91667-1fba-485c-aa2e-2e9e1551b4ad',
			name: 'Group1 - Using Component, Renderig strings and string as html via {@html ...} tag',
			component: Group1,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/your-first-component',
			sourceFiles: [
				{
					title: 'Group1.svelte',
					path: './Group1.svelte',
				},
				{
					title: 'Nested.svelte',
					path: './Nested.svelte',
				},
			],
		},
		{
			id: '441ec256-772d-4358-b77e-6ed751e884c0',
			name: 'Group2 - $state() and $derived()',
			component: Group2,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/state',
			sourceFiles: [
				{
					title: 'Group2.svelte',
					path: './Group2.svelte',
				},
			],
		},
		{
			id: '716f326e-60ae-40a2-b4a5-6c8f1bc928ea',
			name: 'Group3 - $effect and its cleanup function',
			component: Group3,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/effects',
			sourceFiles: [
				{
					title: 'Group3.svelte',
					path: './Group3.svelte',
				},
			],
		},
		{
			id: '550384e7-fd76-49ea-80ae-86ce56332938',
			name: 'Group4 - ❤️ Shared state (Global state) among components',
			component: Group4,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/universal-reactivity',
			sourceFiles: [
				{
					title: 'Group4.svelte',
					path: './Group4.svelte',
				},
				{
					title: 'Counter.svelte',
					path: './Counter.svelte',
				},
				{
					title: 'shared.svelte.ts',
					path: './shared.svelte.ts',
				},
			],
		},
		{
			id: 'a753be95-04ef-43dc-9a79-35523901e594',
			name: 'Group5 - Component Props and defautl prop values',
			component: Group5,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/declaring-props',
			sourceFiles: [
				{
					title: 'Group5.svelte',
					path: './Group5.svelte',
				},
				{
					title: 'Nested2.svelte',
					path: './Nested2.svelte',
				},
			],
		},
		{
			id: '3187d34b-83ac-412a-b50a-a347cc1c8c11',
			name: 'Group6 - Passing all props in a single object via destructuring syntax',
			component: Group6,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/spread-props',
			sourceFiles: [
				{
					title: 'Group6.svelte',
					path: './Group6.svelte',
				},
				{
					title: 'PackageInfo.svelte',
					path: './PackageInfo.svelte',
				},
			],
		},
		{
			id: 'db337049-a1c4-4ff1-9d96-ecc34b4a809d',
			name: 'Group7 - {#if exp} ... {/if}',
			component: Group7,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/if-blocks',
			sourceFiles: [
				{
					title: 'Group7.svelte',
					path: './Group7.svelte',
				},
			],
		},
		{
			id: 'd71a5a4d-284c-4168-964c-24fe656e4191',
			name: 'Group8 - {#if exp} ... {:else} ...{/if}',
			component: Group8,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/else-blocks',
			sourceFiles: [
				{
					title: 'Group8.svelte',
					path: './Group8.svelte',
				},
			],
		},
		{
			id: '61035e17-6b4c-4f4b-ba10-08a8321cbb79',
			name: 'Group9 - {#if exp} ... {:else if exp} ... {:else} ...{/if}',
			component: Group9,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/else-if-blocks',
			sourceFiles: [
				{
					title: 'Group9.svelte',
					path: './Group9.svelte',
				},
			],
		},
		{
			id: '146aa966-2786-4573-986f-ca15241b7382',
			name: 'Group10 - {#each iterable as item, i} ... {/each} ',
			component: Group10,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/each-blocks',
			sourceFiles: [
				{
					title: 'Group10.svelte',
					path: './Group10.svelte',
				},
				{
					title: 'NotesEach.svelte',
					path: './NotesEach.svelte',
				},
			],
		},
		{
			id: '5c4ff3ff-e7ff-46e5-907c-e71acec1e99d',
			name: 'Group11 - {#each iterable as item (key)} ... {/each}',
			component: Group11,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/keyed-each-blocks',
			sourceFiles: [
				{
					title: 'Group11.svelte',
					path: './Group11.svelte',
				},
				{
					title: 'Thing.svelte',
					path: './Thing.svelte',
				},
				{
					title: 'NotesEach.svelte',
					path: './NotesEach.svelte',
				},
			],
		},
		{
			id: 'cd15a183-ada6-4ae7-9e5f-dc17bb8a8dbc',
			name: 'Group12 - {#await promise then number} ... {/await} AND {#await promise} ... {:then number} ... {:catch error} ... {/await}',
			component: Group12,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/await-blocks',
			sourceFiles: [
				{
					title: 'Group12.svelte',
					path: './Group12.svelte',
				},
				{
					title: 'utils.ts',
					path: './utils.ts',
				},
			],
		},
		{
			id: '48134d23-1e26-40f7-aa29-f96620d0d74b',
			name: 'Group13 - onpointermove (DOM Event handler)',
			component: Group13,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/dom-events',
			sourceFiles: [
				{
					title: 'Group13.svelte',
					path: './Group13.svelte',
				},
			],
		},
		{
			id: '6603b0fd-6f1d-4d86-8431-dfa3c11ae91d',
			name: 'Group14 - onpointermove (Inline DOM Event handler)',
			component: Group14,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/inline-handlers',
			sourceFiles: [
				{
					title: 'Group14.svelte',
					path: './Group14.svelte',
				},
			],
		},
		{
			id: 'd63f7ba9-3997-4f26-98e6-e31905a8b87f',
			name: 'Group15 - Event Bubbling and Event Capture ',
			component: Group15,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/capturing',
			sourceFiles: [
				{
					title: 'Group15.svelte',
					path: './Group15.svelte',
				},
			],
		},
		{
			id: '6e61a046-3a14-456c-a6da-d7efbdd5a68c',
			name: 'Group16 - Passing event handler functions as props to components',
			component: Group16,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/component-events',
			sourceFiles: [
				{
					title: 'Group16.svelte',
					path: './Group16.svelte',
				},
				{
					title: 'Stepper.svelte',
					path: './Stepper.svelte',
				},
				{
					title: 'types.ts',
					path: '../types.ts',
				},
			],
		},
		{
			id: 'c6421585-e2fa-4471-98fc-833171ec2873',
			name: 'Group17 - Spread event handlers directly onto elements using {...props}',
			component: Group17,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/spreading-events',
			sourceFiles: [
				{
					title: 'Group17.svelte',
					path: './Group17.svelte',
				},
				{
					title: 'BigRedButton.svelte',
					path: './BigRedButton.svelte',
				},
			],
		},
		{
			id: '2eb14b30-2aae-4cc8-aabd-44fe42562129',
			name: 'Group18 - `bind:value={..} usage in <input />`',
			component: Group18,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/text-inputs',
			sourceFiles: [
				{
					title: 'Group18.svelte',
					path: './Group18.svelte',
				},
			],
		},
		{
			id: '99c809b5-0dd8-4ef4-8235-b4cac44779bb',
			name: 'Group19 - Automatically coercion of `value` in <input type="number" bind:value />',
			component: Group19,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/numeric-inputs',
			sourceFiles: [
				{
					title: 'Group19.svelte',
					path: './Group19.svelte',
				},
			],
		},
		{
			id: 'ca0a9af5-4e39-4349-b76d-fe18242324d1',
			name: 'Group20 - <input type="checkbox" bind:checked={yes} />',
			component: Group20,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/checkbox-inputs',
			sourceFiles: [
				{
					title: 'Group20.svelte',
					path: './Group20.svelte',
				},
			],
		},
		{
			id: '41b81e92-1528-4531-a285-b91b056e83dc',
			name: 'Group21 - <select bind:value={selected}> <option value={...}> ... </option> </select>',
			component: Group21,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/select-bindings',
			sourceFiles: [
				{
					title: 'Group21.svelte',
					path: './Group21.svelte',
				},
			],
		},
		{
			id: 'ff05c34c-71bc-48f4-9771-fec5a262ac2f',
			name: 'Group22 - Group inputs: checkbox and radio buttons',
			component: Group22,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/group-inputs',
			sourceFiles: [
				{
					title: 'Group22.svelte',
					path: './Group22.svelte',
				},
			],
		},
		{
			id: '347d6a45-4e91-4917-90cd-13cd6c993faf',
			name: 'Group23 - Multiple-select-bindings',
			component: Group23,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/multiple-select-bindings',
			sourceFiles: [
				{
					title: 'Group23.svelte',
					path: './Group23.svelte',
				},
			],
		},
		{
			id: 'b1aa53b2-d6c8-42c8-8bd8-4e77322960c4',
			name: 'Group24 - <textarea bind:value></textarea>',
			component: Group24,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/textarea-inputs',
			sourceFiles: [
				{
					title: 'Group24.svelte',
					path: './Group24.svelte',
				},
			],
		},
		{
			id: '12e02a97-95b6-45c9-9266-ec52ebb7ae91',
			name: 'Group25 - Class-shorthand e.g, class:flipped',
			component: Group25,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/classes',
			sourceFiles: [
				{
					title: 'Group25.svelte',
					path: './Group25.svelte',
				},
			],
		},
		{
			id: 'eb7b4f1b-17b2-4320-b236-4e9166d27696',
			name: 'Group26 - Inline style attributes. Example: style:top="200px" and style:--bg-1="palegoldenrod"',
			component: Group26,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/styles',
			sourceFiles: [
				{
					title: 'Group26.svelte',
					path: './Group26.svelte',
				},
			],
		},
		{
			id: 'fe70755f-a3f9-4bc9-a148-72dc4f7d5636',
			name: 'Group27 - Influence the styles inside a child component via escape hatch — a last resort using `:global` CSS modifier',
			component: Group27,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/component-styles',
			sourceFiles: [
				{
					title: 'Group27.svelte',
					path: './Group27.svelte',
				},
				{
					title: 'Box1.svelte',
					path: './Box1.svelte',
				},
			],
		},
		{
			id: '81c97196-2f42-4e6d-81c8-84db422aea3e',
			name: 'Group28 - Using action functions - Painting (<Canvas />)',
			component: Group28,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/actions',
			sourceFiles: [
				{
					title: 'Group28.svelte',
					path: './Group28.svelte',
				},
				{
					title: 'Canvas.svelte',
					path: './Canvas.svelte',
				},
				{
					title: 'actions.svelte.ts',
					path: './actions.svelte.ts',
				},
			],
		},
		{
			id: 'd8830d46-8687-4bc9-8669-68a44c6dab63',
			name: 'Group29 - Passing arguments to action function',
			component: Group29,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/adding-parameters-to-actions',
			sourceFiles: [
				{
					title: 'Group29.svelte',
					path: './Group29.svelte',
				},
			],
		},
		{
			id: '8912382c-5128-4434-9317-a3237d3038cb',
			name: 'Group30 - <p transition:fade> Fades in and out </p>',
			component: Group30,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/transition',
			sourceFiles: [
				{
					title: 'Group30.svelte',
					path: './Group30.svelte',
				},
			],
		},
		{
			id: '37c1949b-e444-4df6-87bc-2c9b69fb9187',
			name: 'Group31 - <p transition:fly={{ y: 100, duration: 2000 }}> Fly in and out </p>',
			component: Group31,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/adding-parameters-to-transitions',
			sourceFiles: [
				{
					title: 'Group31.svelte',
					path: './Group31.svelte',
				},
			],
		},
		{
			id: '7f99ece2-fdf0-484d-9423-b5af73537d6d',
			name: 'Group32 - <p in:fly={{ y: 200, duration: 2000 }} out:fade> Flies in, fades out </p>',
			component: Group32,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/in-and-out',
			sourceFiles: [
				{
					title: 'Group32.svelte',
					path: './Group32.svelte',
				},
			],
		},
		{
			id: '16d2c96a-36b0-4210-94c0-4e914b008821',
			name: 'Group33 - custom-css-transitions - Spin effect',
			component: Group33,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/custom-css-transitions',
			sourceFiles: [
				{
					title: 'Group33.svelte',
					path: './Group33.svelte',
				},
			],
		},
		{
			id: 'd47c3877-bf7e-49bf-b22d-2d4f2b739026',
			name: 'Group34 - custom-css-transitions - Typewriter effect',
			component: Group34,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/custom-js-transitions',
			sourceFiles: [
				{
					title: 'Group34.svelte',
					path: './Group34.svelte',
				},
			],
		},
		{
			id: '6bf0211c-d1bc-4c04-8288-6a20cc09a375',
			name: 'Group35 - transition-events: onintrostart, onoutrostart, onintroend & onoutroend',
			component: Group35,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/transition-events',
			sourceFiles: [
				{
					title: 'Group35.svelte',
					path: './Group35.svelte',
				},
			],
		},
		{
			id: '6becc251-e61c-4266-86e4-aa23df0e2f60',
			name: 'Group36 - Using `|global` modifier the transition plays also when any non-direct element is added or removed',
			component: Group36,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/global-transitions',
			sourceFiles: [
				{
					title: 'Group36.svelte',
					path: './Group36.svelte',
				},
			],
		},
		{
			id: '5d84afde-9c3c-442e-b185-f6f2035b7901',
			name: 'Group37 - ❤️ {#key i} ... {/key} - Play transitions on expression change instead of only when the element enters or leaves the DOM',
			component: Group37,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/key-blocks',
			sourceFiles: [
				{
					title: 'Group37.svelte',
					path: './Group37.svelte',
				},
				{
					title: 'transition.ts',
					path: './transition.ts',
				},
				{
					title: 'loading-messages.ts',
					path: './loading-messages.ts',
				},
			],
		},
		{
			id: 'fbe541a0-9821-4569-bfc3-081b22f1702b',
			name: 'Group38 - Use `$state.raw(..)` when there’s no need for state to be deeply reactive as it will be discarded a few milliseconds later - Stock Price Chart',
			component: Group38,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/raw-state',
			sourceFiles: [
				{
					title: 'Group38.svelte',
					path: './Group38.svelte',
				},
				{
					title: 'utils.ts',
					path: './utils.ts',
				},
				{
					title: 'data.ts',
					path: './data.ts',
				},
			],
		},
		{
			id: '1ddd0a16-1abf-4f1f-8d96-56e696c41b47',
			name: 'Group39 - Make properties of classes reactive',
			component: Group39,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/reactive-classes',
			sourceFiles: [
				{
					title: 'Group39.svelte',
					path: './Group39.svelte',
				},
			],
		},
		{
			id: 'b3597b67-71ad-475a-804e-908d8d833038',
			name: 'Group40 - Make private properties of class reactive; getters and setters',
			component: Group40,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/getters-and-setters',
			sourceFiles: [
				{
					title: 'Group40.svelte',
					path: './Group40.svelte',
				},
			],
		},
		{
			id: 'ea05dcd8-020b-4408-bef9-d9f0a4759a3c',
			name: 'Group41 - `new SvelteDate()` - Reactive builtins',
			component: Group41,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/reactive-builtins',
			sourceFiles: [
				{
					title: 'Group41.svelte',
					path: './Group41.svelte',
				},
			],
		},
		{
			id: 'c0916f32-7569-431d-8cef-c8fd8160c564',
			name: 'Group42 - SNIPPET: Encapsulate markup in a reusable block',
			component: Group42,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/snippets-and-render-tags',
			sourceFiles: [
				{
					title: 'Group42.svelte',
					path: './Group42.svelte',
				},
			],
		},
		{
			id: '7c8e8faf-9d2b-400c-98c0-bc06e4ea72cf',
			name: 'Group43 - SNIPPET: Passing snippets to components',
			component: Group43,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/passing-snippets',
			sourceFiles: [
				{
					title: 'Group43.svelte',
					path: './Group43.svelte',
				},
				{
					title: 'FilteredList.svelte',
					path: './FilteredList.svelte',
				},
				{
					title: 'data2.ts',
					path: './data2.ts',
				},
			],
		},
		{
			id: 'f946f320-e5c0-4925-8633-d0593a9942bd',
			name: 'Group44 - SNIPPET: Implicit snippet props',
			component: Group44,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/implicit-snippet-props',
			sourceFiles: [
				{
					title: 'Group44.svelte',
					path: './Group44.svelte',
				},
				{
					title: 'FilteredList2.svelte',
					path: './FilteredList2.svelte',
				},
				{
					title: 'data2.ts',
					path: './data2.ts',
				},
			],
		},
		{
			id: 'eb51009a-752d-4add-863e-acdd4b8a1a7a',
			name: 'Group45 - STORE: `const countStore = writable(0)` AND `countStore.update((n) => n - 1)`',
			component: Group45,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/introducing-stores',
			sourceFiles: [
				{
					title: 'Group45.svelte',
					path: './Group45.svelte',
				},
				{
					title: 'Counter2.svelte',
					path: './Counter2.svelte',
				},
			],
		},
		{
			id: '60e223b4-be6e-401a-b9af-b0d5cd31414d',
			name: 'Group46 - STORE: Tweened values',
			component: Group46,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/tweens',
			sourceFiles: [
				{
					title: 'Group46.svelte',
					path: './Group46.svelte',
				},
			],
		},
		{
			id: '7c80d947-8de0-479e-8f75-1ad46539c85b',
			name: 'Group47 - STORE: Springs',
			component: Group47,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/springs',
			sourceFiles: [
				{
					title: 'Group47.svelte',
					path: './Group47.svelte',
				},
			],
		},
		{
			id: 'f596a478-a3d9-488f-8581-1c861f23885a',
			name: 'Group48 - Contenteditable bindings (Advanced bindings-1)',
			component: Group48,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/contenteditable-bindings',
			sourceFiles: [
				{
					title: 'Group48.svelte',
					path: './Group48.svelte',
				},
			],
		},
		{
			id: '1a7fa115-e209-42ad-bafd-8290a0ed4712',
			name: 'Group49 - ❤️ Each block bindings (Advanced bindings-2)',
			component: Group49,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/each-block-bindings',
			sourceFiles: [
				{
					title: 'Group49.svelte',
					path: './Group49.svelte',
				},
			],
		},
		{
			id: '26e9cb93-82c3-457d-8fb8-830812ba0085',
			name: 'Group50 - Media elements (Advanced bindings-3)',
			component: Group50,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/media-elements',
			sourceFiles: [
				{
					title: 'Group50.svelte',
					path: './Group50.svelte',
				},
				{
					title: 'AudioPlayer.svelte',
					path: './AudioPlayer.svelte',
				},
				{
					title: 'tracks.ts',
					path: './tracks.ts',
				},
			],
		},
		{
			id: '521f598a-586d-49a8-beae-21bc7b474d10',
			name: 'Group51 - Dimensions (Advanced bindings-4)',
			component: Group51,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/dimensions',
			sourceFiles: [
				{
					title: 'Group51.svelte',
					path: './Group51.svelte',
				},
			],
		},
		{
			id: '32b2687c-0181-43a0-bcf0-2a6928ab07ba',
			name: 'Group52 - This (Advanced bindings-5)',
			component: Group52,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/bind-this',
			sourceFiles: [
				{
					title: 'Group52.svelte',
					path: './Group52.svelte',
				},
				{
					title: 'gradient.ts',
					path: './gradient.ts',
				},
			],
		},
		{
			id: '15ac1920-5e41-4edd-8a91-ef46b93b095c',
			name: 'Group53 - ❤️ Component bindings (Advanced bindings-6)',
			component: Group53,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/component-bindings',
			sourceFiles: [
				{
					title: 'Group53.svelte',
					path: './Group53.svelte',
				},
				{
					title: 'Keypad.svelte',
					path: './Keypad.svelte',
				},
			],
		},
		{
			id: '535cd449-1477-4b0f-b97d-01486d979ca4',
			name: 'Group54 - Binding to component instances (Advanced bindings-7)',
			component: Group54,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/component-this',
			sourceFiles: [
				{
					title: 'Group54.svelte',
					path: './Group54.svelte',
				},
				{
					title: 'Canvas2.svelte',
					path: './Canvas2.svelte',
				},
				{
					title: 'actions.svelte.ts',
					path: './actions.svelte.ts',
				},
			],
		},
		{
			id: 'c682dd16-4104-4592-897f-f7a3bd1f966f',
			name: 'Group55 - Deferred transitions (Advanced TRANSITIONS)',
			component: Group55,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/deferred-transitions',
			sourceFiles: [
				{
					title: 'Group55.svelte',
					path: './Group55.svelte',
				},
				{
					title: 'TodoList.svelte',
					path: './TodoList.svelte',
				},
				{
					title: 'transition2.ts',
					path: './transition2.ts',
				},
			],
		},
		{
			id: '826b8bc2-fbfe-4d15-82b0-c321f242aa08',
			name: 'Group56 - Animations (Advanced TRANSITIONS)',
			component: Group56,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/animations',
			sourceFiles: [
				{
					title: 'Group56.svelte',
					path: './Group56.svelte',
				},
				{
					title: 'TodoList2.svelte',
					path: './TodoList2.svelte',
				},
				{
					title: 'transition2.ts',
					path: './transition2.ts',
				},
			],
		},
		{
			id: '0d9b50a7-30b1-41eb-9fc4-c7ded7cf2a5c',
			name: 'Group61 - setContext and getContext (Context API )',
			component: Group61,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/context-api',
			sourceFiles: [
				{
					title: 'Group61.svelte',
					path: './Group61.svelte',
				},
				{
					title: 'Canvas3.svelte',
					path: './Canvas3.svelte',
				},
				{
					title: 'Square.svelte',
					path: './Square.svelte',
				},
			],
		},
		{
			id: '594af2bf-3921-4127-91b5-ae14f2146e8e',
			name: 'Group61b - setContext and getContext with reactive state (Context API)',
			component: Group61b,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/context-api',
			sourceFiles: [
				{
					title: 'Group61b.svelte',
					path: './Group61b.svelte',
				},
				{
					title: 'Child1.svelte',
					path: './Child1.svelte',
				},
			],
		},
		{
			id: 'a6c77714-d470-4805-8b56-fa5bded49491	',
			name: 'Group62 - <svelte:window {onkeydown} />',
			component: Group62,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/svelte-window',
			sourceFiles: [
				{
					title: 'Group62.svelte',
					path: './Group62.svelte',
				},
			],
		},
		{
			id: 'ceca67cd-fbb5-47c5-9c81-180b240a4270',
			name: 'Group63 - <svelte:window bind:scrollY={y} />',
			component: Group63,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/svelte-window',
			sourceFiles: [
				{
					title: 'Group63.svelte',
					path: './Group63.svelte',
				},
			],
		},
		{
			id: 'd9822452-a113-4879-8473-bf8119475978',
			name: 'Group64 - <svelte:document {onselectionchange} /> ',
			component: Group64,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/svelte-document',
			sourceFiles: [
				{
					title: 'Group64.svelte',
					path: './Group64.svelte',
				},
			],
		},
		{
			id: 'c042662d-e1db-4743-b2c1-77a81b4763d7',
			name: 'Group65 - ❤️ <svelte:body onmouseenter={..} onmouseleave={...} /> ',
			component: Group65,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/svelte-body',
			sourceFiles: [
				{
					title: 'Group65.svelte',
					path: './Group65.svelte',
				},
			],
		},
		{
			id: 'a103ba54-7894-467b-ba62-e9feb927ea67',
			name: 'Group66 - <svelte:head> <link rel="stylesheet" href="MyStyle.css" /> </svelte:head>',
			component: Group66,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/svelte-head',
			sourceFiles: [
				{
					title: 'Group66.svelte',
					path: './Group66.svelte',
				},
			],
		},
		{
			id: 'd241b918-caa5-4208-b0bf-27b6aee8acd9',
			name: 'Group67 - <svelte:element this={"h1"}> ... </svelte:element>',
			component: Group67,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/svelte-element',
			sourceFiles: [
				{
					title: 'Group67.svelte',
					path: './Group67.svelte',
				},
			],
		},
		{
			id: 'bde71dd3-ca74-4b47-b9b6-f7633b86ca56',
			name: 'Group68 - <script module> - Sharing code',
			component: Group68,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/sharing-code',
			sourceFiles: [
				{
					title: 'Group68.svelte',
					path: './Group68.svelte',
				},
				{
					title: 'AudioPlayer2.svelte',
					path: './AudioPlayer2.svelte',
				},
				{
					title: 'tracks.ts',
					path: './tracks.ts',
				},
			],
		},
		{
			id: '1732aaa7-18bf-4647-8b32-a4917f08725f',
			name: 'Group69 - <script module> - Exports',
			component: Group69,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/module-exports',
			sourceFiles: [
				{
					title: 'Group69.svelte',
					path: './Group69.svelte',
				},
				{
					title: 'AudioPlayer2.svelte',
					path: './AudioPlayer2.svelte',
				},
				{
					title: 'tracks.ts',
					path: './tracks.ts',
				},
			],
		},
		{
			id: '15f7992e-886b-4bbb-af20-2ff0a3d41831',
			name: 'Personal1 - Record and then transcribe with OpenAI / Groq',
			component: Personal1,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal1.svelte',
					path: './Personal1.svelte',
				},
				{
					title: 'utils.ts',
					path: './utils.ts',
				},
			],
		},
		{
			id: '068d3ce6-7ab2-42d6-bbc1-d8b4c5ecafa7',
			name: 'Personal2 - Touch and Hold for Mobile and Desktop',
			component: Personal2,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal2.svelte',
					path: './Personal2.svelte',
				},
			],
		},
		{
			id: '934b6546-d1d6-4c04-b217-607bd598f3ad',
			name: 'Personal3 - Text box with character position tracking',
			component: Personal3,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal3.svelte',
					path: './Personal3.svelte',
				},
			],
		},
		{
			id: 'd7f24462-85af-402d-aa0b-81352a341a57',
			name: 'Personal4 - Query Params',
			component: Personal4,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal4.svelte',
					path: './Personal4.svelte',
				},
			],
		},
		{
			id: '1a26be0c-03ea-4c78-93e0-fdb779417104',
			name: 'Personal5 - Device Width and Height Detection',
			component: Personal5,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal5.svelte',
					path: './Personal5.svelte',
				},
			],
		},
		{
			id: '079324bb-e2ac-4ea2-a4cf-9d4c2259631d',
			name: 'Personal6 - Vocab Collector for Books',
			component: Personal6,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal6.svelte',
					path: './Personal6.svelte',
				},
			],
		},
		{
			id: 'b6db5b26-5ed6-4fd1-afa6-4d8ac7e46b93',
			name: 'Personal6a - Vocab Collector for Books',
			component: Personal6a,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal6a.svelte',
					path: './Personal6a.svelte',
				},
				{
					title: 'shared.svelte.ts',
					path: './shared.svelte.ts',
				},
			],
		},
		{
			id: 'd3608e5b-e42b-405f-967e-db14fd77a1f5',
			name: 'Personal7 - 💰 💰 UPI Links Testing (Result: Failure)',
			component: Personal7,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal7.svelte',
					path: './Personal7.svelte',
				},
			],
		},
		{
			id: '25ce4623-f71d-41ae-a773-3012d50ad3d1',
			name: 'Personal8 - HTML5 Video Player',
			component: Personal8,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal8.svelte',
					path: './Personal8.svelte',
				},
			],
		},
		// I failed to run this project on mobile (though desktop works quite fine)
		{
			id: '6b59a349-1a3b-4348-9c7b-f845b936e4dc',
			name: 'Personal9 - Plyr.js Video Player',
			component: Personal9,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal9.svelte',
					path: './Personal9.svelte',
				},
			],
		},
		{
			id: '8016167b-b219-4a8a-84b6-209a23aae7ca',
			name: 'Personal10 - Plyr.js Video Player (youtube embed)',
			component: Personal10,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal10.svelte',
					path: './Personal10.svelte',
				},
			],
		},
		{
			id: '454bcfd5-56a1-4977-aca6-efc1fe71e07d',
			name: 'Personal11 - YouTube embed player with auto-play',
			component: Personal11,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal11.svelte',
					path: './Personal11.svelte',
				},
			],
		},
		{
			id: 'f444ef6e-de55-4899-bc6f-10ff0e563675',
			name: 'Personal12 - ❤️ Dynamic <input> tags on button click',
			component: Personal12,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal12.svelte',
					path: './Personal12.svelte',
				},
			],
		},
		{
			id: 'Pc79ee606-0497-439e-bb8d-84be15428690',
			name: 'Personal13 - ❤️ Grab Video (http://whatwebcando.today)',
			component: Personal13,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal13.svelte',
					path: './Personal13.svelte',
				},
			],
		},
		{
			id: '62dc8903-8e4c-406c-987b-43b55068a011',
			name: 'Personal14 - 🚀Tinger',
			component: Personal14,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal14.svelte',
					path: './Personal14.svelte',
				},
				{
					title: 'lib/speak.ts',
					path: './lib/speak.ts',
				},
			],
		},
		{
			id: '55df1a39-1556-4cef-b67e-6cdd384e04ac',
			name: 'Personal15 - 🚀Prismjs (code rendering with syntax highlight - No Svelte Syntax Highlight Support)',
			component: Personal15,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal15.svelte',
					path: './Personal15.svelte',
				},
			],
		},
		{
			id: '8c83fd2b-7cff-4981-9121-797620a34f12',
			name: 'Personal16 - 🚀❤️❤️Shiki (code rendering with syntax highlight)',
			component: Personal16,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal16.svelte',
					path: './Personal16.svelte',
				},
				{
					title: 'lib/shiki-utils.ts',
					path: './lib/shiki-utils.ts',
				},
				{
					title: 'lib/time-utils.ts',
					path: './lib/time-utils.ts',
				},
			],
		},
		{
			id: 'cc575ef8-74c1-400e-8909-861b88628b63',
			name: 'Personal17 - bits-ui (select)',
			component: Personal17,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Personal17.svelte',
					path: './Personal17.svelte',
				},
			],
		},
		{
			id: '0f07e431-0f37-49a2-8109-d86ac4d3b544',
			name: 'Example1 - @debug tag',
			component: Example1,
			svelteTutorialLink: 'https://svelte.dev/playground/debug',
			sourceFiles: [
				{
					title: 'Example1.svelte',
					path: './Example1.svelte',
				},
			],
		},
		// TEMP NOTE: I added 4 itmes at once for easy of doing in batching
		{
			id: 'a96c896c-d8d6-4777-8ec3-6590e922ca59',
			name: 'Flexbox1',
			component: Flexbox1,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Flexbox1.svelte',
					path: './Flexbox1.svelte',
				},
			],
		},
		{
			id: 'bac43c67-18b1-4f2a-aed5-9e060bb2551f',
			name: 'Flexbox2',
			component: Flexbox2,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Flexbox2.svelte',
					path: './Flexbox2.svelte',
				},
			],
		},
		// {
		// 	id: '3ffdf39c-086f-43d8-a532-6c76155ef037',
		// 	name: 'Flexbox3',
		// 	component: Flexbox1,
		// 	svelteTutorialLink: ''
		// },
		// {
		// 	id: 'a0deb145-b81c-4042-a379-24e613d83624',
		// 	name: 'Flexbox4',
		// 	component: Flexbox1,
		// 	svelteTutorialLink: ''
		// },
		{
			id: 'a28ca0ee-427f-4f87-9d0c-d93d4f2b782a',
			name: 'Grid1',
			component: Grid1,
			svelteTutorialLink: '',
			sourceFiles: [
				{
					title: 'Grid1.svelte',
					path: './Grid1.svelte',
				},
			],
		},
		// {
		// 	id: '023ac469-234d-4522-b9a2-70cd1e24c621',
		// 	name: 'Grid2',
		// 	component: Grid1,
		// 	svelteTutorialLink: ''
		// }
	]);

	// console.log('here??', Math.random()); // This log (random number) is different on server log and client side log.

	// Note: `currentIndex` and `componentToShow` are automatic derived when `idOfComponentToShow.value` changes
	let componentToShow = $derived.by<ComponentsItemType>(() => {
		const comp = componentItems.find((ci) => ci.id === idOfComponentToShow.value);
		return comp ?? componentItems[0];
	});
	let indexOfComponentToShow = $derived.by(() => {
		return componentItems.findIndex((ci) => ci.id === componentToShow.id);
	});

	// ❤️ Lifecycle Hooks in svelte `onMount`:
	// https://svelte.dev/docs/svelte/lifecycle-hooks
	// https://svelte.dev/playground/onmount?version=5.1.9
	onMount(() => {
		console.log('onmount now....');
		isLoading = false;
		// & LEARN: I tried to use `$page.url.searchParams.get('id')` and it
		// &		was behaving weirdly as it wasn't considering the url as
		// &		the source of truth and thus discrepancies were there.

		// Fetch component-id from url search params
		const params = new URLSearchParams(window.location.search);
		const { id } = Object.fromEntries(params.entries());

		if (id) {
			idOfComponentToShow.value = id;
			// alert('got id, setting id = ' + idOfComponentToShow.value);
		} else {
			// alert('no id, setting id=0');
			idOfComponentToShow.value = componentItems[0].id;
			tick().then(() => {
				replaceState(`?id=${idOfComponentToShow.value}`, $page.state);
			});
		}

		const handlePopState = () => {
			// alert('here'); // Note: alert doesn't work well in pop state event.
			// console.log('popStateEvent');
			const params = new URLSearchParams(window.location.search);
			const { id } = Object.fromEntries(params.entries());
			idOfComponentToShow.value = id;
		};

		// Whenever browser's back or forward button is clicked below event is triggered
		window.addEventListener('popstate', handlePopState);

		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	});

	$effect(() => {
		console.log('effect now....');
	});

	// This function is also called in onselect on <select/> that's why its encapsulated
	const updateQuerySearchParams = (id: string) => {
		pushState(`?id=${id}`, $page.state);
	};

	const prev = () => {
		idOfComponentToShow.value = componentItems[indexOfComponentToShow - 1].id;
		updateQuerySearchParams(idOfComponentToShow.value);
	};
	const next = () => {
		idOfComponentToShow.value = componentItems[indexOfComponentToShow + 1].id;
		updateQuerySearchParams(idOfComponentToShow.value);
	};
	const goToFirst = () => {
		idOfComponentToShow.value = componentItems[0].id;
		updateQuerySearchParams(idOfComponentToShow.value);
	};
	const goToLast = () => {
		idOfComponentToShow.value = componentItems[componentItems.length - 1].id;
		updateQuerySearchParams(idOfComponentToShow.value);
	};

	let interval = $state(1000);
	let enableSlideshow = $state(false);
	$effect(() => {
		if (!enableSlideshow) return;

		const id = setInterval(() => {
			let isLastComponent = indexOfComponentToShow === componentItems.length - 1;
			if (isLastComponent) {
				clearInterval(id);
				enableSlideshow = false;
			} else {
				next();
			}
		}, interval);

		return () => clearInterval(id);
	});

	let uuid = $state();
	const generateUuidAndCopytoClipboard = () => {
		const newUuid = uuidv4();
		uuid = newUuid;
		copyToClipboard(newUuid);
	};

	let codeHtml = $state('');

	// ❤️ Refer your notes in `Personal16.svelte` file for more information on `Shikhi`.
	$effect(() => {
		// console.log('effeted');
		async function main() {
			codeHtml = '';
			for (const sourceFile of componentToShow?.sourceFiles ?? []) {
				// NOTE: Below statement works in development but not
				// 		 in production build. Thus I am using `files` object
				// 		 to get the source code of the component.
				// const code = (await import(`${sourceFile.path}?raw`)).default;
				// Using glob imported files via `files` variable works for both dev and production environment. [TESTED via `nr build; nr preview` command.]
				const code = (await files[sourceFile.path]()) as string;
				// Here `lang` would be `svelte` or `ts` or `js` and that would work as it is.
				const lang = sourceFile.path.split('.').pop() as any;
				const html = await codeToHtml(code, { lang, theme: 'dark-plus' });
				codeHtml += `<b>${sourceFile.title}</b><br/>${html}<div class="mb-5"></div>`;
			}
		}
		main();
	});

	// $inspect('selected?', componentToShow); // For debugging
</script>

<!--  Why am I using `id` (uuid) to sync the selected value of <select> element with localStorage instead of using array indexes like 0,1,2.. values.
//* Because I can't use `name` and `index` of array (componentItems) thus using `id` (uuid) to sync with localStorage is the only solution.

Why?
- `name`: When I use component.name to sync between $state and localStorage I am facing a bug i.e., when I change the name of the component the component sync the old component-id value from the local storage thus the component selector resets the current component to first component which is now what I want.
- `index` of the array of componentItems. I should never use index to
	sync between localStorage and state because then I would need to sync the index value
	to localStorage for the purpose of preserving the component on page refresh. Storing the 
	index value to localStorage is bad because value '0' isn't optimal to as we would need to
	typecast it to number type every time we fetch it AND '0' behaves as falsy value which
	is another disadvantage as when we need to see if there is already a stored value we 
	would need to check explicity via `typeof storedVariable !== 'undefined'` everywhere.
-->

<!-- Debug only -->
<!-- {idOfComponentToShow.value} -->

<h1 class="mb-2 text-3xl font-bold">Learn Svelte 5</h1>

{#if !isLoading}
	<div>
		<select
			class="max-w-full border border-solid border-[black]"
			bind:value={idOfComponentToShow.value}
			onchange={(e: any) => {
				updateQuerySearchParams(e.target?.value);
			}}
		>
			{#each componentItems as { id, name }}
				<option value={id}>
					{name}
				</option>
			{/each}
		</select>
		<button
			class="btn-primary bg-white text-xs"
			disabled={indexOfComponentToShow === 0}
			onclick={goToFirst}>First</button
		>
		<button
			class="btn-primary ms-5 bg-white text-xs"
			disabled={indexOfComponentToShow === 0}
			onclick={prev}>prev</button
		>

		<button
			class="btn-primary bg-white text-xs"
			disabled={indexOfComponentToShow === componentItems.length - 1}
			onclick={next}>next</button
		>
		<button
			class="btn-primary ms-5 bg-white text-xs"
			disabled={indexOfComponentToShow === componentItems.length - 1}
			onclick={goToLast}>Last</button
		>
	</div>
	<div class="mt-3 flex flex-wrap justify-end gap-x-2 gap-y-1 text-[0.675rem]">
		<a
			class="flex items-center text-right text-blue-600"
			target="_blank"
			href="https://github.com/sahilrajput03/learn-svelte/blob/main/my-app-s5/src/routes/{componentToShow.name.split(
				' ',
			)[0]}.svelte"
		>
			See {componentToShow.name.split(' ')[0]}.svelte on Github
			<img
				class="w-[20px]"
				src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
				alt="github here"
			/>
		</a>
		<!-- href="https://github.com/sahilrajput03/learn-svelte/tree/main/my-app-s5/src/routes" -->
		<!-- href="https://github.com/sahilrajput03/learn-svelte/blob/main/my-app-s5/src/routes/Group12.svelte" -->

		<a
			target="_blank"
			class="flex items-center text-right text-blue-600"
			href={componentToShow?.svelteTutorialLink}
			>See this tutorial on svelte.dev
			<img class="ms-[1px] w-[13px]" src="/svelte-logo.svg" alt="svelte" />
		</a>

		<!-- Show only in development mode. -->
		{#if dev}
			<div class="flex items-center">
				<OpenFileInVscode
					relativeFilePath={`/src/routes/${componentToShow.name.split(' ')[0]}.svelte`}
				/>
				<img class="ms-[1px] w-[13px]" src="/vscode-icon.png" alt="svelte" />
			</div>
		{/if}

		<button class="btn-primary text-xs" onclick={generateUuidAndCopytoClipboard}>
			{uuid ? 'COPIED!  Try again' : 'Create and copy uuidv4'}
		</button>

		<div class="text-xs">
			{uuid}
		</div>

		<button
			class="btn-primary text-xs"
			onclick={() => {
				enableSlideshow = !enableSlideshow;
			}}>{enableSlideshow ? 'Pause' : 'Start'} slideshow</button
		>
	</div>

	<hr class="divider" />

	<div class="flex gap-1">
		<!-- We use flex-1 so both items take equal width. -->
		<div class="max-w-[50%] flex-1">
			<componentToShow.component />
		</div>
		<div class="max-h-[78vh] flex-1 overflow-x-scroll overflow-y-scroll">
			{@html codeHtml}
		</div>
	</div>

	<!-- Earlier I was using below code in each component file which was polluting each file. Thus I now have common component for this. -->
	<!-- <OpenFileInVscode relativeFilePath={(import.meta.hot as any)?.ownerPath} /> -->
{:else}
	<!--	Note: We wait for the component to mount so that JavaScript can execute
 			and fetch the ID of the most recently mounted component (from componentItems),
			ensuring that the application continues to display that component. -->
	<div>
		Loading... {dev ? 'why?' : null}
	</div>
{/if}

<style>
	.divider {
		margin: 10px 0;
	}

	/* Group66.svelte's style tries to change the `display:flex` for <body> element and thus
	centers the position of the component-selector (and the its related buttons), so
	I am overwriting `display: flex` with `display: block` by using global style for
	`<body>` here using `!important`. */
	:global(body) {
		display: block !important;
	}

	/* Learn: :global is needed otherwise svelte removes unused css - https://chatgpt.com/c/6a466baf-c288-83ee-9942-1a1cc0499738 */
	:global(pre.shiki) {
		/* We do this otherwise overflowed code lines have white backgroudn color which looks absurd. */
		overflow: scroll;
		/* Learn: Use below `border-radius` if you want rounded corners in code snippets. */
		/* border-radius: 5px; */
	}
</style>
