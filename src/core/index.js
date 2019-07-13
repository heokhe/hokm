/* eslint-disable no-await-in-loop */
import wrapAsBot from './bot';
import EE from './ee';
import { distribute } from './card';
import { getWinningCard, wait } from './utils';
import { Player, Team } from './player';

export default class Game extends EE {
  constructor() {
    super();
    const allCards = distribute(),
      players = allCards.map((cards, i) => {
        let p = new Player(i ? `bot${i}` : 'me', this, cards);
        if (i) p = wrapAsBot(p);
        return p;
      }),
      [a, b, c, d] = players;
    this.teams = [new Team(a, c), new Team(b, d)];
    this.players = players;

    this.tcid = players[0].name;
    /** @type {number} */ this.turn = 0;
    /** @type {import('./card').CardType} */ this.baseSuite = null;
    /** @type {import('./card').CardType} */ this.trumpSuite = null;
    /** @type {import('./card').Card[]} */ this.activeCards = [];
  }

  init(trump) {
    this.trumpSuite = trump;
    this.start().then(this.end.bind(this));
  }

  async start() {
    const [a, b] = this.teams,
      MAX = 7;
    while (a.tricks < MAX && b.tricks < MAX) {
      const {
          players, turn, activeCards: actives
        } = this,
        card = await players[turn].next();

      console.log(`[${card.owner.name}]`, card);
      card.isMoved = true;
      actives.push(card);
      const len = actives.length;
      if (len === 1) this.baseSuite = card.type;
      this.emit('move');
      if (len === 4) {
        await wait(1000);
        this.resetMoves();
        this.emit('reset');
        console.log('----------');
      } else this.turn = turn === 3 ? 0 : (turn + 1);
    }
  }

  resetMoves() {
    const { activeCards: actives } = this,
      { owner: winner } = getWinningCard(actives, this.trumpSuite, this.baseSuite);
    winner.team.tricks++;
    this.turn = winner.index;
    this.baseSuite = null;
    actives.length = 0;
  }

  get tricks() {
    return this.teams.map(t => t.tricks);
  }

  get me() {
    return this.players[0];
  }

  get trumpCaller() {
    return this.players.find(p => p.name === this.tcid);
  }

  end() {
    const [a, b] = this.teams,
      winner = a.tricks > b.tricks ? a : b,
      loser = winner.rivalTeam;
    this.emit('end', { winner, loser });
  }
}
