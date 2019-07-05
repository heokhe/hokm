import * as R from 'ramda';

/**
 * Decides which card to move.
 * @param {import('..').default} game
 * @param {import('..').Player} player
 */
export default function decide(game, player) {
  const { baseSuite: base, trumpSuite: trump } = game,
    cards = player.availableCards,
    bs = cards.filter(c => c.type === base),
    ts = cards.filter(c => c.type === trump),
    sorted = R.sort(R.prop('number'), bs.length ? bs : ts.length ? ts : cards);

  return R.last(sorted);
}
