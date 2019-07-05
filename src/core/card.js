import * as R from 'ramda';
import chunk from 'lodash/chunk';
import shuffle from 'lodash/shuffle';


/** @typedef {'G'|'K'|'P'|'D'} CardType */
/** @type {CardType[]} */ export const CARD_TYPES = ['D', 'G', 'K', 'P'];

export class Card {
  /**
   * @param {number} number
   * @param {CardType} type
   * @param {import('./player').Player} [owner]
   */
  constructor(number, type, owner) {
    this.number = number;
    this.type = type;
    this.owner = owner;
    this.isMoved = false;
  }
}

export function distribute() {
  const numbers = R.range(2, 15),
    types = R.range(0, 4).map(n => CARD_TYPES[n]);
  return chunk(shuffle(R.xprod(numbers, types)).map(([n, t]) => ({
    number: n,
    type: t
  })), 13);
}
