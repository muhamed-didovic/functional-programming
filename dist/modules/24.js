'use strict';

//Principled type conversions with Natural Transformations

//We learn what a natural transformation is and see the laws it
// must obey. We will see how a natural transformation must uphold
// the law of nt(x).map(f) == nt(x.map(f)).

//Natural Transformations is type conversation, it takes on functor to
// another functor

// F a -> G a // structural change

var Either = require('./examples/either');
var Right = Either.Right,
    Left = Either.Left,
    fromNullable = Either.fromNullable;

var Box = require('./examples/box');
var Task = require('data.task');

//RULE or LAW
// nt(x).map(f) == nt(x.map(f))

//convert List to array
var first = function first(xs) {
  return fromNullable(xs[0]);
};

var res1 = first([1, 2, 3]).map(function (x) {
  return x + 1;
});
var res2 = first([1, 2, 3].map(function (x) {
  return x + 1;
}));
console.log(res1, res2);

var boxToEither = function boxToEither(b) {
  return b.fold(Right);
}; // or b.fold(x => Right(x))

var res4 = boxToEither(Box(100)).map(function (x) {
  return x * 2;
});
var res5 = boxToEither(Box(100).map(function (x) {
  return x * 2;
}));
console.log(res4, res5);

var res3 = boxToEither(Box(100));
console.log('res3', res3);

//convert Either to T ask
var eitherToTask = function eitherToTask(e) {
  return e.fold(Task.rejected, Task.of);
};

eitherToTask(Right('nightingale')).fork(function (e) {
  return console.error('err', e);
}, function (r) {
  return console.log('res', r);
});

// eitherToTask(Left('errrrrr'))
// .fork(e => console.error('err', e),
//       r => console.log('res', r))
//# sourceMappingURL=24.js.map