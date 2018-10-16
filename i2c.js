let I2C = function () {
  this.use = I2C.prototype.use = I2C.prototype.use || navigator.requestI2CAccess().then(v => v.ports.get(1));
};

Object.defineProperties(I2C.prototype, {
  "@i2c": {
    configurable: true,
    writable: true,
    value: false
  },
  use: {
    configurable: true,
    async get () {
      return await this["@i2c"];
    },
    set (v) {
      this.constructor.prototype.i2c = v;
      return true;
    }
  },
  loadDriver: {
    configurable: true,
    async value (driver, address) {
      return await new driver(this.use, address);
    }
  },
  slaving: {
    async value (address) {
      return (await this.use).open(address);
    }
  }
});
