/** Event emitter */
export default class EE {
  constructor() {
    /**
     * @typedef {{ event: string, callback: (...args: *[]) => * }} E
     * @type {E[]}
     */
    this._events = [];
  }

  on(event, callback) {
    this._events.push({ event, callback });
  }

  emit(event, ...args) {
    let b = false;
    for (const e of this._events) {
      if (e.event === event) {
        if (!b) b = true;
        e.callback(...args);
      }
    }
    return b;
  }
}
