import EE3 from 'eventemitter3';
import { Team } from './player';
import { getWinningMove, getCards } from './utils';
import Bot from './bot';

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
  constructor({ players, trumpSuite }) {
    super();

    const cards = getCards();
    for (const p of players) {
      p.game = this;
      p.cards = cards.shift();
      if (p.activated) p.activated(this);
    }
    const [a, b, c, d] = players;
    this.teams = [new Team(a, c), new Team(b, d)];
    this.players = [a, b, c, d];

    this.tcid = players[0].id;
    /** @type {number} */ this.turn = 0;
    this.trumpSuite = trumpSuite;
    /** @type {CardType} */ this.baseSuite = null;
    /** @type {Move[]} */ this.moves = [];
  }

  get tricks() {
    return this.teams.map(t => t.tricks);
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

    if (!player.mustMove) throw new Error('wait. that\'s illegal.');
    if (moves.length === 0 && this.totalTricks === 0
      && card.type !== trumpSuite) throw new Error('hokm o bia koskesh');

    moves.push(move);
    if (moves.length === 4) {
      const { player: winner } = getWinningMove(moves, trumpSuite, baseSuite),
        { team } = winner,
        { rivalTeam: rival } = team;

      team.tricks++;
      // this.tcid = winner.id;
      this.turn = winner.index;
      this.emit('move', { ...move, winner, winnerTeam: team });
      this.baseSuite = null;
      moves.length = 0;

      if (winner.team.tricks === 7) {
        let hands = 1;
        if (rival.tricks === 0) hands++;
        if (this.trumpCaller.isMemberOf(rival)) hands++;
        team.hands += hands;

        team.tricks = 0;
        rival.tricks = 0;
      }
    } else {
      if (moves.length === 1) this.baseSuite = moves[0].card.type;
      this.turn = turn === 3 ? 0 : turn + 1;
      this.emit('move', move);
    }
  }

  end() {
    const [a, b] = this.teams,
      winner = a.tricks > b.tricks ? a : b,
      loser = winner.rivalTeam;
    this.emit('end', { winner, loser });
  }

  /** @param {Player} player */
  static singlePlayer(player, trumpSuite) {
    return new Game({
      trumpSuite,
      players: [player, ...Array.from({ length: 3 }, () => new Bot())]
    });
  }
}
