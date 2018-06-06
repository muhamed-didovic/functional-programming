'use strict';

//curried functions, split arguments into functions and use 'data' argument last

//1st intration:
var add1 = function add1(x, y) {
  return x + 1;
};
var inc1 = function inc1(y) {
  return add1(1, y);
};
console.log('first iteration', inc1(2));

// better technique
//const add = x => (y => x + 1)
var add = function add(x) {
  return function (y) {
    return x + 1;
  };
}; // (y => 1 + y)
var inc = add(1);

//bad way
//const modulo = (dvr, dvd) => dvd % dvr
//const isOdd = dvd => modulo(2, dvd)

//better way
var modulo = function modulo(dvr) {
  return function (dvd) {
    return dvd % dvr;
  };
};
var isOdd = modulo(2);

//we give data last
var replace = function replace(regex) {
  return function (repl) {
    return function (str) {
      return str.replace(regex, repl);
    };
  };
};

//first we give method and data is the last, so always give your data last
var filter = function filter(pred) {
  return function (xs) {
    return xs.filter(pred);
  };
};
var map = function map(f) {
  return function (xs) {
    return xs.map(f);
  };
};

var censor = replace(/[aeiou]/ig)('*');

var censorAll = map(censor);

var getAllOdds = filter(isOdd);

console.log("censorAll: ", censorAll(['hello', 'world']));
console.log("getAllOdds: ", getAllOdds([1, 2, 3, 4]));
//# sourceMappingURL=17.js.map