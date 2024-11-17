// SvelteKit Tutorial-6: https://svelte.dev/tutorial/kit/headers
export function load({ setHeaders }) {
	setHeaders({
		'Content-Type': 'text/plain'
	});
	//  Cache-Control response header at MDN: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
}

