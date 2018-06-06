'use strict';

//Leapfrogging types with Traversable

//We use the traversable instance on List to reimplement Promise.all() type functionality.


var fs = require('fs');
var Task = require('data.task');
var futurize = require('futurize').futurize(Task);

var _require = require('immutable-ext'),
    List = _require.List;

var readFile = futurize(fs.readFile);

//1 way
var files1 = ['./examples/box.js', 'config.json'];
var f = files1.map(function (fileName) {
  return readFile(fileName, 'ytf-8');
});
console.log('ffff', f);
//we have this [Task] but we want this Tak([])
// it means array of Tasks should be task of array of results
// turn these types inside out, leapfrog types
// so that arrays are inside, when we want this we call traverse
// this leads to second way below


//2 way
var files = List(['./examples/box.js', 'config.json']);

//here we add Task.of(type up) as first argument,
// we are not in typed setting, it can't figure out what outer type should be
// in case of failure
//traverse returns Task
//in end we have List(Task) of results
files.traverse(Task.of, function (fn) {
  return readFile(fn, 'utf-8');
}).fork(console.error, console.log);

// streams don't have traverse method
// traverse expects return applicative functor from a function
// so Task is applicative functor
//# sourceMappingURL=22.js.map