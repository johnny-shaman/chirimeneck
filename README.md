# chirimeneck
W rapper class on chirimen for raspberry Pi about navigator.requestXAccess
 
usage:

download this repo and 

~~~html
  <script src="../../polyfill/polyfill.js"></script>
  <!-- load driver  as you like -->
    <script src="../../drivers/i2c-ADT7410.js"></script>
  <!-- load driver  as you like -->
  <script src="../../chirimeneck/gpio.js"></script>
  <script src="../../chirimeneck/i2c.js"></script>
~~~

javascript
~~~javascript

//GPIO

const wait = ms => setTimeout(p => new Promise(), ms);

(async function () {
  const gpio5 = await new GPIO(5, "in");
  const gpio26 = await new GPIO(26, "out");
  let v = 0;
  await gpio5.onchange = function (e) {
    v ^= v;
    await gpio26.write(v);
  };
})();

///I2C

(async function () {
  const i2c = await new I2C();
  const adt7410 = await i2c.loadDriver(ADT7410, 0x48);
  await adt7410.init()
  while (true) {
    let value = await adt7410.read();
    // do somthing
    await wait(1000);
  }
})();

(async function () {
  const i2c = await new I2C();
  const groveLight = await i2c.loadDriver(GROVELIGHT, 0x29);
  await groveLight.init()
  while (true) {
    try {
      var value = await groveLight.read();
      // console.log('value:', value);
      head.innerHTML = value ? value : head.innerHTML;
      await wait(200);
    } catch (error) {
      console.log(" Error : ", error);
    }
  }
})();
~~~