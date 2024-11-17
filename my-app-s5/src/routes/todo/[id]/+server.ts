import * as database from '$lib/server/database.js';

type Type1 = { params: any, request: any, cookies: any }
export async function PUT({ params, request, cookies }: Type1) {
    const { done } = await request.json();
    const userid = cookies.get('userid');

    await database.toggleTodo({ userid, id: params.id, done });
    return new Response(null, { status: 204 });
}

type Type2 = { params: any, request: any, cookies: any }
export async function DELETE({ params, cookies }: Type2) {
    const userid = cookies.get('userid');

    await database.deleteTodo({ userid, id: params.id });
    return new Response(null, { status: 204 });
}
