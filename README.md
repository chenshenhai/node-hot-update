# hot-update

## English instructions

### Information
This module refers to `hot-require` and enhanced fault tolerance.

Thank you to the author of `hot-require`.

Hot update js code without restart server for NodeJs, 

### Installation
```sh
npm install --save hot-update
```

### Getting started

```js
const hotUpdate = require('hot-update');

setInterval(()=>{
  let Mod1 = hotUpdate('./modules/mod1');
  let Mod2 = hotUpdate('./modules/mod2');
  let Obj1 = hotUpdate('./modules/obj1');
  console.log(m1.data, m2.data, Obj1.data);
}, 3000);
```

## 中文说明

### 简介

本模块主要用于js文件的热更新，不需要重启node.js服务。

本模块参考模块 `hot-require` ，并且添加容错处理，对象字面量处理。

在此，对模块 `hot-require` 的作者表示感谢。
 

### 安装
```sh
npm install --save hot-update
```

### 快速开始

```js
const hotUpdate = require('hot-update');

setInterval(()=>{
  let Mod1 = hotUpdate('./modules/mod1');
  let Mod2 = hotUpdate('./modules/mod2');
  let Obj1 = hotUpdate('./modules/obj1');
  console.log(m1.data, m2.data, Obj1.data);
}, 3000);
```