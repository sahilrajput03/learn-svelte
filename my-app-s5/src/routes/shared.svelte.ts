// This file is consumed in file://./Counter.svelte

// Docs: .svelte.js and .svelte.ts files: https://svelte.dev/docs/svelte/svelte-js-files
import { writable } from 'svelte/store';
import { onMount } from "svelte";

// ! ALERT: Never reassign state (`counter`) when its defined in a module but feel free to mutate it.
export const counter = $state({
    count: 0
});

export const countStore = writable(0);

// This localstorage synced state is consumed in `Personal6a.svelte` file.
const wordsLocalStorageKey = 'words-new'
export let wordsState = $state<{ words: string[] }>({ words: [] });
export function setupWordsState() {
    onMount(() => { // Note: Since lifecycle methods can not be run outside component [tested] we must wrap `onMount` and $effect code to a function:
        wordsState.words = JSON.parse(localStorage.getItem(wordsLocalStorageKey)!) ?? [];
    });

    $effect(() => {
        if (wordsState.words) {
            localStorage.setItem(wordsLocalStorageKey, JSON.stringify(wordsState.words)); // whenever `value` changes we update to localStorage
        }
    });
}