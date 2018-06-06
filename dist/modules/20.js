'use strict';

//List comprehensions with Applicative Functors

//We annihilate the need for the ol' nested for loop using Applicatives.

var _require = require('immutable-ext'),
    List = _require.List;

//messy imperative code transform into applicative functor
// for(x in xs) {
//   for(y in ys) {
//     for(z in zs) {
//     }
//   }
// }

var res1 = List.of(function (x) {
  return x;
}).ap(List.of([1, 2, 3]));
var res2 = List.of(function (x) {
  return x;
}).ap(List([1, 2, 3]));

//run like for in for loop
var res3 = List.of(function (x) {
  return function (y) {
    return x + ' - ' + y;
  };
}).ap(List([1, 2, 3])).ap(List([4, 5, 6]));
var res4 = List.of(function (x) {
  return function (y) {
    return x + ' - ' + y;
  };
}).ap(List.of([1, 2, 3])).ap(List.of([4, 5, 6]));
console.log('res1', res1);
console.log('res2', res2);
console.log('res3', res3);
console.log('res4', res4);

var merch = function merch() {
  return List.of(function (x) {
    return function (y) {
      return function (z) {
        return x + '-' + y + '-' + z;
      };
    };
  }).ap(List(['teeshirt', 'sweater'])).ap(List(['large', 'medium', 'small'])).ap(List(['black', 'white']));
};

var res = merch();
console.log(res);
//# sourceMappingURL=20.js.map