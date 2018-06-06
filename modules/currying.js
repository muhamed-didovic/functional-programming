const _ = require('lodash');

var name = _.curry(function(last, first) {
  console.log('aaa', [last, first].join(','));
  return [last, first].join(',');
});
// When supplied both arguments, it evaluates the function immediately
//console.log(name('Curry')('Haskell')); //-> 'Curry, Haskell'
//console.log(name('111')('222'));
// When supplied one argument, it returns another function
//console.log(name('Curry')); //-> Function


const add = _.curry(function() {
  //return last + first;
  console.log('aaaa', arguments);
  return [arguments].reduce((acc, x) => acc + x, 0)
});

console.log('11', add(2)(3));