let GPIO = function (port, io) {
  this.use = GPIO.prototype.use = GPIO.prototype.use || navigator.requestGPIOAccess();
  this.use.then(gpio => gpio.ports.get(port)).then(p => p.export(io));
};

Object.defineProperties(GPIO.prototype, {
  gpio: {
    configurable: true,
    writable: true,
    value: false
  },
  use: {
    configurable: true,
    get () {
      return this.constructor.prototype.gpio;
    },
    set (v) {
      this.constructor.prototype.gpio = v;
      return true;
    }
  },
  onchange: {
    get () {
      return this.use.onchange;
    },
    set (f) {
      this.use.onchange = f;
      return true;
    }
  }
});
