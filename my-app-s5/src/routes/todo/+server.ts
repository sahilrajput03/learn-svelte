import { json } from '@sveltejs/kit';
import * as database from '$lib/server/database.js';

export async function POST({ request, cookies }): Promise<Response> {
	const { description } = await request.json();

	// TYPESCRIPT: We give type string type to user via `as string` because we
	// assign `userid` cookie to every user on server side `src/routes/group106/+page.svelte`
	const userid = cookies.get('userid') as string;
	console.log('userid?', userid)
	const { id } = await database.createTodo({ userid, description });

	return json({ id }, { status: 201 });
}
