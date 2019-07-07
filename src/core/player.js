import { Card } from './card';

export class Player {
  /**
   * @param {string} name
   * @param {import('.').default} game
   */
  constructor(name, game, onActivate = () => {}) {
    this.name = name;
    this.game = game;
    /** @type {Team} */ this.team = null;
    /** @type {import('./card').Card[]} */ this.cards = [];
    // this.history = [];
    this.onActivate = onActivate;
  }

  move(card) {
    this.game.handleMove(this, card);
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

  useCards(arr) {
    this.cards = arr.map(({ number, type }) => new Card(number, type, this));
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
