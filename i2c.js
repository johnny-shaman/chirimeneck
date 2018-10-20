const MotherOfI2C = navigator.requestI2CAccess();
const i2c = async function () {
  let i2c = await MotherOfI2C;
  return await i2c.ports.get(1);
};

window.i2cLoadDriver = async function (driver, address, option = undefined) {
  let inited = new driver(await i2c(), address);
  await inited.init(option);
  return inited;
};

window.i2cGetSlave = async function (address) {
  return await i2c().port.open(address);
};
