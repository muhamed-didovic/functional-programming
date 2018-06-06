//Ensure failsafe combination using monoids
//In this video we define monoids and promote our semigroups

//monoin is neutral entity that doesn't change semigroup

//1 + 0 = 1
//2 + 0 = 2
//x + 0 = x
//here 0 is monoid

//A semigroup, it does not have an element to return so it's not a safe operation, whereas with the monoids
// we could take as many as we possibly want, even none, and still return us back something.
// It's a perfectly safe operation here that we can reduce as many of them as we'd like.


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

Sum.empty = () => Sum(0)

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

All.empty = () => All(true)
//true && true -> false
//false && true -> false


//true || false -> true
//false || false -> false


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

// const res = First("blah").concat(First("ice cream")).concat(First('meta programming'))


const sum = xs =>
  xs.reduce((acc, x) => acc + x, 0)

const all = xs =>
  xs.reduce((acc, x) => acc && x, true)

const first = xs =>
  xs.reduce((acc, x) => acc)

console.log(first([1,2,3]))

