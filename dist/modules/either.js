'use strict';

var Either = require('data.either');
var Maybe = require('data.maybe');
var _ = require('lodash');

var messages = {
  'welcome': 'Hello FP!'
};
var lookUp = function lookUp(obj, key) {
  var str = obj[key];
  if (str) {
    return Either.fromNullable(str);
  }
  return Either.Left('String not found!');
};

// valid
var r1 = lookUp(messages, 'welcome').map(_.words); // Right(['Hello', 'FP!'])
// invalid
var r2 = lookUp(messages, 'badKey').map(_.words); // Left('String not found!');
// console.log(11, r1.value);
// console.log(22, r2.value);

// Curried adder
function add(a) {
  return function (b) {
    return a + b;
  };
}
// Mapping a valid object over a Maybe
var user = { name: 'Haskell Curry', age: 14 };
var result = Maybe.fromNullable(user).map(_.property('age')).map(add(1));

console.log('Result: ' + result.toString());

// Mapping null over a Maybe
var result = Maybe.fromNullable(null).map(_.property('age')).map(add(1));

console.log('Result: ' + result.toString());

/*
 TODO: Produce the same program, using an Either.Right for the positive case, and a Either.Left for the negative case
 The outputs should be:

 Either.Right(15)
 Either.Left(null)
 */

var s = Either.Right(user).map(_.property('age')).map(add(1));
console.log(11, s);

var ss = Either.Left(null).map(_.property('age')).map(add(1));
console.log(222, ss);
//# sourceMappingURL=either.js.map