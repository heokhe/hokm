import * as R from 'ramda';
import decide from './utils/decision';
import { Player } from './player';
import { sortByNumber, getWinningCard /* , wait */ } from './utils';

export class Bot extends Player {
  constructor(name, g) {
    super(name, g, () => {
      this.game.on('move', async () => {
        if (this.mustMove) this.move(this.decide());
      });
    });
  }

  decide() {
    const { baseSuite: base, trumpSuite: trump, activeCards } = this.game,
      cards = sortByNumber(this.availableCards),
      bs = cards.filter(c => c.type === base),
      myTrumps = cards.filter(c => c.isTrump);

    if (bs.length) {
      return R.last(bs);
    }
    if (myTrumps.length) {
      // if your teammate is going to win the trick, skip
      if (!activeCards.length
        || !getWinningCard(activeCards, trump, base).owner.isTeammateOf(this)) {
        const largest = R.last(sortByNumber(activeCards.filter(c => c.isTrump))),
          min = largest ? largest.number : 1,
          result = myTrumps.find(c => c.number > min);
        if (result) return result;
      }
    }
    return cards[0];
  }
}

export const isBot = player => player instanceof Bot;

/** @param {import('./player').Player} me */
export default function wrapAsBot(me) {
  const { game } = me;
  me.onActivate = () => {
    game.on('move', () => {
      if (!me.mustMove) return;
      me.move(decide(me));
    });
  };
  return me;
}
