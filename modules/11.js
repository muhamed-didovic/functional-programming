// Delay Evaluation with LazyBox

//We want to convert our value that's right there, our concrete value,
// to a function that will eventually return our value.
//Sometimes this is referred to as a Church encoding


const LazyBox = g =>
  ({
    fold: f => f(g()),
    map: f => LazyBox(() => f(g()))
  })

const result = LazyBox(() => '  64 ')
  .map(abba => abba.trim())
  .map(trimmed => new Number(trimmed))
  .map(number => number + 1)
  .map(x => String.fromCharCode(x))
  .fold(x => x.toLowerCase())

console.log(result)
