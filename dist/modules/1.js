'use strict';

// Code goes here

var Box = function Box(x) {
  return {
    map: function map(f) {
      return Box(f(x));
    },
    fold: function fold(f) {
      return f(x);
    },
    inspect: function inspect() {
      return 'Box(' + x + ')';
    }
  };
};

var nextCharForNumberString = function nextCharForNumberString(str) {
  return Box(str).map(function (s) {
    return s.trim();
  }).map(function (r) {
    return parseInt(r);
  }).map(function (i) {
    return i + 1;
  }).map(function (i) {
    return String.fromCharCode(i);
  }).fold(function (c) {
    return c.toLowerCase();
  });
};

var result = nextCharForNumberString('  64  ');

console.log(11, result);

var test = function test(s) {
  return Box(s).map(function (s) {
    return s.trim();
  }).map(function (n) {
    return new Number(n);
  }).map(function (i) {
    return ++i;
  }).map(function (i) {
    return String.fromCharCode(i);
  }).fold(function (c) {
    return c;
  });
};

console.log(22, test('    65   '));
//# sourceMappingURL=1.js.map