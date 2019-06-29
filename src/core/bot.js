import { Player } from './player';

export default class Bot extends Player {
  // /** @param {import('./game').default} game */
  // activated = game => {
  //   game.on('move', this.handleMove);
  // }

  /** @param {import('./game').Move} move */
  handleMove(move) {
    if (this.mustMove) {
      this.move({
        type: this.game.baseSuite,
        number: 1
      });
    }
  }
}
