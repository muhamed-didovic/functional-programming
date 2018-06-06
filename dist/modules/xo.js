'use strict';

var Box = require('./examples/box');
var Either = require('./examples/either');
var Task = require('data.task');

var xo = function xo(input) {
  return Task.of(input).map(function (str) {
    console.log('str', str);
    return str.replace(/[^o]/ig, "").length === str.replace(/[^x]/ig, "").length;
  });
};

//
// xo('xXxoOO').fork(console.error, console.log);
// xo('xxx').fork(console.error, console.log);
// xo('ooxx').fork(console.error, console.log);
xo('aaaa').fork(console.error, console.log);
xo('').fork(console.error, console.log);
//# sourceMappingURL=xo.js.map