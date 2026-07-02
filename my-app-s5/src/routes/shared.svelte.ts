// This file is consumed in file://./Counter.svelte and file://./Counter2.svelte

// Docs: .svelte.js and .svelte.ts files: https://svelte.dev/docs/svelte/svelte-js-files
import { writable } from 'svelte/store';
import { onMount } from "svelte";

// Used in `Group4.svelte`
// ! ALERT: Never reassign state (`counter`) when its defined in a
//          module but feel free to mutate it.
export const counter = $state({
    count: 0
});

// Used in `Group45.svelte`
export const countStore = writable(0);

// & This localstorage synced state is consumed in `Personal6a.svelte` file.
const wordsLocalStorageKey = 'words-new'
export const wordsState = $state<{ words: string[] }>({ words: [] });

// Note: Since lifecycle methods can not be run outside component
//       [TESTED] we must wrap `onMount` and `$effect` code to a function:
export function setupWordsState() {
    onMount(() => { wordsState.words = JSON.parse(localStorage.getItem(wordsLocalStorageKey)!) ?? []; });
    // Whenever `value` changes we update to localStorage.
    $effect(() => { if (wordsState.words) { localStorage.setItem(wordsLocalStorageKey, JSON.stringify(wordsState.words)); } });
}
