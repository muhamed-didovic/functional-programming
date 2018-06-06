"use strict";

//Whenever you see a fold, think removal from a type,
// be it a collection which relies on a monoid or just a single value in a type.


var _require = require('immutable-ext'),
    Map = _require.Map,
    List = _require.List;

// -----------------------------
// Sum monoid


var Sum = function Sum(x) {
  return {
    x: x,
    concat: function concat(_ref) {
      var y = _ref.x;
      return Sum(x + y);
    },
    inspect: function inspect() {
      return "Sum(" + x + ")";
    }
  };
};

Sum.empty = function () {
  return Sum(0);
};
// -----------------------------

var res1 = [Sum(1), Sum(2), Sum(3)].reduce(function (acc, x) {
  return acc.concat(x);
}, Sum.empty());

var res2 = Map({ brian: 10, sara: 2 }).map(Sum).fold(Sum.empty());

var res33 = List.of(1, 2, 3).map(function (x) {
  return Sum(x);
}).fold(Sum.empty());

var res3 = List.of(1, 2, 3).foldMap(Sum, Sum.empty());

var s = List.of(Sum(1), Sum(2), Sum(3)).fold(Sum.empty());
console.log(11, s, res33);
console.log("result 1: ", res1.inspect());
console.log("result 2: ", res2.inspect());
console.log("result 3: ", res3.inspect());
console.log(Sum(1).concat(Sum(2)));
//# sourceMappingURL=10.js.map