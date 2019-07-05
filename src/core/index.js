import EE3 from 'eventemitter3';
import * as R from 'ramda';
import { Team, Player } from './player';
import { getWinningMove, getCards } from './utils/';
import wrapAsBot from './bot';

/**
 * @typedef {import('./player').Player} Player
 * @typedef {'G'|'K'|'P'|'D'} CardType
 * @typedef {{ type: CardType, number: number }} Card
 * @typedef {{ player: Player, card: Card }} Move
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
        p.cards = cards.shift();
        return p;
      }),
      [a, b, c, d] = players;
    this.teams = [new Team(a, c), new Team(b, d)];
    this.players = players;
    players.forEach(p => p.onActivate());

    this.tcid = players[0].id;
    /** @type {number} */ this.turn = 0;
    /** @type {CardType} */ this.baseSuite = null;
    /** @type {CardType} */ this.trumpSuite = null;
    /** @type {Move[]} */ this.moves = [];
  }

  get tricks() {
    return this.teams.map(t => t.tricks);
  }

  get me() {
    return this.players[0];
  }

  get trumpCaller() {
    return this.players.find(p => p.id === this.tcid);
  }

  teamOf(player) {
    return this.teams.find(t => t.includes(player));
  }

  /**
   * @param {Player} player
   * @param {Card} card
   */
  handleMove(player, card) {
    const {
        moves, trumpSuite, baseSuite, turn
      } = this,
      move = { player, card };

    console.log(`[${player.id}]`, card);
    if (!trumpSuite) throw new Error('vaisa!');
    if (!player.mustMove) throw new Error('wait. that\'s illegal.');
    if (moves.length === 0 && this.totalTricks === 0
      && card.type !== trumpSuite) throw new Error('hokm o bia koskesh');

    moves.push(move);
    player.history.push(player.cards.indexOf(card));
    if (moves.length === 4) {
      const { player: winner } = getWinningMove(moves, trumpSuite, baseSuite),
        { team } = winner,
        { rivalTeam: rival } = team;

      team.tricks++;
      this.tcid = winner.id;
      this.turn = winner.index;
      this.baseSuite = null;
      moves.length = 0;
      // console.log('-----------------');
      // this.emit('move', move);

      if (winner.team.tricks === 7) {
        this.end();
        // let hands = 1;
        // if (rival.tricks === 0) hands++;
        // if (this.trumpCaller.isMemberOf(rival)) hands++;
        // team.hands += hands;

        // team.tricks = 0;
        // rival.tricks = 0;
      }
    } else {
      if (moves.length === 1) this.baseSuite = moves[0].card.type;
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
