import * as R from 'ramda';
import { sortByNumber, getWinningCard } from '.';

/**
 * Decides which card to move.
 * @param {import('..').default} game
 * @param {import('../player').Player} me
 */
export default function decide(game, me) {
  const { baseSuite: base, trumpSuite: trump, activeCards } = game,
    cards = me.availableCards,
    bs = cards.filter(c => c.type === base),
    myTrumps = cards.filter(c => c.type === trump);

  if (bs.length) return R.last(sortByNumber(bs));
  if (myTrumps.length) {
    // if your teammate is going to win the trick, skip
    if (!activeCards.length || !getWinningCard(activeCards, trump, base).owner.isTeammateOf(me)) {
      const largest = R.last(sortByNumber(activeCards.filter(c => c.type === trump))),
        min = largest ? largest.number : 1,
        result = sortByNumber(myTrumps).find(c => c.number > min);
      if (result) return result;
    }
  }
  return sortByNumber(cards)[0];
}
