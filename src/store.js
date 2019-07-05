import { writable } from 'svelte/store';
import Game from './core';

export const isPlaying = writable(false);
const g = new Game();
export const game = writable(g);
window.g = g;
