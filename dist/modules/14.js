'use strict';

//FUNCTORS
var Box = require('./examples/box');
var Task = require('data.task');
var Either = require('./examples/either');
var Right = Either.Right,
    Left = Either.Left,
    fromNullable = Either.fromNullable;

var _require = require('immutable-ext'),
    List = _require.List,
    Map = _require.Map;

//FUNCTOR is any type with map method with few laws:
//1. f(x).map(f).map(g) == f(x).map(x => g(f(x))) //this laws preserves function composition while map
//2. f(x).map(id) == id(f(x)) //

var r1 = Box('squirrels').map(function (s) {
  return s.substr(5);
}).map(function (s) {
  return s.toUpperCase();
});

var r2 = Box('squirrels').map(function (s) {
  return s.substr(5).toUpperCase();
});

// 'squirrels'.substr(5).toUpperCase() //function composition

//--------------------------------
var res1 = Left('squirrels') // Right('squirrels')
.map(function (s) {
  return s.substr(5);
}).map(function (s) {
  return s.toUpperCase();
});

var res2 = Left('squirrels') // Right('squirrels')
.map(function (s) {
  return s.substr(5).toUpperCase();
});

//----------------------------
var id = function id(x) {
  return x;
};

var res3 = List.of('crayons').map(id); //Right, Box, Left
var res4 = id(List.of('crayons')); //Right, Box, Left

console.log(r1, r2);
console.log(res1, res2);
console.log(res3, res4);
//# sourceMappingURL=14.js.map