//Whenever you see a fold, think removal from a type,
// be it a collection which relies on a monoid or just a single value in a type.


const { Map, List } = require('immutable-ext');

// -----------------------------
// Sum monoid
const Sum = x =>
  ({
    x,
    concat: ({x: y}) => Sum(x + y),
    inspect: () => `Sum(${x})`
  })

Sum.empty = () => Sum(0)
// -----------------------------
//
// const res1 = [Sum(1),Sum(2),Sum(3)]
//   .reduce((acc, x) => acc.concat(x), Sum.empty())
//
const res2 = Map({brian: 10, sara: 2})
  .map(Sum)
  .fold(Sum.empty())

// const res33 = List.of(1,2,3)
//   .map(x => {
//     console.log('aaa', x);
//     return Sum(x)
//   })
//   .fold(Sum.empty())

// const res3 = List.of(1,2,3)
//   .foldMap(Sum, Sum.empty())
//
// const s = List.of(Sum(1), Sum(2), Sum(3))
//   .fold(Sum.empty());
//console.log(11, res33);
// console.log("result 1: ", res1.inspect());
 console.log("result 2: ", res2.inspect())
// console.log("result 3: ", res3.inspect())
console.log(Sum(1).concat(Sum(2)));


