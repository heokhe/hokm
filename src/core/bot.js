import { decide } from './utils/';

/** @param {import('./player').Player} me */
export default function wrapAsBot(me) {
  const { game } = me;
  me._onActivate = () => {
    game.on('move', () => {
      if (!me.mustMove) return;
      me.move(decide(game, me));
    });
  };
  return me;
}
