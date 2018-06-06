'use strict';

//A curated collection of Monoids and their uses


var _require = require('data.either'),
    Right = _require.Right,
    Left = _require.Left;

var _require2 = require('immutable-ext'),
    List = _require2.List;

var fromNullable = function fromNullable(x) {
  return x != null ? Right(x) : Left(null);
};

var Sum = function Sum(x) {
  return {
    x: x,
    concat: function concat(_ref) {
      var y = _ref.x;
      return Sum(x + y);
    },
    inspect: function inspect() {
      return 'Sum(' + x + ')';
    }
  };
};

Sum.empty = function () {
  return Sum(0);
};

var Product = function Product(x) {
  return {
    x: x,
    concat: function concat(_ref2) {
      var y = _ref2.x;
      return Product(x * y);
    },
    inspect: function inspect() {
      return 'Product(' + x + ')';
    }
  };
};

Product.empty = function () {
  return Product(1);
};

var Any = function Any(x) {
  return {
    x: x,
    concat: function concat(_ref3) {
      var y = _ref3.x;
      return Any(x || y);
    },
    inspect: function inspect() {
      return 'Any(' + x + ')';
    }
  };
};

Any.empty = function () {
  return Any(false);
};

var All = function All(x) {
  return {
    x: x,
    concat: function concat(_ref4) {
      var y = _ref4.x;
      return All(x && y);
    },
    inspect: function inspect() {
      return 'All(' + x + ')';
    }
  };
};

All.empty = function () {
  return All(true);
};

var Max = function Max(x) {
  return {
    x: x,
    concat: function concat(_ref5) {
      var y = _ref5.x;
      return Max(x > y ? x : y);
    },
    inspect: function inspect() {
      return 'Max(' + x + ')';
    }
  };
};

Max.empty = function () {
  return Max(-Infinity);
};

var Min = function Min(x) {
  return {
    x: x,
    concat: function concat(_ref6) {
      var y = _ref6.x;
      return Min(x < y ? x : y);
    },
    inspect: function inspect() {
      return 'Min(' + x + ')';
    }
  };
};

Min.empty = function () {
  return Min(Infinity);
};

var Pair = function Pair(x, y) {
  return {
    x: x,
    y: y,
    concat: function concat(_ref7) {
      var x1 = _ref7.x,
          y1 = _ref7.y;
      return Pair(x.concat(x1), y.concat(y1));
    },
    inspect: function inspect() {
      return 'Pair(' + x + ', ' + y + ')';
    }
  };
};

// monoid that keeps the first Right
var First = function First(x) {
  return {
    fold: function fold(f) {
      return f(x);
    },
    concat: function concat(o) {
      return x.isLeft ? o : First(x);
    }
  };
};

First.empty = First(Left());

var find = function find(xs, f) {
  return List(xs).foldMap(function (x) {
    return First(f(x) ? Right(x) : Left());
  }, First.empty).fold(function (x) {
    return x;
  });
};

find([3, 4, 5, 6, 7], function (x) {
  return x > 4;
});
// Right(5)


var stats = List.of({ page: 'Home', views: 40 }, { page: 'About', views: 10 }, { page: 'Blog', views: null });

stats.foldMap(function (x) {
  return fromNullable(x.views).map(Sum);
}, Right(Sum(0)));
// Right(Sum(54))
console.log(111, stats);

var Fn = function Fn(f) {
  return {
    fold: f,
    concat: function concat(o) {
      return Fn(function (x) {
        return f(x).concat(o.fold(x));
      });
    }
  };
};

var hasVowels = function hasVowels(x) {
  return !!x.match(/[aeiou]/ig);
};
var longWord = function longWord(x) {
  return x.length >= 5;
};

var both = Fn(compose(All, hasVowels)).concat(Fn(compose(All, longWord)))[('gym', 'bird', 'lilac')].filter(function (x) {
  return both.fold(x).x;
});
// [lilac]
//# sourceMappingURL=9.js.map