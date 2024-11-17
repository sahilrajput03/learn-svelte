<script lang="ts">
	import { onMount, type Component } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

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
	import Group52 from './Group52.svelte';
	import Group53 from './Group53.svelte';
	import Group54 from './Group54.svelte';
	import Group55 from './Group55.svelte';
	import Group56 from './Group56.svelte';
	import { dev } from '$app/environment';

	type ComponentsItemType = {
		id: string;
		name: string;
		component: Component;
		svelteTutorialLink?: string;
	};

	let isLoading = $state(true);
	// UUID Generator: https://www.uuidgenerator.net/
	let componentItems = $state<Array<ComponentsItemType>>([
		{
			id: 'eba91667-1fba-485c-aa2e-2e9e1551b4ad',
			name: 'Group1 - Using Component, Renderig strings and string as html via {@html ...} tag',
			component: Group1,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/your-first-component'
		}
		// {
		// 	id: '441ec256-772d-4358-b77e-6ed751e884c0',
		// 	name: 'Group2 - $state() and $derived()',
		// 	component: Group2,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/state'
		// },
		// {
		// 	id: '716f326e-60ae-40a2-b4a5-6c8f1bc928ea',
		// 	name: 'Group3 - $effect and its cleanup function',
		// 	component: Group3,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/effects'
		// },
		// {
		// 	id: '550384e7-fd76-49ea-80ae-86ce56332938',
		// 	name: 'Group4 - Shared state among components',
		// 	component: Group4,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/universal-reactivity'
		// },
		// {
		// 	id: 'a753be95-04ef-43dc-9a79-35523901e594',
		// 	name: 'Group5 - Component Props and defautl prop values',
		// 	component: Group5,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/declaring-props'
		// },
		// {
		// 	id: '3187d34b-83ac-412a-b50a-a347cc1c8c11',
		// 	name: 'Group6 - Passing all props in a single object via destructuring syntax',
		// 	component: Group6,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/spread-props'
		// },
		// {
		// 	id: 'db337049-a1c4-4ff1-9d96-ecc34b4a809d',
		// 	name: 'Group7 - {#if exp} ... {/if}',
		// 	component: Group7,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/if-blocks'
		// },
		// {
		// 	id: 'd71a5a4d-284c-4168-964c-24fe656e4191',
		// 	name: 'Group8 - {#if exp} ... {:else} ...{/if}',
		// 	component: Group8,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/else-blocks'
		// },
		// {
		// 	id: '61035e17-6b4c-4f4b-ba10-08a8321cbb79',
		// 	name: 'Group9 - {#if exp} ... {:else if exp} ... {:else} ...{/if}',
		// 	component: Group9,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/else-if-blocks'
		// },
		// {
		// 	id: '146aa966-2786-4573-986f-ca15241b7382',
		// 	name: 'Group10 - {#each iterable as item, i} ... {/each} ',
		// 	component: Group10,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/each-blocks'
		// },
		// {
		// 	id: '5c4ff3ff-e7ff-46e5-907c-e71acec1e99d',
		// 	name: 'Group11 - {#each iterable as item (key)} ... {/each}',
		// 	component: Group11,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/keyed-each-blocks'
		// },
		// {
		// 	id: 'cd15a183-ada6-4ae7-9e5f-dc17bb8a8dbc',
		// 	name: 'Group12 - {#await promise then number} ... {/await} AND {#await promise} ... {:then number} ... {:catch error} ... {/await}',
		// 	component: Group12,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/await-blocks'
		// },
		// {
		// 	id: '48134d23-1e26-40f7-aa29-f96620d0d74b',
		// 	name: 'Group13 - onpointermove (DOM Event handler)',
		// 	component: Group13,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/dom-events'
		// },
		// {
		// 	id: '6603b0fd-6f1d-4d86-8431-dfa3c11ae91d',
		// 	name: 'Group14 - onpointermove (Inline DOM Event handler)',
		// 	component: Group14,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/inline-handlers'
		// },
		// {
		// 	id: 'd63f7ba9-3997-4f26-98e6-e31905a8b87f',
		// 	name: 'Group15 - Event Bubbling and Event Capture ',
		// 	component: Group15,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/capturing'
		// },
		// {
		// 	id: '6e61a046-3a14-456c-a6da-d7efbdd5a68c',
		// 	name: 'Group16 - Passing event handler functions as props to components',
		// 	component: Group16,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/component-events'
		// },
		// {
		// 	id: 'c6421585-e2fa-4471-98fc-833171ec2873',
		// 	name: 'Group17 - Spread event handlers directly onto elements using {...props}',
		// 	component: Group17,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/spreading-events'
		// },
		// {
		// 	id: '2eb14b30-2aae-4cc8-aabd-44fe42562129',
		// 	name: 'Group18 - `bind:value={..} usage in <input />`',
		// 	component: Group18,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/text-inputs'
		// },
		// {
		// 	id: '99c809b5-0dd8-4ef4-8235-b4cac44779bb',
		// 	name: 'Group19 - Automatically coercion of `value` in <input type="number" bind:value />',
		// 	component: Group19,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/numeric-inputs'
		// },
		// {
		// 	id: 'ca0a9af5-4e39-4349-b76d-fe18242324d1',
		// 	name: 'Group20 - <input type="checkbox" bind:checked={yes} />',
		// 	component: Group20,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/checkbox-inputs'
		// },
		// {
		// 	id: '41b81e92-1528-4531-a285-b91b056e83dc',
		// 	name: 'Group21 - <select bind:value={selected}> <option value={...}> ... </option> </select>',
		// 	component: Group21,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/select-bindings'
		// },
		// {
		// 	id: 'ff05c34c-71bc-48f4-9771-fec5a262ac2f',
		// 	name: 'Group22 - Group inputs: checkbox and radio buttons',
		// 	component: Group22,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/group-inputs'
		// },
		// {
		// 	id: '347d6a45-4e91-4917-90cd-13cd6c993faf',
		// 	name: 'Group23 - Multiple-select-bindings',
		// 	component: Group23,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/multiple-select-bindings'
		// },
		// {
		// 	id: 'b1aa53b2-d6c8-42c8-8bd8-4e77322960c4',
		// 	name: 'Group24 - <textarea bind:value></textarea>',
		// 	component: Group24,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/textarea-inputs'
		// },
		// {
		// 	id: '12e02a97-95b6-45c9-9266-ec52ebb7ae91',
		// 	name: 'Group25 - Class-shorthand e.g, class:flipped',
		// 	component: Group25,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/classes'
		// },
		// {
		// 	id: 'eb7b4f1b-17b2-4320-b236-4e9166d27696',
		// 	name: 'Group26 - Inline style attributes. Example: style:top="200px" and style:--bg-1="palegoldenrod"',
		// 	component: Group26,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/styles'
		// },
		// {
		// 	id: 'fe70755f-a3f9-4bc9-a148-72dc4f7d5636',
		// 	name: 'Group27 - Influence the styles inside a child component via escape hatch — a last resort using `:global` CSS modifier',
		// 	component: Group27,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/component-styles'
		// },
		// {
		// 	id: '81c97196-2f42-4e6d-81c8-84db422aea3e',
		// 	name: 'Group28 - Using action functions - Painting',
		// 	component: Group28,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/actions'
		// },
		// {
		// 	id: 'd8830d46-8687-4bc9-8669-68a44c6dab63',
		// 	name: 'Group29 - Passing arguments to action function',
		// 	component: Group29,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/adding-parameters-to-actions'
		// },
		// {
		// 	id: '8912382c-5128-4434-9317-a3237d3038cb',
		// 	name: 'Group30 - <p transition:fade> Fades in and out </p>',
		// 	component: Group30,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/transition'
		// },
		// {
		// 	id: '37c1949b-e444-4df6-87bc-2c9b69fb9187',
		// 	name: 'Group31 - <p transition:fly={{ y: 100, duration: 2000 }}> Fly in and out </p>',
		// 	component: Group31,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/adding-parameters-to-transitions'
		// },
		// {
		// 	id: '7f99ece2-fdf0-484d-9423-b5af73537d6d',
		// 	name: 'Group32 - <p in:fly={{ y: 200, duration: 2000 }} out:fade> Flies in, fades out </p>',
		// 	component: Group32,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/in-and-out'
		// },
		// {
		// 	id: '16d2c96a-36b0-4210-94c0-4e914b008821',
		// 	name: 'Group33 - custom-css-transitions - Spin effect',
		// 	component: Group33,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/custom-css-transitions'
		// },
		// {
		// 	id: 'd47c3877-bf7e-49bf-b22d-2d4f2b739026',
		// 	name: 'Group34 - custom-css-transitions - Typewriter effect',
		// 	component: Group34,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/custom-js-transitions'
		// },
		// {
		// 	id: '6bf0211c-d1bc-4c04-8288-6a20cc09a375',
		// 	name: 'Group35 - transition-events: onintrostart, onoutrostart, onintroend & onoutroend',
		// 	component: Group35,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/transition-events'
		// },
		// {
		// 	id: '6becc251-e61c-4266-86e4-aa23df0e2f60',
		// 	name: 'Group36 - Using `|global` modifier the transition plays also when any non-direct element is added or removed',
		// 	component: Group36,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/global-transitions'
		// },
		// {
		// 	id: '5d84afde-9c3c-442e-b185-f6f2035b7901',
		// 	name: 'Group37 - ❤️ {#key i} ... {/key} - Play transitions on expression change instead of only when the element enters or leaves the DOM',
		// 	component: Group37,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/key-blocks'
		// },
		// {
		// 	id: 'fbe541a0-9821-4569-bfc3-081b22f1702b',
		// 	name: 'Group38 - Use `$state.raw(..)` when there’s no need for state to be deeply reactive as it will be discarded a few milliseconds later - Stock Price Chart',
		// 	component: Group38,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/raw-state'
		// },
		// {
		// 	id: '1ddd0a16-1abf-4f1f-8d96-56e696c41b47',
		// 	name: 'Group39 - Make properties of classes reactive',
		// 	component: Group39,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/reactive-classes'
		// },
		// {
		// 	id: 'b3597b67-71ad-475a-804e-908d8d833038',
		// 	name: 'Group40 - Make private properties of class reactive; getters and setters',
		// 	component: Group40,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/getters-and-setters'
		// },
		// {
		// 	id: 'ea05dcd8-020b-4408-bef9-d9f0a4759a3c',
		// 	name: 'Group41 - `new SvelteDate()` - Reactive builtins',
		// 	component: Group41,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/reactive-builtins'
		// },
		// {
		// 	id: 'c0916f32-7569-431d-8cef-c8fd8160c564',
		// 	name: 'Group42 - Snippet: Encapsulate markup in a reusable block',
		// 	component: Group42,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/snippets-and-render-tags'
		// },
		// {
		// 	id: '7c8e8faf-9d2b-400c-98c0-bc06e4ea72cf',
		// 	name: 'Group43 - Passing snippets to components',
		// 	component: Group43,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/passing-snippets'
		// },
		// {
		// 	id: 'f946f320-e5c0-4925-8633-d0593a9942bd',
		// 	name: 'Group44 - Implicit snippet props',
		// 	component: Group44,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/implicit-snippet-props'
		// },
		// {
		// 	id: 'eb51009a-752d-4add-863e-acdd4b8a1a7a',
		// 	name: 'Group45 - STORE: `const countStore = writable(0)` AND `countStore.update((n) => n - 1)`',
		// 	component: Group45,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/introducing-stores'
		// },
		// {
		// 	id: '60e223b4-be6e-401a-b9af-b0d5cd31414d',
		// 	name: 'Group46 - STORE: Tweened values',
		// 	component: Group46,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/tweens'
		// },
		// {
		// 	id: '7c80d947-8de0-479e-8f75-1ad46539c85b',
		// 	name: 'Group47 - STORE: Springs',
		// 	component: Group47,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/springs'
		// },
		// {
		// 	id: 'f596a478-a3d9-488f-8581-1c861f23885a',
		// 	name: 'Group48 - Contenteditable bindings (Advanced bindings-1)',
		// 	component: Group48,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/contenteditable-bindings'
		// },
		// {
		// 	id: '1a7fa115-e209-42ad-bafd-8290a0ed4712',
		// 	name: 'Group49 - ❤️ Each block bindings (Advanced bindings-2)',
		// 	component: Group49,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/each-block-bindings'
		// },
		// {
		// 	id: '26e9cb93-82c3-457d-8fb8-830812ba0085',
		// 	name: 'Group50 - Media elements (Advanced bindings-3)',
		// 	component: Group50,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/media-elements'
		// },
		// {
		// 	id: '521f598a-586d-49a8-beae-21bc7b474d10',
		// 	name: 'Group51 - Dimensions (Advanced bindings-4)',
		// 	component: Group51,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/dimensions'
		// },
		// {
		// 	id: '32b2687c-0181-43a0-bcf0-2a6928ab07ba',
		// 	name: 'Group52 - This (Advanced bindings-5)',
		// 	component: Group52,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/bind-this'
		// },
		// {
		// 	id: '15ac1920-5e41-4edd-8a91-ef46b93b095c',
		// 	name: 'Group53 - Component bindings (Advanced bindings-6)',
		// 	component: Group53,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/component-bindings'
		// },
		// {
		// 	id: '535cd449-1477-4b0f-b97d-01486d979ca4',
		// 	name: 'Group54 - Binding to component instances (Advanced bindings-7)',
		// 	component: Group54,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/component-this'
		// },
		// {
		// 	id: 'c682dd16-4104-4592-897f-f7a3bd1f966f',
		// 	name: 'Group55 - Deferred transitions (Advanced TRANSITIONS)',
		// 	component: Group55,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/deferred-transitions'
		// },
		// {
		// 	id: '826b8bc2-fbfe-4d15-82b0-c321f242aa08',
		// 	name: 'Group56 - Animations (Advanced TRANSITIONS)',
		// 	component: Group56,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/animations'
		// }
		// {
		// 	id: '0d9b50a7-30b1-41eb-9fc4-c7ded7cf2a5c',
		// 	name: 'Group61 - setContext and getContext (Context API )',
		// 	component: Group61,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/context-api'
		// },
		// {
		// 	id: '594af2bf-3921-4127-91b5-ae14f2146e8e',
		// 	name: 'Group61b - setContext and getContext with reactive state (Context API)',
		// 	component: Group61b,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/context-api'
		// },
		// {
		// 	id: 'a6c77714-d470-4805-8b56-fa5bded49491	',
		// 	name: 'Group62 - <svelte:window {onkeydown} />',
		// 	component: Group62,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/svelte-window'
		// },
		// {
		// 	id: 'ceca67cd-fbb5-47c5-9c81-180b240a4270',
		// 	name: 'Group63 - <svelte:window bind:scrollY={y} />',
		// 	component: Group63,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/svelte-window'
		// },
		// {
		// 	id: 'd9822452-a113-4879-8473-bf8119475978',
		// 	name: 'Group64 - <svelte:document {onselectionchange} /> ',
		// 	component: Group64,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/svelte-document'
		// },
		// {
		// 	id: 'c042662d-e1db-4743-b2c1-77a81b4763d7',
		// 	name: 'Group65 - <svelte:body onmouseenter={..} onmouseleave={...} /> ',
		// 	component: Group65,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/svelte-body'
		// },
		// {
		// 	id: 'a103ba54-7894-467b-ba62-e9feb927ea67',
		// 	name: 'Group66 - <svelte:head> <link rel="stylesheet" href="MyStyle.css" /> </svelte:head>',
		// 	component: Group66,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/svelte-head'
		// },
		// {
		// 	id: 'd241b918-caa5-4208-b0bf-27b6aee8acd9',
		// 	name: 'Group67 - <svelte:element this={"h1"}> ... </svelte:element>',
		// 	component: Group67,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/svelte-element'
		// },
		// {
		// 	id: 'bde71dd3-ca74-4b47-b9b6-f7633b86ca56',
		// 	name: 'Group68 - <script module> - Sharing code',
		// 	component: Group68,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/sharing-code'
		// },
		// {
		// 	id: '1732aaa7-18bf-4647-8b32-a4917f08725f',
		// 	name: 'Group69 - <script module> - Exports',
		// 	component: Group69,
		// 	svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/module-exports'
		// }
		// {
		// 	id: '15f7992e-886b-4bbb-af20-2ff0a3d41831',
		// 	name: 'Personal1 - Record and then transcribe with OpenAI',
		// 	component: Personal1,
		// 	svelteTutorialLink: ''
		// },
		// {
		// 	id: '068d3ce6-7ab2-42d6-bbc1-d8b4c5ecafa7',
		// 	name: 'Personal2 - Touch and Hold for Mobile and Desktop',
		// 	component: Personal2,
		// 	svelteTutorialLink: ''
		// },
		// {
		// 	id: '934b6546-d1d6-4c04-b217-607bd598f3ad',
		// 	name: 'Personal3 - Text box with character position tracking',
		// 	component: Personal3,
		// 	svelteTutorialLink: ''
		// }
	]);

	// console.log('here??', Math.random()); // This log (random number) is different on server log and client side log.

	let idOfComponentToShow = $state<string>();

	// Note: `currentIndex` and `componentToShow` are automatic derived when `idOfComponentToShow` changes
	let componentToShow = $derived.by<ComponentsItemType>(() => {
		const comp = componentItems.find((ci) => ci.id === idOfComponentToShow);
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
		// Fetch last component-id from local storage
		idOfComponentToShow = localStorage.getItem('component-id') ?? componentItems[0].id;
	});

	const saveToLocalStorage = (name: string) => localStorage.setItem('component-id', name);

	$effect(() => {
		console.log('effect now....');
		if (idOfComponentToShow) {
			saveToLocalStorage(idOfComponentToShow);
		}
	});

	const prev = () => {
		idOfComponentToShow = componentItems[indexOfComponentToShow - 1].id;
	};
	const next = () => {
		idOfComponentToShow = componentItems[indexOfComponentToShow + 1].id;
	};
	const goToFirst = () => {
		idOfComponentToShow = componentItems[0].id;
	};
	const goToLast = () => {
		idOfComponentToShow = componentItems[componentItems.length - 1].id;
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
		navigator.clipboard.writeText(newUuid);
	};

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
<!-- {idOfComponentToShow} -->

{#if !isLoading}
	<div>
		<select class="max-w-full border border-solid border-[black]" bind:value={idOfComponentToShow}>
			{#each componentItems as componentItem}
				<option value={componentItem.id}>
					{componentItem.name}
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
	<div class="mt-3 flex justify-end">
		<a
			class="text-right text-xs text-blue-600"
			target="_blank"
			href="https://github.com/sahilrajput03/learn-svelte/blob/main/my-app-s5/src/routes/{componentToShow.name.split(
				' '
			)[0]}.svelte">See {componentToShow.name.split(' ')[0]}.svelte on Github</a
		>
		<!-- href="https://github.com/sahilrajput03/learn-svelte/tree/main/my-app-s5/src/routes" -->
		<!-- href="https://github.com/sahilrajput03/learn-svelte/blob/main/my-app-s5/src/routes/Group12.svelte" -->
	</div>
	<!-- //* Svelte Tutorial Link -->
	<div class="mt-1 flex justify-end">
		<a
			target="_blank"
			class="text-right text-xs text-blue-600"
			href={componentToShow?.svelteTutorialLink}>See this tutorial on svelte.dev</a
		>
	</div>
	<div class="mt-1 flex justify-end">
		<OpenFileInVscode
			relativeFilePath={`/src/routes/${componentToShow.name.split(' ')[0]}.svelte`}
		/>
	</div>
	<div class="mt-1 flex justify-end">
		<button class="btn-primary text-xs" onclick={generateUuidAndCopytoClipboard}>
			{uuid ? 'COPIED!  Click again for new' : 'Create and copy uuidv4'}
		</button>
	</div>

	<div class="mt-1 flex justify-end">
		<div class="text-xs">
			{uuid}
		</div>
	</div>

	<div class="mt-1 flex justify-end">
		<button
			class="btn-primary text-xs"
			onclick={() => {
				enableSlideshow = !enableSlideshow;
			}}>{enableSlideshow ? 'Pause' : 'Start'} slideshow</button
		>
	</div>

	<hr class="divider" />

	<componentToShow.component />

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

<!-- `<Group28/>` is paint brush with canvas. -->

<!-- <Group1 /> -->
<!-- <Group2 /> -->
<!-- <Group3 /> -->
<!-- <Group4 /> -->
<!-- <Group5 /> -->
<!-- <Group6 /> -->
<!-- <Group7 /> -->
<!-- <Group8 /> -->
<!-- <Group9 /> -->
<!-- <Group10 /> -->
<!-- <Group11 /> -->
<!-- <Group12 /> -->
<!-- <Group13 /> -->
<!-- <Group14 /> -->
<!-- <Group15 /> -->
<!-- <Group16 /> -->
<!-- <Group17 /> -->
<!-- <Group18 /> -->
<!-- <Group19 /> -->
<!-- <Group20 /> -->
<!-- <Group21 /> -->
<!-- <Group22 /> -->
<!-- <Group23 /> -->
<!-- <Group24 /> -->
<!-- <Group25 /> -->
<!-- <Group26 /> -->
<!-- <Group27 /> -->
<!-- <Group27b /> -->
<!-- <Group28 /> -->
<!-- <Group29 /> -->
<!-- <Group30 /> -->
<!-- <Group31 /> -->
<!-- <Group32 /> -->
<!-- <Group33 /> -->
<!-- <Group34 /> -->
<!-- <Group35 /> -->
<!-- <Group36 /> -->
<!-- <Group37 /> -->
<!-- <Group38 /> -->
<!-- <Group39 /> -->
<!-- <Group40 /> -->
<!-- <Group41 /> -->
<!-- <Group41 /> -->
<!-- <Group42 /> -->
<!-- <Group43 /> -->

<style>
	.divider {
		margin: 20px 0;
	}

	/* Group66.svelte's style tries to change the `display:flex` for <body> element and thus
	centers the position of the component-selector (and the its related buttons), so
	I am overwriting `display: flex` with `display: block` by using global style for
	`<body>` here using `!important`. */
	:global(body) {
		display: block !important;
	}
</style>
