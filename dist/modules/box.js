"use strict";

var Box = function Box(x) {
  return {
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

exports.Box = Box;
//# sourceMappingURL=box.js.map