# Learn Svelte (v5)

Deployed at - **[https://sveltev5.vercel.app](https://sveltev5.vercel.app)** _(using Vercel with `SvelteKit (v1)` preset)_

**Quick Links:**

- ❤️ README.sveltekit.md: [Click here](./README.sveltekit.md)
- README.initial.md: [Click here](./README.initial.md)
- README.more.md: [Click here](./README.more.md)

## $effect

1. Docs: Your effects run after the component has been mounted to the DOM, and in a microtask after state changes. [Docs](https://svelte.dev/docs/svelte/$effect)
2. Sahil: Functions if defined inside or outside $effect behaves same, for example check - file://./src/routes/thoughts/+page.svelte
3. Docs: Read about `untrack`at https://svelte.dev/docs/svelte/svelte#untrack (untrack is also mentioendi in the end of [$effect docs](https://svelte.dev/docs/svelte/$effect#$effect.tracking)).

## `onMount` and `$effect`

`onMount` should have as minimum logic as needed as possible and anything that can be put inside $effect should be put inside $effect instead. (refer - `./src/routes/thoughts/+page.svelte`)

```ts
onMount(async () => {}); // 👍 Async function is good here. BUT, (from docs on
// using `cleanup function`) This behaviour will only work when the function
// passed to onMount synchronously returns a value. async functions always
// return a Promise, and as such cannot synchronously return a function.
// src - https://svelte.dev/docs/svelte/lifecycle-hooks#onMount

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
