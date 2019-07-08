import EE3 from 'eventemitter3';
import * as R from 'ramda';
import { Team, Player } from './player';
import { getWinningCard, getCards, wait } from './utils';
import wrapAsBot from './bot';

export default class Game extends EE3 {
  /**
   * @param {Object} options
   * @param {Player[]} options.players
   * @param {CardType} options.trumpSuite
   */
  constructor() {
    super();

    const cards = getCards(),
      players = R.range(0, 4).map((_, i) => {
        const p = i ? wrapAsBot(new Player(`b-${i}`, this)) : new Player('me', this);
        p.useCards(cards.shift());
        return p;
      }),
      [a, b, c, d] = players;
    this.teams = [new Team(a, c), new Team(b, d)];
    this.players = players;
    players.forEach(p => p.onActivate());

    this.tcid = players[0].name;
    /** @type {number} */ this.turn = 0;
    /** @type {import('./card').CardType} */ this.baseSuite = null;
    /** @type {import('./card').CardType} */ this.trumpSuite = null;
    /** @type {import('./card').Card[]} */ this.activeCards = [];
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

  /**
   * @param {Player} player
   * @param {import('./card').Card} card
   */
  async handleMove(player, card) {
    const {
      activeCards: actives, trumpSuite: trump, baseSuite: base, turn
    } = this;

    if (card.type !== base && card.owner.availableCards.some(c => c.type === base)) {
      throw new Error('hokm bia');
    }
    if (card.owner !== player || card.isMoved) throw new Error('shit');
    if (!trump) throw new Error('vaisa!');
    if (!player.mustMove) throw new Error('wait. that\'s illegal.');
    if (actives.length === 0 && this.totalTricks === 0 && card.type !== trump) throw new Error('hokm o bia koskesh');

    // eslint-disable-next-line no-console
    console.log(`[${player.name}]`, card);

    card.isMoved = true;
    if (card.owner !== this.me) await wait(1000);
    actives.push(card);
    if (actives.length < 4) {
      if (actives.length === 1) this.baseSuite = actives[0].type;
      this.turn = turn === 3 ? 0 : turn + 1;
    } else this.resetMoves();

    this.emit('move', { player, card });
  }

  resetMoves() {
    const { activeCards: actives } = this,
      { owner: winner } = getWinningCard(actives, this.trumpSuite, this.baseSuite);
    winner.team.tricks++;
    this.turn = winner.index;
    this.baseSuite = null;
    actives.length = 0;
    if (winner.team.tricks === 7) this.end();
  }

  end() {
    const [a, b] = this.teams,
      winner = a.tricks > b.tricks ? a : b,
      loser = winner.rivalTeam;
    this.emit('end', { winner, loser });
  }
}
