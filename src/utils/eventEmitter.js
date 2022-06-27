const EventEmitter2 = require("eventemitter2");
const emitter = new EventEmitter2();

const events = {
  test: "test",
};

module.exports = {
  events,
  emitter,
};
