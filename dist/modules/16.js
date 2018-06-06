'use strict';

//MONADS(has 'of' and 'chain' method)

//We discover, we've been using monads! We look a little further into the chain method and see
// laws that ensure the monadic structure works correctly.

var Box = require('./examples/box');

//Box, Either, Task, List
// F.of, chain (flatMap, bind, >>=)

// httpGet('/user')
//   .chain(user =>
//     httpGet(`/comments/${user.id}`)
//       .chain(comments =>
//         updateDOM(user, comments))) // Task(Task(Task(DOM)))


var join = function join(m) {
  return m.chain(function (x) {
    return x;
  });
}; // Box(Box(x)) it would return -> Box(x)

//1. rule: join(m.map(join) == join(join(m)) //law of associativity

// const m = Box(Box(Box(3)))
// const res1 = join(m.map(join))
// const res2 = join(join(m))

//2. rule: join(Box.of(m)) == join(m.map(Box.of))
var m = Box('wonder');
var res1 = join(Box.of(m));
var res2 = join(m.map(Box.of));

console.log(res1, res2);

//map is definably by chain
// m.chain(x => f(x))
// m.chain(x => Box.of(f(x)))

//monad -> implicitiv functor, applicitive functor
//# sourceMappingURL=16.js.map