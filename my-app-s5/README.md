# Learn Svelte (v5)

Deployed at - **[https://sveltev5.vercel.app](https://sveltev5.vercel.app)** _(using Vercel with `SvelteKit (v1)` preset)_

**Quick Links:**

- ❤️ README.sveltekit.md: [Click here](./README.sveltekit.md)
- README.initial.md: [Click here](./README.initial.md)
- README.more.md: [Click here](./README.more.md)

## Typescript for Svelte

```jsx
// state type
let flavours = $state<string[]>(['orange', 'strawberry']);

// component props type
type PropsType = { color: string; size: number };
let { color, size }: PropsType = $props();
```
