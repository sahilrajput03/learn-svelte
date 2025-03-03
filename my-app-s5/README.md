# Learn Svelte (v5)

Deployed at:

- **[https://svelte.monktechnoworld.com/](https://svelte.monktechnoworld.com/)**
- **[https://sveltev5.vercel.app](https://sveltev5.vercel.app)**
  - _(The deployment is done using Vercel with `SvelteKit (v1)` preset)_

_Note to Sahil: Some content is only covered in this readme or `README.sveltekit.md` readme for the purpose of easy demonstration._

## ❤️ Magical SVELTE-VITE INSPECTOR

Check file: `svelte.config.js`

## Vercel Deployment Error?

```bash
Error during build:
Error: Unsupported Node.js version: v22.12.0. Please use Node 18 or Node 20 to build your project, or explicitly specify a runtime in your adapter configuration.
```

**Solution:** You can go to project settings in Vercel and set Node.js Version to `20.x` from the dropdown and click on Save button. Now go to <i>Deployments</i> tab and click on **<i>three dots</i> of your last deployment** and select **Redeploy** option to redeploy.

**Another solution:**

- From Docs: You can define the major Node.js version in the engines#node section of the package.json to override the one you have selected in the Project Settings. Source - [https://vercel.com/docs/functions/runtimes/node-js/node-js-versions#version-overrides-in-package.json](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions#version-overrides-in-package.json)

## ❤️ README.sveltekit.md: [Click here](./README.sveltekit.md) ✌🏻✌🏻🙌🏻🙌🏻👏🏻

**Quick Links:**

- README.initial.md: [Click here](./README.initial.md) (generated on project creation)
- Errors to be reported on svelte github repository (): [README.more.md](./README.more.md)
- Canvas Tutorials:
  - Group28
  - Group52
  - Group54
  - Group61 ([Schotter Tutorial](https://collections.vam.ac.uk/item/O221321/schotter-print-nees-georg/))
  - Group63 ([Ocean Depth Turorial](https://svelte.dev/tutorial/svelte/svelte-window-bindings))

## Using $state(...) rune outside the `.svelte` file for global state (shared state) management purpose

See example in files:

- `src/routes/shared.svelte.ts` (`Group4.svelte`)
- ❤️ Shared usage of `idOfComponentToShow` state in `/src/routes/+page.svelte` and `/src/routes/+layout.svelte`.
- `src/routes/actions.svelte.ts`

## Named export / Exporting variables from a `*.svetle` file using `<script module ..`

Refer file:

- `AudioPlayer2.svelte` (used in `Group68.svelte` and `Group69.svelte`)
- `Gropu61b.svelte`

## `getContext` and `setContext`

Refer files:

- `Group61b.svelte` (much cleaner tutorial)
- `Group61.svelte`

## Rendering children snippet `{@render children()}`

`Group44.svelte` and `Group61.svelte`.

## Controlling state of parent component from child component

Tutorial `Group53.svelte` ([svelte tutorial](https://svelte.dev/tutorial/svelte/component-bindings))

```jsx
// Group53.svelte
let pin = $state('');
<Keypad bind:value={pin} {onsubmit} />

// Keypad.svelte
let { value = $bindable(), onsubmit }: PropsType = $props(); // `type PropsType = { value: string; onsubmit: Function };`
// value can be mutated as you like e.g.,
const select = (num: number) => () => (value += num);
const clear = () => (value = '');
```

## Why use snippet instead of making a new component?

**Snippet Tutorials Files:** `Group42.svetle`, `Group43.svetle` and `Group44.svelte`

1. Snippets look beautiful inside markup
2. Snippets are:
   a. easier to make than making a new file just for a component
   b. snippet name don't need to start with a capilat letter
3. `Group42.svelte`: Simple definition and renderig of snippets.
4. `Group43.svelte`: Snippet can be defined just below the `<script>` tag or just above the `<style>` tag as well.
5. `Group44.svelte`: ❤️ Passing snippets as props to components.

## From Rich Harris

In `if`, `if-else`, `if-elseif`, `each` `snippet` and other syntax in svelte.

- `#` opens
- `:` continues
- `/` closes

```ts
{#if count > 10}
	<p>{count} is greater than 10</p>
{/if}


{#if count > 10}
	<p>{count} is greater than 10</p>
{:else}
	<p>{count} is between 0 and 10</p>
{/if}

{#if count > 10}
	<p>{count} is greater than 10</p>
{:else if count < 5}
	<p>{count} is less than 5</p>
{:else}
	<p>{count} is between 5 and 10</p>
{/if}
```

## Syncing localstorage in a component + ❤️️custom rune style

❤ For most recent updates of your please refer file `shared.svelte.ts` in qr-solution project.

❤️For usage via a custom function please refer file `Personal6a` instead.

An example of storing an array of strings is made in `Personal6` in this app.

```js
let value = $state()

onMount(() => {
  value = localStorage.getItem('value') ?? 'default-value-here';
})

const saveToLocalStorage = (val: string) => localStorage.setItem('value', val);
$effect(() => {
		console.log('effect now....');
		if (value) {
			saveToLocalStorage(value); // whenever `value` changes we update to localStorage
		}
	});
```

## $effect

1. Docs: Your effects run after the component has been mounted to the DOM, and in a microtask after state changes. [Docs](https://svelte.dev/docs/svelte/$effect)
2. Sahil: Functions if defined inside or outside `$effect` behaves same, for example check - file://./src/routes/thoughts/+page.svelte
3. ❤️ DOCS - If you absolutely have to update `$state` within an effect and run into an infinite loop because you read and write to the same `$state`, use `untrack`. source - [in the end of this docs page](https://svelte.dev/docs/svelte/$effect#$effect.tracking)

- Docs: Read about `untrack`at https://svelte.dev/docs/svelte/svelte#untrack. **We get untracked value from the return value of `untrack` function:**

```jsx
// ❤️❤️ Using `untrack` to get untracked state value
$effect(() => {
	const untrackedTime = untrack(() => time);
});
```

## `onMount` and `$effect`

`onMount` should have as minimum logic as needed as possible and anything that can be put inside $effect should be put inside $effect instead. (refer - `./src/routes/thoughts/+page.svelte`)

```ts
onMount(async () => {}); // 👍 Async function is good here. BUT, (from docs on
// using `cleanup function`) This behaviour will only work when the function
// passed to onMount synchronously returns a value. async functions always
// return a Promise, and as such cannot synchronously return a function.
// src - https://svelte.dev/docs/svelte/lifecycle-hooks#onMount
// Sahil: I can always use `onDestroy` if I want to make use of cleanup function. (probably?)

$effect(async () => {}); // 👎 Async function works but we get typescript error
// that an async can not be accepted. (Svelte issue: https://github.com/sveltejs/svelte/issues/9946)
// Solution: Declare an async function inside the $effect callback and call
// that function.
```

## Typescript for Svelte

```jsx
// state type
let flavours = $state<string[]>(['orange', 'strawberry']);

// component props type
type PropsType = { color: string; size: number };
let { color, size }: PropsType = $props();
```

## `:global`

Tip: If you want to use somthing in between of `:global` and scoped css (default way of css in svelte component), then you should do something like `.boxes :global(.box)` as you can see in `Group27.svelte` file.

Say you apply some style via `:global(body){ .. }` in `/routes/+page.svelte` file.

1. Now if you go to `/` route the syle will apply.
2. If you open `/thoughts` from some internal link the styles will apply.
3. BUT if you now refresh the page while you're still on `/thoughts` route, **the style will NOT APPLY. (TESTED)**

## Transition

30,31,32,33,34

Easing functions in svelte playground: [https://svelte.dev/playground/easing](https://svelte.dev/playground/easing?version=5.2.2)

## New Version Available Feature of SvelteKit

Tutorial: [svelte.dev/tutorial/kit/updated-store](https://svelte.dev/tutorial/kit/updated-store)

File - `src/routes/NewVersionAvailableToast.svelte`

## Errors to be reported on svelte github repository

**Date: 2:33PM, 7 November, 2024**

_TLDR: Always use `$state<type>` syntax to define types._

Note: This issues happens only with `Array<T1>` or `T1[]` but working with simple types like string, number works fine e.g., `let name1: string = $state(1) // Type 'number' is not assignable to type 'string'`.

```ts
type T1 = { name: string };
let person1: T1 = $state({ name: 'jack', gender: 'male' }); // does not throw error
let person2 = $state<T1>({ name: 'jack', gender: 'male' }); // throws error - "'gender' does not exist in type 'T1'"

let personList1: Array<T1> = $state([{ name: 'jack', gender: 'male' }]); // does not throw error
let personList1 = $state<Array<T1>>([{ name: 'jack', gender: 'male' }]); // throws error - "'gender' does not exist in type 'T1'"
```
