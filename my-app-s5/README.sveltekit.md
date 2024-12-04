# Learn Svelte Kit

- `data` (server side) is availale in $props() in both `+layour.svelte` and `+page.svelte` file.
  - From svelte docs:
    - The layout (and any page below it) inherits `data.summaries` from the parent `+layout.server.js`.
    - TODO: For invalidation of data please check this - https://svelte.dev/docs/kit/load#Rerunning-load-functions

## Env tutorial brocken?

Yes. [https://github.com/sveltejs/svelte.dev/issues/690](https://github.com/sveltejs/svelte.dev/issues/690)

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
- Tutorial-15,16 (API Routes: POST, PUT, DELETE) = `/Group105/` `/Group106/`
  - The updation of the todos should work without page refresh and the issue is reported here - https://github.com/sveltejs/svelte.dev/issues/786

## Errors 1: Expected errors vs. Unexpected errors - SvelteKit

- Tutorial: [https://svelte.dev/tutorial/kit/error-basics](https://svelte.dev/tutorial/kit/error-basics) **(This tutorial is not added in this project)**

**Note: In both the cases the `+page.svelte` page will never be rendered.**

- When you throw an expected error, you’re telling SvelteKit ‘don’t worry, I know what I’m doing here’.

```js
// src/routes/expected/+page.server
import { error } from '@sveltejs/kit';

export function load() {
	error(420, 'Enhance your calm');
}
```

- An unexpected error, by contrast, is assumed to be a bug in your app. When an unexpected error is thrown, its message and stack trace will be logged to the console.

```js
// src/routes/unexpected/+page.server
export function load() {
	throw new Error('Kaboom!');
}
```

**The expected error message is shown to the user, whereas the unexpected error message is redacted and replaced with a generic ‘Internal Error’ message and a 500 status code. That’s because error messages can contain sensitive data.**

## Errors 2: Custom Error pages (custom site-wide error page) and Granular Error pages (page specific error page)

Tutorial: [https://svelte.dev/tutorial/kit/error-pages](https://svelte.dev/tutorial/kit/error-pages)

1. Custom site-wide error page: `src/routes/+error.svelte`

```js
<script>
	import { page } from '$app/stores';
	import { emojis } from './emojis.js';
</script>

<h1>{$page.status} {$page.error.message}</h1>
<span style="font-size: 10em">
	{emojis[$page.status] ?? emojis[500]}
</span>
```

2. Page specific error page `src/routes/expected/+error`

This component will be rendered for `/expected` instead of `src/routes/+error.svelte`.

```js
<h1>this error was expected</h1>
```

## SvelteKit - Advanced SvelteKit / Hooks / The RequestEvent object

Source: [https://svelte.dev/tutorial/kit/event](https://svelte.dev/tutorial/kit/event)

Properties of `event` in `handle()` function:

- `cookies` — the cookies API
- `fetch` — the standard Fetch API, with additional powers
- `getClientAddress`() — a function to get the client’s IP address
- `isDataRequest` — true if the browser is requesting data for a page during client-side navigation, false if a page/route is being requested directly
- `locals` — a place to put arbitrary data
- `params` — the route parameters
- `request` — the Request object
- `route` — an object with an id property representing the route that was matched
- `setHeaders`(...) — a function for setting HTTP headers on the response
- `url` — a URL object representing the current request

A useful pattern is to add some data to event.locals in handle so that it can be read in subsequent load functions:

```jsx
// src/hooks.server
export async function handle({ event, resolve }) {
	event.locals.answer = 42;
	return await resolve(event);
}
```

```jsx
// src/routes/+page.server
export function load(event) {
	return {
		message: `the answer is ${event.locals.answer}`
	};
}
```

## SvekteKit - Advanced SvelteKit / Hooks / handle

[https://svelte.dev/tutorial/kit/handle](https://svelte.dev/tutorial/kit/handle)

- **Tutorial:**

SvelteKit provides several hooks — ways to intercept and override the framework’s default behaviour.

The most elementary hook is handle, which lives in src/hooks.server.js. It receives an event object along with a resolve function, and returns a Response.

resolve is where the magic happens: SvelteKit matches the incoming request URL to a route of your app, imports the relevant code (+page.server.js and +page.svelte files and so on), loads the data needed by the route, and generates the response.

The default handle hook looks like this:

```jsx
// File: src/hooks.server.js
export async function handle({ event, resolve }) {
	return await resolve(event);
}
```

For pages (as opposed to API routes), you can modify the generated HTML with transformPageChunk:

```jsx
// File: src/hooks.server.js
export async function handle({ event, resolve }) {
	// You can also create entirely new routes:
	if (event.url.pathname === '/ping') {
		// Note: If the incoming request is on path `/ping` then we render 'pong' text to the user in browser.
		return new Response('pong');
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('<body', '<body style="color: hotpink"')
	});
}
```

## SvelteKit - stores: `page`, `navigating`, `updated`

**Tutorials:**

- Basic SvelteKit / Stores / page
- Basic SvelteKit / Stores / navigating
- Basic SvelteKit / Stores / navigated (Already implemented in this project, check file - `src/routes/NewVersionAvailableToast.svelte` )

```jsx
// https://svelte.dev/tutorial/kit/page-store
import { page } from '$app/stores';
// $page.url.pathname // Output: "/", "/about"

// OTHER PROPERTIES OF `$page` STORE:
// `url` — the URL of the current page
// `params` — the current page’s parameters
// `route` — an object with an id property representing the current route
// `status` — the HTTP status code of the current page
// `error` — the error object of the current page, if any (you’ll learn more about error handling in later exercises)
// `data` — the data for the current page, combining the return values of all load functions
// `form` — the data returned from a form action

// https://svelte.dev/tutorial/kit/navigating-store
<script>
import { page, navigating } from '$app/stores';
</script>

{#if $navigating}
  navigating to {$navigating.to.url.pathname}
{/if}
```

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
// When  we  want  to  navigate  with  re-running  any  load  functions (https://svelte.dev/docs/kit/load)  and  replacing  page  components
goto('/id=789'); // create  a  new  page  history  entry  (`replaceState`  is  false  by  default  here)
goto('/id=789', { replaceState: true }); // it replaces current page history entry

// SHALLOW ROUTING
// (Why?): When  we  want  to  navigate -
//   1. without  traversal  through  the  list  of  history  entries
//   2. without  re-running  any  load  functions (https://svelte.dev/docs/kit/load)  AND
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
