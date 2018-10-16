let GPIO = function (port, io) {
  this.gpio = this.gpio || navigator.requestGPIOAccess();
  this.gpio.then(gpio => gpio.ports.get(port)).then(p => p.export(io));
};

Object.defineProperties(GPIO.prototype, {
  "@gpio": {
    configurable: true,
    writable: true,
    value: false
  },
  gpio: {
    configurable: true,
    async get () {
      return await this["@gpio"];
    },
    set (v) {
      this.constructor.prototype.gpio = v;
      return true;
    }
  },
  write: {
    configurable: true,
    async get () {
      return (await this.gpio).write;
    }
  },
  onchange: {
    async get () {
      return (await this.gpio).onchange;
    },
    set (f) {
      this.gpio.onchange = f;
      return true;
    }
  }
});
