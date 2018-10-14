let I2C = function () {
  this.use = I2C.prototype.use = I2C.prototype.use || navigator.requestI2CAccess().then(v => v.ports.get(1));
};

Object.defineProperties(I2C.prototype, {
  port: {
    configurable: true,
    writable: true,
    value: false
  },
  use: {
    configurable: true,
    get () {
      return this.constructor.prototype.i2c;
    },
    set (v) {
      this.constructor.prototype.i2c = v;
      return true;
    }
  },
  loadDriver: {
    configurable: true,
    value (driver, address) {
      return new driver(this.use, address);
    }
  },
  slaving: {
    async value (address) {
      return await this.use.open(address);
    }
  }
});
