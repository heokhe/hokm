import * as R from 'ramda';
import chunk from 'lodash/chunk';
import shuffle from 'lodash/shuffle';

export { default as decide } from './decision';

/** @type {import('.').CardType[]} */ export const CARD_TYPES = ['D', 'G', 'K', 'P'];

/**
 * @param {import('.').Move[]} moves
 * @param {import('.').CardType} trumpSuite
 * @param {import('.').CardType} baseSuite
 */
export function getWinningMove(moves, trumpSuite, baseSuite) {
  const tn = t => (t === trumpSuite ? 2 : t === baseSuite ? 1 : 0);
  return R.head(R.sort((a, b) => {
    const { card: { type: at, number: an } } = a,
      { card: { type: bt, number: bn } } = b;
    return tn(bt) - tn(at) || bn - an;
  }, moves));
}

/** @returns {import('.').Card[][]} */
export function getCards() {
  const numbers = R.range(2, 15),
    types = R.range(0, 4).map(n => CARD_TYPES[n]);
  return chunk(shuffle(R.xprod(numbers, types)).map(([n, t]) => ({
    number: n,
    type: t
  })), 13);
}

export const stringifyNumber = n => (n === 14 ? 'A' : n === 13 ? 'K' : n === 12 ? 'Q' : n === 11 ? 'J' : String(n));

export const wait = ms => new Promise(r => { setTimeout(r, ms); });

/**
 * @param {import('.').Card[]} cards
 * @param {string} bs Base suite
 * @param {string} ts Trump suite
 */
export function findBestCard(cards, bs, ts) {
  const withBS = cards.filter(c => c.type === bs),
    withTS = cards.filter(c => c.type === ts);
  let filtered = R.sort(R.prop('number'), withBS.length ? withBS : withTS.length ? withTS : cards);
  if (withBS.length || withTS.length) filtered = filtered.reverse();
  return filtered[0];
}
