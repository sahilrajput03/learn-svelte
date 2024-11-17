import * as database from '$lib/server/database';

export function load({ cookies }) {
    let userid = cookies.get('userid') as string;

    if (!userid) {
        userid = crypto.randomUUID();
        cookies.set('userid', userid, { path: '/' });
    }

    return {
        todos: database.getTodos(userid)
    };
}
