//Apply multiple functors as arguments to a function (Applicatives)

//We find a couple of DOM nodes that may or may not exist and
// run a calculation on the page height using applicatives.


// Definition for Either(Right and Left)
// -------------------------------------
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

const fromNullable = x => x !== null ? Right(x) : Left(null)

const tryCatch = f => {
  try {
    return Right(f())
  } catch(e) {
    return Left(e)
  }
}

const Either = {
  of:  Right,
  tryCatch,
  fromNullable
}
// -------------------------------------

// Lesson code
const liftA2 = (f, fx, fy) => fx.map(f).ap(fy)

const $ = selector => Either.of({selector, height: 10})

//old way
//const getScreenSize1 = (screen, head, foot) => screen - (head.height + foot.height)

//1st way:
// $('header').map(head =>
//   $('footer').map(footer => ...))

//2nd way: still not good because it is sequential
// $('header').chain(head =>
//   $('footer').map(footer =>
//     getScreenSize1(800, head, footer)))

//3rd way: use applicative, we use getScreenSize1 from above
//const res = Either.if(header => footer =>  getScreenSize1(800, head, footer))

//4th way, curried:
const getScreenSize = screen => head => foot =>
screen - (head.height + foot.height)
//const res = Eihter.of(getScreenSize(800))
//              .ap($('header))
//              .ap($('footer'))

//5th waf wift liftA2:
const res = liftA2(getScreenSize(800), $('header'), $('footer'))

console.log(res.inspect())
