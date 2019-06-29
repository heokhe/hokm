import {
  sort, head, range, xprod
} from 'ramda';
import { shuffle, chunk } from 'lodash';

/** @type {import('./game').CardType[]} */
export const CARD_TYPES = ['D', 'G', 'K', 'P'];

/**
 * @param {import('./game').Move[]} moves
 * @param {import('./game').CardType} trumpSuite
 * @param {import('./game').CardType} baseSuite
 */
export function getWinningMove(moves, trumpSuite, baseSuite) {
  const tn = t => (t === trumpSuite ? 2 : t === baseSuite ? 1 : 0);
  return head(sort((a, b) => {
    const { card: { type: at, number: an } } = a,
      { card: { type: bt, number: bn } } = b;
    return tn(bt) - tn(at) || bn - an;
  }, moves));
}

/** @returns {import('./game').Card[][]} */
export function getCards() {
  const numbers = range(1, 14),
    types = range(0, 4).map(n => CARD_TYPES[n]);
  return chunk(shuffle(xprod(numbers, types)).map(([n, t]) => ({
    number: n,
    type: t
  })), 13);
}
