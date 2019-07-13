import * as R from 'ramda';
import { shuffle, toChunks } from './utils';

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

  get isTrump() {
    return this.owner.game.trumpSuite === this.type;
  }
}

export function distribute() {
  const numbers = R.range(2, 15),
    types = R.range(0, 4).map(n => CARD_TYPES[n]);
  return toChunks(
    shuffle(
      R.xprod(numbers, types).map(([number, type]) => new Card(number, type))
    ), 13
  );
}
