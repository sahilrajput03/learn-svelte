// This file is consumed in file://./Counter.svelte

import { writable } from 'svelte/store';

// ! ALERT: Never reassign state (`counter`) when its defined in a module but feel free to mutate it.
export const counter = $state({
    count: 0
});

export const countStore = writable(0);