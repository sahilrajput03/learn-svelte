# Learn Svelte (v5)

Deployed at - **[https://sveltev5.vercel.app](https://sveltev5.vercel.app)** _(using Vercel with `SvelteKit (v1)` preset)_

_Note to Sahil: Some content is only covered in the readme (including sveltekit readme) for the purpose of easy demonstration where suitable._

## ❤️ README.sveltekit.md: [Click here](./README.sveltekit.md) ✌🏻✌🏻🙌🏻🙌🏻👏🏻

**Quick Links:**

- README.initial.md: [Click here](./README.initial.md)
- README.more.md: [Click here](./README.more.md)
- Canvas Tutorials:
  - Group28
  - Group52
  - Group54
  - Group61 ([Schotter Tutorial](https://collections.vam.ac.uk/item/O221321/schotter-print-nees-georg/))
  - Group63 ([Ocean Depth Turorial](https://svelte.dev/tutorial/svelte/svelte-window-bindings))

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

In `if`, `each` `snippet` and other syntax in svelte.

- `#` opens
- `:` continues
- `/` closes

## Syncing localstorage in a component

```js
let value = $state()

onMount(() => {
  value = localStorage.getItem('value') ?? 'default-value-here';
})

const saveToLocalStorage = (val: string) => localStorage.setItem('value', val);
$effect(() => {
		console.log('effect now....');
		if (value) {
			saveToLocalStorage(value); // wheneer `value` changes we update to localStorage
		}
	});
```

## $effect

1. Docs: Your effects run after the component has been mounted to the DOM, and in a microtask after state changes. [Docs](https://svelte.dev/docs/svelte/$effect)
2. Sahil: Functions if defined inside or outside `$effect` behaves same, for example check - file://./src/routes/thoughts/+page.svelte
3. ❤️ DOCS - If you absolutely have to update `$state` within an effect and run into an infinite loop because you read and write to the same `$state`, use `untrack`. source - [in the end of this docs page](https://svelte.dev/docs/svelte/$effect#$effect.tracking)

- Docs: Read about `untrack`at https://svelte.dev/docs/svelte/svelte#untrack.

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
