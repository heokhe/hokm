import { head, sort } from 'ramda';

/**
 * @param {import('../card').Card[]} cards
 * @param {import('../card').CardType} trumpSuite
 * @param {import('../card').CardType} baseSuite
 */
export default function getWinningCard(cards, trumpSuite, baseSuite) {
  const tn = t => (t === trumpSuite ? 2 : t === baseSuite ? 1 : 0);
  return head(sort((a, b) => {
    const { type: at, number: an } = a,
      { type: bt, number: bn } = b;
    return tn(bt) - tn(at) || bn - an;
  }, cards));
}
