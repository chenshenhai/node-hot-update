const hotUpdate = require('./../index');

setInterval(()=>{
  // let Mod1 = $require('./modules/mod1');
  // let Mod2 = $require('./modules/mod2');
  let Mod1 = hotUpdate('./modules/mod1');
  let Mod2 = hotUpdate('./modules/mod2');
  let Obj1 = hotUpdate('./modules/obj1');

  let m1 = new Mod1();
  let m2 = new Mod2();

  console.log(m1.data, m2.data, Obj1.data);
}, 3000)