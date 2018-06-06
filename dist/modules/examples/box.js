"use strict";

var Box = function Box(x) {
  return {
    ap: function ap(b2) {
      return b2.map(x);
    },
    chain: function chain(f) {
      return f(x);
    },
    map: function map(f) {
      return Box(f(x));
    },
    fold: function fold(f) {
      return f(x);
    },
    inspect: function inspect() {
      return "Box(" + x + ")";
    }
  };
};

module.exports = Box;
//# sourceMappingURL=box.js.map