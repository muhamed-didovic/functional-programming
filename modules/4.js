/*
Use chain for composable error handling with nested Eithers

We refactor a function that uses try/catch to a single composed expression using Either.
We then introduce the chain function to deal with nested Eithers resulting from two try/catch calls.
*/

// SETUP: fake fs
//==========
const fs = {
  readFileSync: name => {
    if(name === 'config.json') {
      return JSON.stringify({port: 8888})
    } else {
      throw('missing file!')
    }
  }
}

const Right = x =>
  ({
    chain: f => f(x),
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inspect: () => `Right(${x})`
  })

const Left = x =>
  ({
    //chain is used when there is Either inside of map method
    chain: f => Left(x), // .chain expects you to run a function and return another one
    map: f => Left(x),
    fold: (f, g) => f(x), // .fold is going to capture the idea of removing a value from its context -- taking it out of the box, whether it's a right or a left or a box itself.
    inspect: () => `Left(${x})`
  })

const fromNullable = x =>
  x != null ? Right(x) : Left(null)

const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e)
  }
}

const getPort = () =>
  tryCatch(() => fs.readFileSync('config.json'))
    .chain(c => tryCatch(() => JSON.parse(c)))
    .fold(e => 3000, c => c.port)

const result = getPort()

console.log(result)
