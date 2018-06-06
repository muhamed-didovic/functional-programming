'use strict';

var _ = require('lodash');

// var Wrapper = (val) => {
//   console.log('aaaa', val);
//   return this.val = val;
//   //return this;
// };
// Wrapper.prototype.map = f => {
//   console.log('ssss', this.val, f);
//   return f(this.val);
// }
//
// Wrapper.prototype.map = function(f){
//   return wrap(f(this.val))
// }

var wrap = function wrap(val) {
  return new Wrapper(val);
};

var wrap = function wrap(val) {
  return {
    val: val,
    map: function map(f) {
      return wrap(f(val));
    },
    fold: function fold(f) {
      return f(val);
    }
  };
};

//console.log(wrap('11').val);

var msg = 'Hello FP!';
// var ss = wrap(msg).map(w => {
//   console.log(1, w);
//   return  _.words(w);
// }); //-> ['Hello', 'FP!']
console.log(wrap(msg).map(_.words).map(_.size).fold(function (x) {
  return x;
}));
//# sourceMappingURL=containerizing.js.map