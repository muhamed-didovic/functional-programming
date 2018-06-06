"use strict";

/*
Create types with Semigroups

An introduction to concatting items via the formal Semi-group interface.
Semi-groups are simply a type with a concat method that are associative.
We define three semigroup instances and see them in action.

A semigroup is a type with a concat method.
 We say that's closed under concatenation here. It does not change types.


 A type with a concat method that is associative.
*/

// In general, the motivation to use semigroups is 4 fold (no pun intended)
// 1. One has instant intuition that we're doing some kind of combination.
// 2. There are many properties that hold like identity, associativity, and other group theory stuff.
// 3. Semigroups beget semigroups... they will combine all the subparts (I show an example in the last real world vid)
// 4. Since they are associative, they can be parallelized by default.

var Sum = function Sum(x) {
  return {
    x: x,
    concat: function concat(_ref) {
      var y = _ref.x;
      return Sum(x + y);
    },
    inspect: function inspect() {
      return "Sum(" + x + ")";
    },
    toString: function toString() {
      return "Sum(" + x + ")";
    }
  };
};
//associative (1+1) + 1 === 1 + (1+1)
//const res = Sum(1).concat(Sum(2))

var All = function All(x) {
  return {
    x: x,
    concat: function concat(_ref2) {
      var y = _ref2.x;
      return All(x && y);
    },
    inspect: function inspect() {
      return "All(" + x + ")";
    },
    toString: function toString() {
      return "All(" + x + ")";
    }
  };
};

//const res = All(false).concat(All(true))

var First = function First(x) {
  return {
    x: x,
    concat: function concat(_) {
      return First(x);
    },
    inspect: function inspect() {
      return "First(" + x + ")";
    },
    toString: function toString() {
      return "First(" + x + ")";
    }
  };
};

var res = First("blah").concat(First("ice cream")).concat(First('meta programming'));
console.log(res);

/////////////////////////////////////////////////////////////////

//Here's a "practical" example. The First here always holds an Either.

var First1 = function First1(x) {
  return {
    fold: function fold(f) {
      return x.fold(f, f);
    },
    concat: function concat(o) {
      return x.isLeft ? o : First(x);
    }
  };
};

var find = function find(xs, f) {
  return List(xs).foldMap(function (x) {
    return First1(f(x) ? Right(x) : Left());
  }, First1.empty).fold(function (x) {
    return x;
  });
};
//# sourceMappingURL=6.js.map