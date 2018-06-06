'use strict';

//  Apply Natural Transformations in everyday work

//We see three varied examples of where natural transformations come in handy.


var _require = require('./examples/either'),
    Right = _require.Right,
    Left = _require.Left,
    fromNullable = _require.fromNullable;

var Box = require('./examples/box');
var Task = require('data.task');

var _require2 = require('immutable-ext'),
    List = _require2.List;

var res = List(['hello', 'world']).chain(function (x) {
  return List(x.split(''));
});

console.log(res);

var first = function first(xs) {
  return fromNullable(xs[0]);
};

var largeNumbers = function largeNumbers(xs) {
  return xs.filter(function (x) {
    return x > 100;
  });
};

var larger = function larger(x) {
  return x * 2;
};

var app = function app(xs) {
  return first(largeNumbers(xs)).map(larger);
};

console.log(app([2, 400, 5, 1000]));

var fake = function fake(id) {
  return { id: id, name: 'user1', best_friend_id: id + 1 };
};

var Db = {
  find: function find(id) {
    return new Task(function (rej, res) {
      return res(id > 2 ? Right(fake(id)) : Left('not found'));
    });
  }
};

var eitherToTask = function eitherToTask(e) {
  return e.fold(Task.rejected, Task.of);
};

Db.find() // Task(Right(user))
.chain(eitherToTask).chain(function (user) {
  return Db.find(user.best_friend_id);
}).chain(eitherToTask).fork(function (e) {
  return console.error(e);
}, function (r) {
  return console.log(r);
});
//# sourceMappingURL=25.js.map