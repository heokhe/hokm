import EE3 from 'eventemitter3';
import * as R from 'ramda';
import { Team, Player } from './player';
import { getWinningMove, getCards } from './utils/';
import wrapAsBot from './bot';

/**
 * @typedef {import('./player').Player} Player
 * @typedef {{ player: Player, card: import('./card').Card }} Move
 */

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
    /** @type {Move[]} */ this.activeCards = [];
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

  teamOf(player) {
    return this.teams.find(t => t.includes(player));
  }

  /**
   * @param {Player} player
   * @param {import('./card').Card} card
   */
  handleMove(player, card) {
    const {
        activeCards, trumpSuite, baseSuite, turn
      } = this,
      move = { player, card };

    console.log(`[${player.name}]`, card);
    if (card.owner !== player || card.isMoved) throw new Error('shit');
    if (!trumpSuite) throw new Error('vaisa!');
    if (!player.mustMove) throw new Error('wait. that\'s illegal.');
    if (activeCards.length === 0 && this.totalTricks === 0 && card.type !== trumpSuite) throw new Error('hokm o bia koskesh');

    card.isMoved = true;
    activeCards.push(move);
    if (activeCards.length === 4) {
      const winner = getWinningMove(activeCards, trumpSuite, baseSuite).player;
      winner.team.tricks++;
      this.tcid = winner.name;
      this.turn = winner.index;
      this.baseSuite = null;
      activeCards.length = 0;
      if (winner.team.tricks === 7) this.end();
    } else {
      if (activeCards.length === 1) this.baseSuite = activeCards[0].card.type;
      this.turn = turn === 3 ? 0 : turn + 1;
    }
    this.emit('move', move);
  }

  end() {
    const [a, b] = this.teams,
      winner = a.tricks > b.tricks ? a : b,
      loser = winner.rivalTeam;
    this.emit('end', { winner, loser });
  }
}
