/** A custom event emitter. */
export default class EE {
  constructor() {
    /**
     * @typedef {{ event: string, callback: (...args: *[]) => *, once: boolean }} Listener
     * @type {Listener[]}
     */
    this._listeners = [];
  }

  on(event, callback, once = false) {
    this._listeners.push({ event, callback, once });
  }

  emit(event, ...args) {
    let bool = false;
    const listeners = this._listeners;
    for (let i = 0; i < listeners.length; i++) {
      const li = listeners[i];
      if (li.event === event) {
        if (!bool) bool = true;
        li.callback(...args);
        if (li.once) {
          listeners.splice(i, 1);
          i--;
        }
      }
    }
    return bool;
  }
}
