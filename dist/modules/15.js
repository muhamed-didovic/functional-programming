'use strict';

// Lift into a Pointed Functor with of

//We examine the of function we've seen on a few types and discover it's the Pointed interface.

//if puts or lifts our value into type
var Box = require('./examples/box');
var Either = require('./examples/either');
var Task = require('data.task');

Task.of('hello'); // Task('hello')
//Either.of('hello') // Right('hello')
Box.of(100); // Box(100)

console.log(Task.of('hello'));

Either.of('hello').map(function (x) {
  return x + '!';
});
//# sourceMappingURL=15.js.map