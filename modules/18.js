//Applicative Functors for multiple arguments

//Working our way backwards from solution to problem,
// we define an applicative functor,
// then use it to apply a function of multiple arguments.


const Box = x =>
  ({
    chain: f => f(x),
    ap: other => other.map(x),
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
  })

// Box(2) or value 2 will be passed to Box(x => x + 1) to get result  Box(3)
// const res = Box(x => x + 1).ap(Box(2)) //Box(3)

//const res = Box(x => y => x + y).app(Box(2)) //Box(y => 2 + y) -> Box(y => 2 + y).ap(Box(3))

//it must be in curried form
//const res = Box(x => y => x + y).app(Box(2)).app(Box(3))

//second way
//const add = x => y => x + y
//const res = Box(add).ap(Box(2)).ap(Box(3))
//if it has 'ap'(applied) method it is called applicative functor

//RULE: Functor(x).map(f) == Functor(f).ap(Functor(x))

//we worked until now with: Box(x).map(f)


const add = x => y => x + y

//fx -> functor with x, fy -> functor with y
// we could use F(f).ap(fx).ap(fy) but with don't know what is 'f' in F(f)
const liftA2 = (f, fx, fy) => fx.map(f).ap(fy)

const liftA3 = (f, fx, fy, fz) => fx.map(f).ap(fy).ap(fz)

const res1 = Box(add).ap(Box(2)).ap(Box(4))

const res2 = liftA2(add, Box(2), Box(4))

console.log("result 1: ", res1.inspect())
console.log("result 2: ", res2.inspect())