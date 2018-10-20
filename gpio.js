const MotherOfGPIO = navigator.requestGPIOAccess()
window.GPIO =async function (port, io){ 
  let gpio = await MotherOfGPIO
  let p = await gpio.ports.get(port);
  await p.export(io);
  return p;
};