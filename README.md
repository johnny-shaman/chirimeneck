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

const gpio5 = new GPIO(5, "in");
const gpio26 = new GPIO(26, "out");

gpio5.onchange = function (e) {
  // any you want
};

gpio26.write(1);


///I2C

(async function () {
  const i2c = new I2C();
  const adt7410 = i2c.loadDriver(ADT7410, 0x48);
  await adt7410.init()
  while (true) {
    let value = await adt7410.read();
    // do somthing
    await sleep(1000);
  }
})()
;
~~~