'use strict';

// Enforce a null check with composable code branching using Either

var Right = function Right(x) {
  return {
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
  return x != null ? Right(x) : Left(null);
};

var findColor = function findColor(name) {
  return fromNullable({ red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' }[name]);
};

var res = findColor('blue').map(function (c) {
  return c.slice(1);
}).map(function (c) {
  return c.toUpperCase();
}).fold(function (e) {
  return 'no color';
}, function (x) {
  return x;
});

console.log(res);
//# sourceMappingURL=3.js.map