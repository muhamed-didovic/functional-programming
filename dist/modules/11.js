'use strict';

// Delay Evaluation with LazyBox

//We want to convert our value that's right there, our concrete value,
// to a function that will eventually return our value.
//Sometimes this is referred to as a Church encoding


var LazyBox = function LazyBox(g) {
  return {
    fold: function fold(f) {
      return f(g());
    },
    map: function map(f) {
      return LazyBox(function () {
        return f(g());
      });
    }
  };
};

var result = LazyBox(function () {
  return '  64 ';
}).map(function (abba) {
  return abba.trim();
}).map(function (trimmed) {
  return new Number(trimmed);
}).map(function (number) {
  return number + 1;
}).map(function (x) {
  return String.fromCharCode(x);
}).fold(function (x) {
  return x.toLowerCase();
});

console.log(result);
//# sourceMappingURL=11.js.map