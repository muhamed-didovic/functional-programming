"use strict";

// const Right = x =>
//   ({
//     chain: f => f(x),
//     map: f => Right(f(x)),
//     fold: (f, g) => g(x),
//     inspect: () => `Right(${x})`
//   })
//
// const Left = x =>
//   ({
//     //chain is used when there is Either inside of map method
//     chain: f => Left(x), // .chain expects you to run a function and return another one
//     map: f => Left(x),
//     fold: (f, g) => f(x), // .fold is going to capture the idea of removing a value from its context -- taking it out of the box, whether it's a right or a left or a box itself.
//     inspect: () => `Left(${x})`
//   })

var Right = function Right(x) {
  return {
    chain: function chain(f) {
      return f(x);
    },
    ap: function ap(other) {
      return other.map(x);
    },
    traverse: function traverse(of, f) {
      return f(x).map(Right);
    },
    map: function map(f) {
      return Right(f(x));
    },
    fold: function fold(f, g) {
      return g(x);
    },
    inspect: function inspect() {
      return "Right(" + x + ")";
    }
  };
};

var Left = function Left(x) {
  return {
    chain: function chain(f) {
      return Left(x);
    },
    ap: function ap(other) {
      return Left(x);
    },
    traverse: function traverse(of, f) {
      return of(Left(x));
    },
    map: function map(f) {
      return Left(x);
    },
    fold: function fold(f, g) {
      return f(x);
    },
    inspect: function inspect() {
      return "Left(" + x + ")";
    }
  };
};

var fromNullable = function fromNullable(x) {
  return x != null ? Right(x) : Left(null);
};

var tryCatch = function tryCatch(f) {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

module.exports = {
  Right: Right,
  Left: Left,
  fromNullable: fromNullable,
  tryCatch: tryCatch
};
//# sourceMappingURL=either.js.map