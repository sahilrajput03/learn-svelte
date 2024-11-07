# create-svelte

- Deployed at - https://sveltev5.vercel.app/
  - On vercel using preset SvelteKit (v1)

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Errors to be reported on svelte github repository

**Date: 2:33PM, 7 November, 2024**

Note: This issues happens only with `Array<T1>` or `T1[]` but working with simple types like string, number works fine e.g., `let name1: string = $state(1) // Type 'number' is not assignable to type 'string'`.

```ts
type T1 = { name: string };
let person1: T1 = $state({ name: 'jack', gender: 'male' }); // does not throw error
let person2 = $state<T1>({ name: 'jack', gender: 'male' }); // throws error - "'gender' does not exist in type 'T1'"

let personList1: Array<T1> = $state([{ name: 'jack', gender: 'male' }]); // does not throw error
let personList1 = $state<Array<T1>>([{ name: 'jack', gender: 'male' }]); // throws error - "'gender' does not exist in type 'T1'"
```

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
