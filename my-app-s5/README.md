# Learn Svelte (v5)

Deployed at - **[https://sveltev5.vercel.app](https://sveltev5.vercel.app)** _(using Vercel with `SvelteKit (v1)` preset)_

**Quick Links:**

- ❤️ README.sveltekit.md: [Click here](./README.sveltekit.md)
- README.initial.md: [Click here](./README.initial.md)
- README.more.md: [Click here](./README.more.md)

## asyn function in `onMount` and `$effect`

```ts
onMount(async () => {}); // 👍

$effect(async () => {}); // 👎 It works but we get typescript error that an async can not be accepted. (Svelte issue: https://github.com/sveltejs/svelte/issues/9946)
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
