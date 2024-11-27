# Learn Svelte Kit

- `data` (server side) is availale in $props() in both `+layour.svelte` and `+page.svelte` file.
  - From svelte docs:
    - The layout (and any page below it) inherits `data.summaries` from the parent `+layout.server.js`.
    - TODO: For invalidation of data please check this - https://svelte.dev/docs/kit/load#Rerunning-load-functions

## TODO:

- print and stick to wall all the different html elements you use for e.g., <aside> - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside

## Tutorials

- Tutorial-1,2,3,4,5: folder - `/blog`
- Tutorial-6 (Header and cookies): `/group101/`
- Tutorial-7 (Header and cookies): `/group102/`
- Tutorial-8 (Shared modulesThe $lib alias): `/group103/`
- Tutorial-9,10,11,12,13 (NOT IMPLEMENTED) (forms): `/group104/`
  - I can make nested route in future if actually want to add forms tutorials.
- Tutorial-14 (API Routes GET): `/group105/`
- Tutorial-15,16 (API Routes: POST, PUT, DELETE) = `/group106/`
  - The updation of the todos should work without page refresh and the issue is reported here - https://github.com/sveltejs/svelte.dev/issues/786

## Sync search params when browser back/forard buttons are pressed

```jsx
onMount(() => {
	const popStateEvent = () => {
		const params = new URLSearchParams(window.location.search);
		const { id } = Object.fromEntries(params.entries()); // `/?id=123`
		// ... do what you want to do with id on browser back and forward button clicks here
	};

	// Whenever browser's back or forward button is clicked below event is triggered
	window.addEventListener('popstate', popStateEvent);

	// cleanup
	return () => {
		window.removeEventListener('popstate', popStateEvent);
	};
});

// push state to history using pushState e.g., on button clicks
pushState(`?id=${id}`, $page.state);
```

## `pushState`, `replaceState`, `goto`

_I posted this on stackoverflow as answer: [Click here](https://stackoverflow.com/a/79204864/10012446)_

- Docs: [goto](https://svelte.dev/docs/kit/$app-navigation#goto)
- Docs: [pushState](https://svelte.dev/docs/kit/$app-navigation#pushState)
- Docs: [replaceState](https://svelte.dev/docs/kit/$app-navigation#replaceState)
- Docs: ❤️👏🏻 [Shallow Routing](https://svelte.dev/docs/kit/shallow-routing)

`pushState` and `replaceState` are used for shallow routing. Why? Because sometimes we need to create history entries without navigating.(for more check docs of [Shalllow Routing](https://svelte.dev/docs/kit/shallow-routing))

```ts
import { goto, pushState, replaceState } from '$app/navigation';

// DEFAULT ROUTING:
// When  we  want  to  navigate  with  re-running  any  load  functions  and  replacing  page  components
goto('/id=789'); // create  a  new  page  history  entry  (`replaceState`  is  false  by  default  here)
goto('/id=789', { replaceState: true }); // it replaces current page history entry

// SHALLOW ROUTING
// (Why?): When  we  want  to  navigate -
//   1. without  traversal  through  the  list  of  history  entries
//   2. without  re-running  any  load  functions  and
//   3. without  replacing  page  components  as  necessary
pushState(`?id=123`, $page.state); // Docs: create a new history entry
replaceState(`?id=456`, $page.state); // Docs: replace the current history entry
```

_tldr; Do not use `history.pushState`_ but use pushState (svelte's builtin function).

## Multiple route parameters

Source - [Tutorial: Basic SvelteKit - Routing - Route parameters](https://svelte.dev/tutorial/kit/params)

Multiple route parameters can appear within one URL segment, as long as they are separated by at least one static character: `foo/[bar]x[baz]` is a valid route where `[bar]` and `[baz]` are dynamic parameters.

## Routes and loading data

Docs of Loading data: [Click here](https://svelte.dev/docs/kit/load)

- For `+page.svelte` file: `data` is merged from **both `+page.server.ts` and `+layout.server.ts` files.**
- For `+layout.svelte` file: `data` loaded **only from `+layout.server.ts` file only.**

1. For route: `/blog` - Data is loaded in `+layout.server.ts` file, then `+page.server.ts`, then DOM element is rendred using `+layout.svelte` then `+page.svelte` file.

   ```bash
   loading data in /blog/+layout.server.ts

   loading data in /blog/+page.server.ts

   /blog/+layout.svelte,
   data? {
     commonProperty: '/blog/+layout.server.ts',
     '/blog/+layout.server.ts': 'server data'
   }

   /blog/+page.svelte
   data? {
     commonProperty: '/blog/+page.server.ts',
     '/blog/+layout.server.ts': 'server data',
     '/blog/+page.server.ts': 'server data'
   }
   ```

2. For route: `/blog/welcom` (using `/blog/[slug]`) - Data loading and DOM rendering elements are loaded in exactly same manner as in above case.

   ```bash
   loading data in /blog/+layout.server.ts

   loading data in /blog/[slug]/+page.server.ts

   /blog/+layout.svelte,
   data? {
     commonProperty: '/blog/+layout.server.ts',
     '/blog/+layout.server.ts': 'server data'
   }

   /blog/[slug]/+layout.svelte
   data? {
     commonProperty: '/blog/+layout.server.ts',
     '/blog/+layout.server.ts': 'server data'
   }

   /blog/[slug]/+page.svelte,
   data? {
     commonProperty: '/blog/[slug]/+page.server.ts',
     '/blog/+layout.server.ts': 'server data',
     '/blog/[slug]/+page.server.ts': 'server data'
   }
   ```

3. _(advanced version of above i.e., 2nd case)_ **NOTE:** To trigger these logs you must rename file in directory _/blog/[slug]/_ from `__TEST__+layout.server.ts` to `+layout.server.ts`.

   ```bash
   loading data in /blog/+layout.server.ts

   loading data in /blog/[slug]/+layout.server.ts

   loading data in /blog/[slug]/+page.server.ts

   /blog/+layout.svelte,
   data? {
     commonProperty: '/blog/+layout.server.ts',
     '/blog/+layout.server.ts': 'server data'
   }

   /blog/[slug]/+layout.svelte
   data? {
     commonProperty: '/blog/[slug]/+layout.server.ts',
     '/blog/+layout.server.ts': 'server data',
     '/blog/[slug]/+layout.server.ts': 'server data'
   }

   /blog/[slug]/+page.svelte,
   data? {
     commonProperty: '/blog/[slug]/+page.server.ts',
     '/blog/+layout.server.ts': 'server data',
     '/blog/[slug]/+layout.server.ts': 'server data',
     '/blog/[slug]/+page.server.ts': 'server data'
   ```
