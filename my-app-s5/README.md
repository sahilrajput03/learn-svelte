# Learn Svelte (v5)

Deployed at - **[https://sveltev5.vercel.app](https://sveltev5.vercel.app)** _(using Vercel with `SvelteKit (v1)` preset)_

**Quick Links:**

- ❤️ README.sveltekit.md: [Click here](./README.sveltekit.md)
- README.initial.md: [Click here](./README.initial.md)
- README.more.md: [Click here](./README.more.md)

## `onMount` and `$effect`

Svelte Docs: Your effects run after the component has been mounted to the DOM, and in a microtask after state changes. [Docs](https://svelte.dev/docs/svelte/$effect)

```ts
onMount(async () => {}); // 👍 Async function is good here.

$effect(async () => {}); // 👎 Async function works but we get typescript error that an async can not be accepted. (Svelte issue: https://github.com/sveltejs/svelte/issues/9946)
// Solution: Declare an async function inside the $effect callback and call that function.
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
