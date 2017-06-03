# hot-update

## English instructions

### Information
This module refers to `hot-require` and enhanced fault tolerance
Hot update js code without restart server for NodeJs, 

### Installation
```sh
npm install --save hot-update
```

### Getting started

```js
const hotRequire = require('hot-update');

setInterval(()=>{
  let Mod1 = hotRequire('./modules/mod1');
  let Mod2 = hotRequire('./modules/mod2');
  let Obj1 = hotRequire('./modules/obj1');
  console.log(m1.data, m2.data, Obj1.data);
}, 3000);
```

## 中文说明
### Information
本模块参考模块 `hot-require` ，并且添加容错处理
 

### 安装
```sh
npm install --save hot-update
```

### 快速开始

```js
const hotRequire = require('hot-update');

setInterval(()=>{
  let Mod1 = hotRequire('./modules/mod1');
  let Mod2 = hotRequire('./modules/mod2');
  let Obj1 = hotRequire('./modules/obj1');
  console.log(m1.data, m2.data, Obj1.data);
}, 3000);
```