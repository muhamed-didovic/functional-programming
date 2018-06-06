var Maybe = require('data.maybe');
var _ = require('lodash');

//const addi = _.curry((x, y) =>  x + y );
//const add = addi(1);

// Curried adder
function add(a) {
  return function (b) {
    return a + b;
  }
}

var user = {name: 'Haskell Curry', age: 14};
var s = Maybe.fromNullable(user)
  .map(_.property('age'))
  .map(x => add(1)(x)); //-> Maybe(15)
console.log('ss', s.value);

var r = Maybe.fromNullable(null)
  .map(_.property('age'))
  .map(add(1)); //-> Nothing()
console.log('rr', r);
  