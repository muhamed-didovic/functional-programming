'use strict';

//Refactor imperative code to a single composed expression using Box

var Box = function Box(x) {
  return {
    map: function map(f) {
      return Box(f(x));
    },
    fold: function fold(f) {
      return f(x);
    },
    toString: function toString() {
      return 'Box(' + x + ')';
    }
  };
};

var moneyToFloat = function moneyToFloat(str) {
  return Box(str).map(function (s) {
    return s.replace(/\$/g, '');
  }).map(function (r) {
    console.log(111, r, parseFloat(r));
    return parseFloat(r);
  });
};

var percentToFloat = function percentToFloat(str) {
  return Box(str.replace(/\%/g, '')).map(function (replaced) {
    return parseFloat(replaced);
  }).map(function (number) {
    console.log('2222', number, number * 0.01, parseFloat('44%'));
    return number * 0.01;
  });
};

var applyDiscount = function applyDiscount(price, discount) {
  return moneyToFloat(price).fold(function (cost) {
    return percentToFloat(discount).fold(function (savings) {
      return cost - cost * savings;
    });
  });
};

var result = applyDiscount('$5.00', '20%');
console.log(result);
//# sourceMappingURL=2.js.map