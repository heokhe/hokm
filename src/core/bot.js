import decide from './utils/decision';
import { wait } from './utils';

/** @param {import('./player').Player} me */
export default function wrapAsBot(me) {
  me.on('must-move', async () => {
    await wait(1000);
    me.move(decide(me));
  });
}
