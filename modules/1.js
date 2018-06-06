// Code goes here

const Box = x =>
  ({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
  })

const nextCharForNumberString = str =>
  Box(str)
    .map(s => s.trim())
    .map(r => parseInt(r))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .fold(c => c.toLowerCase());

const result = nextCharForNumberString('  64  ')

console.log(11, result)

const test= s => {
  return Box(s)
    .map(s => s.trim())
    .map(n => new Number(n))
    .map(i => ++i)
    .map(i => String.fromCharCode(i))
    .fold(c => c)
};

console.log(22, test('    65   '));