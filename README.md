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

'use strict';

//GPIO
(async function gpioFunction () {
  const gpio5  = await GPIO(5, "in");
  const gpio26 = await GPIO(26, "out");
  let v = 0;
  await gpio5.onchange = function (e) {
    v ^= v;
    await gpio26.write(v);
  };
})();

///I2C
(async function i2cFunction() {
  try {
    var adt7410 = await i2cLoadDriver(ADT7410, 0x48);
    while (1) {
      var value = await adt7410.read();
      // console.log('value:', value);
      head.innerHTML = value ? value : head.innerHTML;
      await sleep(1000);
    }
  } catch (error) {
    console.error("error", error);
  }
}

function sleep(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
})();
~~~