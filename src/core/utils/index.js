import * as R from 'ramda';

export { default as getWinningCard } from './winningCard';

export const stringifyNumber = n => (n === 14 ? 'A' : n === 13 ? 'K' : n === 12 ? 'Q' : n === 11 ? 'J' : String(n));

export const wait = ms => new Promise(r => setTimeout(r, ms));

/**
 * Ascendingly sorts a list of cards according to their numeric value.
 * @template T
 * @param {T[]} arr
 * @returns {T[]}
 */
export const sortByNumber = arr => R.sortBy(R.prop('number'), arr);

/**
 * @template T
 * @param {T[]} arr
 * @returns {T[]}
 */
export function shuffle(arr) {
  if (arr.length <= 1) return [...arr];
  const index = Math.floor(Math.random() * arr.length);
  return shuffle(R.remove(index, 1, arr)).concat(arr[index]);
}

/**
 * @template T
 * @param {T[]} arr
 * @param {number} len
 * @returns {T[][]}
 * @example toChunks([1, 2, 3, 4, 5, 6, 7], 2) // [[1, 2], [3, 4], [5, 6], [7]]
 */
export function toChunks(arr, len) {
  const chunks = [];
  for (let i = 0; i < (arr.length / len); i++) {
    const start = i * len;
    chunks.push(arr.slice(start, start + len));
  }
  return chunks;
}

/** @param {import('../card').Card[]} cards */
export const sortCards = cards => cards.sort((a, b) => {
  const at = a.type,
    bt = b.type;
  return at === bt ? a.number - b.number : (at > bt ? 1 : -1);
});
