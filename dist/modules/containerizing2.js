'use strict';

var _ = require('lodash');
//
//
// var Wrapper = function(val) {
//   this.val = val;
// };
// Wrapper.prototype.map = (f) => f(this.val);
//
// Wrapper.prototype.toString = function(){
//   return 'Wrapper[' + this.val + ']';
// }
//
// var wrap = (val) => new Wrapper(val);
//
// var msg = 'Hello FP!';
// var result = wrap(msg).map(_.words); //-> ['Hello', 'FP!']
// console.log(result.toString());
var Wrapper = function Wrapper(val) {
  this.val = val;
};

Wrapper.prototype.map = function (f) {
  return wrap(f(this.val));
};

Wrapper.prototype.toString = function () {
  return 'Wrapper[' + this.val + ']';
};

var wrap = function wrap(val) {
  return new Wrapper(val);
};

// Map functions over wrapper
var result = wrap('Hello FP!').map(_.words);
console.log(result.toString());

/*
 Map the _.size function over the following wrapped value
 */
result = wrap([1, 2]).map(_.size);

console.log('Result: ' + (result.val == 2), result.val);
//# sourceMappingURL=containerizing2.js.map