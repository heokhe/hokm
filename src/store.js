import { writable } from 'svelte/store';

/** @type {import('svelte/store').Writable<import('./core').default>} */
export const game = writable(null);
window.g = game;
