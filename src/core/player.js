import { Card } from './card';
import EE from './ee';

export class Player extends EE {
  /**
   * @param {string} name
   * @param {import('.').default} game
   * @param {Card[]} cards
   */
  constructor(name, game, cards) {
    super();
    this.name = name;
    this.game = game;
    this.cards = cards.map(c => {
      c.owner = this;
      return c;
    });
    /** @type {Team} */ this.team = null;
  }

  /** @param {Card} card */
  move(card) {
    const { baseSuite: base } = this.game;
    if (base && card.type !== base && this.availableCards.some(c => c.type === base)) {
      throw new Error(`You already have cards of type ${base}!`);
    }
    this.emit('move', card);
  }

  /** @returns {Promise<import('./card').Card>} */
  next() {
    return new Promise(r => {
      this.emit('must-move');
      this.on('move', card => {
        if (!(card instanceof Card)) throw new TypeError(`expected Card, got ${card}`);
        r(card);
      }, true);
    });
  }

  get availableCards() {
    return this.cards.filter(card => !card.isMoved);
  }

  get isTrumpCaller() {
    return this.game.tcid === this.name;
  }

  /** @param {Team} team */
  isMemberOf(team) {
    return team.members.includes(this);
  }

  /** @param {Player} player */
  isTeammateOf(player) {
    return this.team === player.team;
  }

  get index() {
    return this.game.players.indexOf(this);
  }

  get mustMove() {
    return this.game.turn === this.index;
  }
}

export class Team {
  /**
   * @param {Player} pa
   * @param {Player} pb
   */
  constructor(pa, pb) {
    pa.team = this;
    pb.team = this;
    this.members = [pa, pb];
    this.tricks = 0;
    this.hands = 0;
  }

  get rivalTeam() {
    return this.members[0].game.teams.find(t => t !== this);
  }
}
