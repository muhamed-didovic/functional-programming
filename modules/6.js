/*
Create types with Semigroups

An introduction to concatting items via the formal Semi-group interface.
Semi-groups are simply a type with a concat method that are associative.
We define three semigroup instances and see them in action.

A semigroup is a type with a concat method.
 We say that's closed under concatenation here. It does not change types.


 A type with a concat method that is associative.
*/

// In general, the motivation to use semigroups is 4 fold (no pun intended)
// 1. One has instant intuition that we're doing some kind of combination.
// 2. There are many properties that hold like identity, associativity, and other group theory stuff.
// 3. Semigroups beget semigroups... they will combine all the subparts (I show an example in the last real world vid)
// 4. Since they are associative, they can be parallelized by default.

const Sum = x =>
  ({
    x,
    concat: ({x: y}) =>
      Sum(x + y),
    inspect: () =>
      `Sum(${x})`,
    toString: () =>
      `Sum(${x})`
  })
//associative (1+1) + 1 === 1 + (1+1)
//const res = Sum(1).concat(Sum(2))

const All = x =>
  ({
    x,
    concat: ({x: y}) =>
      All(x && y),
    inspect: () =>
      `All(${x})`,
    toString: () =>
      `All(${x})`
  })

//const res = All(false).concat(All(true))

const First = x =>
  ({
    x,
    concat: _ =>
      First(x),
    inspect: () =>
      `First(${x})`,
    toString: () =>
      `First(${x})`
  })

const res = First("blah").concat(First("ice cream")).concat(First('meta programming'))
console.log(res)


/////////////////////////////////////////////////////////////////

//Here's a "practical" example. The First here always holds an Either.

const First1 = x =>
  ({
    fold: f => x.fold(f, f),
    concat: o => x.isLeft ? o : First(x)
  })


const find = (xs, f) =>
  List(xs)
    .foldMap(x => First1(f(x) ? Right(x) : Left()), First1.empty)
    .fold(x =>x)
