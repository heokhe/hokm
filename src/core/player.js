/** @return {string} */
const generateId = () => Math.floor(Math.random() * 1e4).toString().padEnd(4, 0);

export class Player {
  constructor() {
    this.id = generateId();
    /** @type {import('./game').default} */ this.game = null;
    /** @type {Team} */ this.team = null;
    /** @type {import('./game').Card[]} */ this.cards = null;
    this.activated = null;
  }

  move(card) {
    this.game.handleMove(this, card);
  }

  get isTrumpCaller() {
    return this.game.tcid === this.id;
  }

  get index() {
    return this.game.players.indexOf(this);
  }

  get mustMove() {
    return this.game.turn === this.index;
  }

  /** @param {Team} team */
  isMemberOf(team) {
    return team.members.includes(this);
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

  get game() {
    return this.members[0].game;
  }

  get rivalTeam() {
    return this.game.teams.find(t => t !== this);
  }
}
