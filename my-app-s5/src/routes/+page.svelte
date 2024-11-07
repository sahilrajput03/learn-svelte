<script lang="ts">
	import { onMount, type Component } from 'svelte';

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
	import OpenFileInVscode from './OpenFileInVscode.svelte';
	import Group61 from './Group61.svelte';
	import Group61b from './Group61b.svelte';

	type ComponentsItemType = { name: string; component: Component; svelteTutorialLink?: string };

	let ComponentItems = $state<Array<ComponentsItemType>>([
		{
			name: 'Group1 - Using Component, Renderig strings and string as html via {@html ...} tag',
			component: Group1,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/your-first-component'
		},
		{
			name: 'Group2 - $state() and $derived()',
			component: Group2,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/state'
		},
		{
			name: 'Group3 - $effect and its cleanup function',
			component: Group3,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/effects'
		},
		{
			name: 'Group4 - Shared state among components',
			component: Group4,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/universal-reactivity'
		},
		{
			name: 'Group5 - Component Props and defautl prop values',
			component: Group5,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/declaring-props'
		},
		{
			name: 'Group6 - Passing all props in a single object via destructuring syntax',
			component: Group6,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/spread-props'
		},
		{
			name: 'Group7 - {#if exp} ... {/if}',
			component: Group7,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/if-blocks'
		},
		{
			name: 'Group8 - {#if exp} ... {:else} ...{/if}',
			component: Group8,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/else-blocks'
		},
		{
			name: 'Group9 - {#if exp} ... {:else if exp} ... {:else} ...{/if}',
			component: Group9,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/else-if-blocks'
		},
		{
			name: 'Group10 - {#each iterable as item, i} ... {/each} ',
			component: Group10,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/each-blocks'
		},
		{
			name: 'Group11 - {#each iterable as item (key)} ... {/each}',
			component: Group11,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/keyed-each-blocks'
		},
		{
			name: 'Group12 - {#await promise then number} ... {/await} AND {#await promise} ... {:then number} ... {:catch error} ... {/await}',
			component: Group12,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/await-blocks'
		},
		{
			name: 'Group13 - onpointermove (DOM Event handler)',
			component: Group13,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/dom-events'
		},
		{
			name: 'Group14 - onpointermove (Inline DOM Event handler)',
			component: Group14,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/inline-handlers'
		},
		{
			name: 'Group15 - Event Bubbling and Event Capture ',
			component: Group15,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/capturing'
		},
		{
			name: 'Group16 - Passing event handler functions as props to components',
			component: Group16,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/component-events'
		},
		{
			name: 'Group17 - Spread event handlers directly onto elements using {...props}',
			component: Group17,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/spreading-events'
		},
		{
			name: 'Group18 - `bind:value={..} usage in <input />`',
			component: Group18,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/text-inputs'
		},
		{
			name: 'Group19 - Automatically coercion of `value` in <input type="number" bind:value />',
			component: Group19,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/numeric-inputs'
		},
		{
			name: 'Group20 - <input type="checkbox" bind:checked={yes} />',
			component: Group20,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/checkbox-inputs'
		},
		{
			name: 'Group21 - <select bind:value={selected}> <option value={...}> ... </option> </select>',
			component: Group21,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/select-bindings'
		},
		{
			name: 'Group22 - Group inputs: checkbox and radio buttons',
			component: Group22,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/group-inputs'
		},
		{
			name: 'Group23 - Multiple-select-bindings',
			component: Group23,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/multiple-select-bindings'
		},
		{
			name: 'Group24 - <textarea bind:value></textarea>',
			component: Group24,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/textarea-inputs'
		},
		{
			name: 'Group25 - Class-shorthand e.g, class:flipped',
			component: Group25,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/classes'
		},
		{
			name: 'Group26 - Inline style attributes. Example: style:top="200px" and style:--bg-1="palegoldenrod"',
			component: Group26,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/styles'
		},
		{
			name: 'Group27 - Influence the styles inside a child component via escape hatch — a last resort using `:global` CSS modifier',
			component: Group27,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/component-styles'
		},
		{
			name: 'Group28 - Using action functions - Painting',
			component: Group28,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/actions'
		},
		{
			name: 'Group29 - Passing arguments to action function',
			component: Group29,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/adding-parameters-to-actions'
		},
		{
			name: 'Group30 - <p transition:fade> Fades in and out </p>',
			component: Group30,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/transition'
		},
		{
			name: 'Group31 - <p transition:fly={{ y: 100, duration: 2000 }}> Fly in and out </p>',
			component: Group31,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/adding-parameters-to-transitions'
		},
		{
			name: 'Group32 - <p in:fly={{ y: 200, duration: 2000 }} out:fade> Flies in, fades out </p>',
			component: Group32,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/in-and-out'
		},
		{
			name: 'Group33 - custom-css-transitions - Spin effect',
			component: Group33,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/custom-css-transitions'
		},
		{
			name: 'Group34 - custom-css-transitions - Typewriter effect',
			component: Group34,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/custom-js-transitions'
		},
		{
			name: 'Group35 - transition-events: onintrostart, onoutrostart, onintroend & onoutroend',
			component: Group35,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/transition-events'
		},
		{
			name: 'Group36 - Using `|global` modifier the transition plays also when any non-direct element is added or removed',
			component: Group36,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/global-transitions'
		},
		{
			name: 'Group37 - {#key i} ... {/key} - Play transitions on expression change instead of only when the element enters or leaves the DOM',
			component: Group37,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/key-blocks'
		},
		{
			name: 'Group38 - Use `$state.raw(..)` when there’s no need for state to be deeply reactive as it will be discarded a few milliseconds later - Stock Price Chart',
			component: Group38,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/raw-state'
		},
		{
			name: 'Group39 - Make properties of classes reactive',
			component: Group39,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/reactive-classes'
		},
		{
			name: 'Group40 - Make private properties of class reactive; getters and setters',
			component: Group40,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/getters-and-setters'
		},
		{
			name: 'Group41 - `new SvelteDate()` - Reactive builtins',
			component: Group41,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/reactive-builtins'
		},
		{
			name: 'Group42 - Snippet',
			component: Group42,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/snippets-and-render-tags'
		},
		{
			name: 'Group43 - Passing snippets to components',
			component: Group43,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/passing-snippets'
		},
		{
			name: 'Group61 - setContext and getContext (Context API )',
			component: Group61,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/context-api'
		},
		{
			name: 'Group61b - setContext and getContext with reactive state (Context API)',
			component: Group61b,
			svelteTutorialLink: 'https://svelte.dev/tutorial/svelte/context-api'
		}
	]);

	// console.log('here??', Math.random()); // This log (random number) is different on server log and client side log.

	// Since I am using name as to detect individual component while traversing using next and prev button I need to check for duplicate check for duplicate component names
	const componentItems = ComponentItems.map((ci) => ci.name);
	const duplicateNames = componentItems.filter((ci, index) => componentItems.indexOf(ci) !== index);
	if (duplicateNames.length > 0) {
		throw new Error(
			`Error from Sahil: Duplicate component names found: ${[...new Set(duplicateNames)].join(', ')}`
		);
	}

	let selected = $state<ComponentsItemType>();

	// ❤️ Lifecycle Hooks in svelte `onMount`:
	// https://svelte.dev/docs/svelte/lifecycle-hooks
	// https://svelte.dev/playground/onmount?version=5.1.9
	onMount(async () => {
		const initialComponentItem = () =>
			ComponentItems?.find((c) => c?.name === window.localStorage.getItem('component-name'));

		selected = initialComponentItem() || (ComponentItems[0] as any);
	});

	const currentIndex = $derived(ComponentItems.findIndex((ci) => ci.name === selected?.name));

	const saveToLocalStorage = (name: string) => localStorage.setItem('component-name', name);

	const prev = () => {
		selected = ComponentItems[currentIndex - 1];
		saveToLocalStorage(selected.name);
	};
	const next = () => {
		selected = ComponentItems[currentIndex + 1];
		saveToLocalStorage(selected.name);
	};

	const goToFirst = () => {
		selected = ComponentItems[0];
		saveToLocalStorage(selected.name);
	};
	const goToLast = () => {
		selected = ComponentItems[ComponentItems.length - 1];
		saveToLocalStorage(selected.name);
	};

	// $inspect('selected?', selected); // For debugging
</script>

{#if selected}
	<div>
		<select
			class="max-w-full border border-solid border-[black]"
			bind:value={selected}
			onchange={(e: any) => {
				// Since value of `e.target.value` is "[object Object]" thus we use `e.target.__value`
				saveToLocalStorage(e.target.__value.name);
			}}
		>
			{#each ComponentItems as ComponentItem}
				<option value={ComponentItem}>
					{ComponentItem.name}
				</option>
			{/each}
		</select>
		<button class="btn-primary text-xs" disabled={currentIndex === 0} onclick={goToFirst}
			>First</button
		>
		<button class="btn-primary ms-5 text-xs" disabled={currentIndex === 0} onclick={prev}
			>prev</button
		>

		<button
			class="btn-primary text-xs"
			disabled={currentIndex === ComponentItems.length - 1}
			onclick={next}>next</button
		>
		<button
			class="btn-primary ms-5 text-xs"
			disabled={currentIndex === ComponentItems.length - 1}
			onclick={goToLast}>Last</button
		>
	</div>
	<div class="mt-3 flex justify-end">
		<a
			class="text-right text-xs text-blue-600"
			target="_blank"
			href="https://github.com/sahilrajput03/learn-svelte/blob/main/my-app-s5/src/routes/{selected.name.split(
				' '
			)[0]}.svelte">See {selected.name.split(' ')[0]}.svelte on Github</a
		>
		<!-- href="https://github.com/sahilrajput03/learn-svelte/tree/main/my-app-s5/src/routes" -->
		<!-- href="https://github.com/sahilrajput03/learn-svelte/blob/main/my-app-s5/src/routes/Group12.svelte" -->
	</div>
	<!-- / //* Svelte Tutorial Link -->
	<div class="mt-1 flex justify-end">
		<a target="_blank" class="text-right text-xs text-blue-600" href={selected?.svelteTutorialLink}
			>See this tutorial on svelte.dev</a
		>
	</div>
	<div class="mt-1 flex justify-end">
		<OpenFileInVscode relativeFilePath={`/src/routes/${selected.name.split(' ')[0]}.svelte`} />
	</div>

	<hr class="divider" />

	<selected.component />

	<!-- Earlier I was using below code in each component file which was polluting each file. Thus I now have common component for this. -->
	<!-- <OpenFileInVscode relativeFilePath={(import.meta.hot as any)?.ownerPath} /> -->
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
</style>
