//curried functions, split arguments into functions and use 'data' argument last

//1st intration:
const add1 = (x, y) => x + 1
const inc1 = y  => add1(1, y)
console.log('first iteration', inc1(2));


// better technique
//const add = x => (y => x + 1)
const add = x => y => x + 1 // (y => 1 + y)
const inc = add(1)

//bad way
//const modulo = (dvr, dvd) => dvd % dvr
//const isOdd = dvd => modulo(2, dvd)

//better way
const modulo = dvr => dvd => dvd % dvr
const isOdd = modulo(2)

//we give data last
const replace = regex => repl => str =>
  str.replace(regex, repl)

//first we give method and data is the last, so always give your data last
const filter = pred => xs => xs.filter(pred)
const map = f => xs => xs.map(f)

const censor = replace(/[aeiou]/ig)('*')

const censorAll = map(censor)

const getAllOdds = filter(isOdd)

console.log("censorAll: ", censorAll(['hello', 'world']))
console.log("getAllOdds: ", getAllOdds([1,2,3,4]))
