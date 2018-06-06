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

const Right = x =>
  ({
    chain: f => f(x),
    ap: other => other.map(x),
    traverse: (of, f) => f(x).map(Right),
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inspect: () => `Right(${x})`
  })

const Left = x =>
  ({
    chain: f => Left(x),
    ap: other => Left(x),
    traverse: (of, f) => of(Left(x)),
    map: f => Left(x),
    fold: (f, g) => f(x),
    inspect: () => `Left(${x})`
  })

const fromNullable = x => x != null ? Right(x) : Left(null)

const tryCatch = f => {
  try {
    return Right(f())
  } catch(e) {
    return Left(e)
  }
}


module.exports = {
  Right,
  Left,
  fromNullable,
  tryCatch
}
