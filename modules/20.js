//List comprehensions with Applicative Functors

//We annihilate the need for the ol' nested for loop using Applicatives.

const { List } = require('immutable-ext');

//messy imperative code transform into applicative functor
// for(x in xs) {
//   for(y in ys) {
//     for(z in zs) {
//     }
//   }
// }

const res1 = List.of(x => x).ap(List.of([1, 2, 3]));
const res2 = List.of(x => x).ap(List([1,2,3]));

//run like for in for loop
const res3 = List.of(x => y => `${x} - ${y}`).ap(List([1,2,3])).ap(List([4,5,6]));
const res4 = List.of(x => y => `${x} - ${y}`).ap(List.of([1,2,3])).ap(List.of([4,5,6]));
console.log('res1', res1);
console.log('res2', res2);
console.log('res3', res3);
console.log('res4', res4);

const merch = () =>
  List.of(x => y => z =>`${x}-${y}-${z}`)
    .ap(List(['teeshirt', 'sweater']))
    .ap(List(['large', 'medium', 'small']))
    .ap(List(['black', 'white']))

const res = merch()
console.log(res)