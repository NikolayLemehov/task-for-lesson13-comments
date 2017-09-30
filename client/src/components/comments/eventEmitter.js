export class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(event, handler) {
    if(this._events[event] === undefined) {
      this._events[event] = [handler];
    } else {
      this._events[event].push(handler);
    }
  }

  dispatch(event, payload) {
    if (this._events[event] !== undefined) {
      for(let handler of this._events[event]) {
        handler(payload);
      }
    }
  }

  unsub(event, handler) {
    this._events[event] = this._events[event].filter(callback => {
      return callback !== handler;
    })
  }
}