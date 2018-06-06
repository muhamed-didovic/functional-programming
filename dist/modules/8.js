"use strict";

//Ensure failsafe combination using monoids
//In this video we define monoids and promote our semigroups

//monoin is neutral entity that doesn't change semigroup

//1 + 0 = 1
//2 + 0 = 2
//x + 0 = x
//here 0 is monoid

//A semigroup, it does not have an element to return so it's not a safe operation, whereas with the monoids
// we could take as many as we possibly want, even none, and still return us back something.
// It's a perfectly safe operation here that we can reduce as many of them as we'd like.


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

Sum.empty = function () {
  return Sum(0);
};

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

All.empty = function () {
  return All(true);
};
//true && true -> false
//false && true -> false


//true || false -> true
//false || false -> false


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

// const res = First("blah").concat(First("ice cream")).concat(First('meta programming'))


var sum = function sum(xs) {
  return xs.reduce(function (acc, x) {
    return acc + x;
  }, 0);
};

var all = function all(xs) {
  return xs.reduce(function (acc, x) {
    return acc && x;
  }, true);
};

var first = function first(xs) {
  return xs.reduce(function (acc, x) {
    return acc;
  });
};

console.log(first([1, 2, 3]));
//# sourceMappingURL=8.js.map