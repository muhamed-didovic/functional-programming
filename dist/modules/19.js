'use strict';

//Apply multiple functors as arguments to a function (Applicatives)

//We find a couple of DOM nodes that may or may not exist and
// run a calculation on the page height using applicatives.


// Definition for Either(Right and Left)
// -------------------------------------
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
      return 'Right(' + x + ')';
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
      return 'Left(' + x + ')';
    }
  };
};

var fromNullable = function fromNullable(x) {
  return x !== null ? Right(x) : Left(null);
};

var tryCatch = function tryCatch(f) {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

var Either = {
  of: Right,
  tryCatch: tryCatch,
  fromNullable: fromNullable
};
// -------------------------------------

// Lesson code
var liftA2 = function liftA2(f, fx, fy) {
  return fx.map(f).ap(fy);
};

var $ = function $(selector) {
  return Either.of({ selector: selector, height: 10 });
};

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
var getScreenSize = function getScreenSize(screen) {
  return function (head) {
    return function (foot) {
      return screen - (head.height + foot.height);
    };
  };
};
//const res = Eihter.of(getScreenSize(800))
//              .ap($('header))
//              .ap($('footer'))

//5th waf wift liftA2:
var res = liftA2(getScreenSize(800), $('header'), $('footer'));

console.log(res.inspect());
//# sourceMappingURL=19.js.map