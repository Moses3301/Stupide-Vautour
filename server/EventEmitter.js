function EventEmitter() {
  const eventRegister = {};

  const on = (name, fn) => {
    if (!eventRegister[name]) eventRegister[name] = [];
    eventRegister[name].push(fn);
  }

  const trigger = (name, args) => {
    if (!eventRegister[name]) return false;
    eventRegister[name].forEach((fn) => fn(args));
  }

  const off = (name, fn) => {
    if (eventRegister[name]) {
      const index = eventRegister[name].indexOf(fn);
      if (index >= 0) eventRegister[name].splice(index, 1);
    }
  }

  return {
    on, trigger, off
  }
}

module.exports = EventEmitter;
