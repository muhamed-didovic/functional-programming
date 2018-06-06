//Principled type conversions with Natural Transformations

//We learn what a natural transformation is and see the laws it
// must obey. We will see how a natural transformation must uphold
// the law of nt(x).map(f) == nt(x.map(f)).

//Natural Transformations is type conversation, it takes on functor to
// another functor

// F a -> G a // structural change

const Either = require('./examples/either')
const { Right, Left, fromNullable } = Either
const Box = require('./examples/box')
const Task = require('data.task')

//RULE or LAW
// nt(x).map(f) == nt(x.map(f))

//convert List to array
const first = xs =>
  fromNullable(xs[0])

const res1 = first([1,2,3]).map(x => x + 1)
const res2 = first([1,2,3].map(x => x + 1))
console.log(res1, res2)

const boxToEither = b =>
  b.fold(Right) // or b.fold(x => Right(x))

const res4 = boxToEither(Box(100)).map(x => x * 2)
const res5 = boxToEither(Box(100).map(x => x * 2))
console.log(res4, res5)


const res3 = boxToEither(Box(100));
console.log('res3', res3);

//convert Either to T ask
const eitherToTask = e =>
  e.fold(Task.rejected, Task.of)

eitherToTask(Right('nightingale'))
.fork(e => console.error('err', e),
      r => console.log('res', r))

// eitherToTask(Left('errrrrr'))
// .fork(e => console.error('err', e),
//       r => console.log('res', r))