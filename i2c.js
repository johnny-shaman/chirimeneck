let I2C = function () {
  this.i2c = this.i2c || navigator.requestI2CAccess()
  this.port = this.i2c.then(v => v.ports.get(1));
};

Object.defineProperties(I2C.prototype, {
  "@i2c": {
    configurable: true,
    writable: true,
    value: false
  },
  "@port": {
    configurable: true,
    writable: true,
    value: false
  },
  i2c: {
    configurable: true,
    async get () {
      return await this["@i2c"];
    },
    set (v) {
      this.constructor.prototype["@i2c"] = v;
      return true;
    }
  },
  port: {
    configurable: true,
    async get () {
      return await this["@port"];
    },
    set (v) {
      this.constructor.prototype["@port"] = v;
      return true;
    }
  },
  loadDriver: {
    configurable: true,
    async value (driver, address) {
      return await new driver(await this.port, address);
    }
  },
  slaving: {
    async value (address) {
      return (await this.port).open(address);
    }
  }
});
