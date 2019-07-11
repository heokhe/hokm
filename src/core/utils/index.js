import * as R from 'ramda';

/**
 * @param {import('../card').Card[]} cards
 * @param {import('../card').CardType} trumpSuite
 * @param {import('../card').CardType} baseSuite
 */
export function getWinningCard(cards, trumpSuite, baseSuite) {
  const tn = t => (t === trumpSuite ? 2 : t === baseSuite ? 1 : 0);
  return R.head(R.sort((a, b) => {
    const { type: at, number: an } = a,
      { type: bt, number: bn } = b;
    return tn(bt) - tn(at) || bn - an;
  }, cards));
}

export const stringifyNumber = n => (n === 14 ? 'A' : n === 13 ? 'K' : n === 12 ? 'Q' : n === 11 ? 'J' : String(n));

export const wait = ms => new Promise(r => setTimeout(r, ms));

/**
 * Ascendingly sorts a list of cards according to their numeric value.
 * @template T
 * @param {T[]} arr
 * @returns {T[]}
 */
export const sortByNumber = arr => R.sortBy(R.prop('number'), arr);
