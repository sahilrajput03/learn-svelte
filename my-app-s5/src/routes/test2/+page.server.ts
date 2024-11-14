// SvelteKit Tutorial-7: https://svelte.dev/tutorial/kit/cookies

// Note: SvelteKit internally uses this popular package: https://github.com/jshttp/cookie#api
export function load({ cookies }) {
	const visited = cookies.get('visited');

	// From tutorial: The setHeaders function can’t be used with the Set-Cookie header. Instead, you
	// 			should use the cookies API.

	cookies.set('visited', 'true', { path: '/' });
	//  From tutorial: It’s strongly recommended that you explicitly configure the path when
	// 			setting a cookie, since browsers’ default behaviour — somewhat uselessly — is
	// 			to set the cookie on the parent of the current path.

	// On first page load you should see "stranger" but on subsequent page load you should
	// 		see "friend" because we set cookie on the site

	return {
		visited: visited === 'true'
	};
}

// SvelteKit sets the following defaults to make your cookies more secure:
// =======================================================================
// {
// 	httpOnly: true,
// 	secure: true,
// 	sameSite: 'lax'
// }