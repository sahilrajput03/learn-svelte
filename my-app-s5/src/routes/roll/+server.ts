import { json } from '@sveltejs/kit';

// This file is consumed in `group105/+page.svelte`

export function GET() {
    const number = Math.floor(Math.random() * 6) + 1;

    return json(number);
}
