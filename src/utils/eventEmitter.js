const EventEmitter2 = require("eventemitter2");
const emitter = new EventEmitter2();

const events = {
  test: "test",
  trigger: "trigger",
};

module.exports = {
  events,
  emitter,
};
