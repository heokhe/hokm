import decide from './utils/decision';

/** @param {import('./player').Player} me */
export default function wrapAsBot(me) {
  const { game } = me;
  me.onActivate = () => {
    game.on('move', () => {
      if (!me.mustMove) return;
      me.move(decide(game, me));
    });
  };
  return me;
}
