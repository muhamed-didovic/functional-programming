'use strict';

var _require = require('immutable-ext'),
    List = _require.List,
    Map = _require.Map; //Immutable;

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

var All = function All(x) {
  return {
    x: x,
    concat: function concat(_ref2) {
      var y = _ref2.x;
      return All(x && y);
    },
    inspect: function inspect() {
      return 'All(' + x + ')';
    }
  };
};

var First = function First(x) {
  return {
    x: x,
    concat: function concat(_) {
      return First(x);
    },
    inspect: function inspect() {
      return 'First(' + x + ')';
    }
  };
};

var acct1 = Map({ name: First('Nico'), isPaid: All(true), points: Sum(10), friends: ['Franklin'] });

var acct2 = Map({ name: First('Nico'), isPaid: All(false), points: Sum(2), friends: ['Gatsby'] });

var res = acct1.concat(acct2);

// Showing results
console.log("Friend 1: ", res.toJS().friends[0]);
console.log("Friend 2: ", res.toJS().friends[1]);
console.log("isPaid: ", res.toJS().isPaid, res.toJS().isPaid.x);
console.log("Name: ", res.toJS().name, res.toJS().name.x);
console.log("Points: ", res.toJS().points.x);
console.log(res);
//# sourceMappingURL=7.js.map