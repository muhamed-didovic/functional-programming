//FUNCTORS
const Box = require('./examples/box')
const Task = require('data.task')
const Either = require('./examples/either')
const {Right, Left, fromNullable} = Either
const { List, Map } = require('immutable-ext')

//FUNCTOR is any type with map method with few laws:
//1. f(x).map(f).map(g) == f(x).map(x => g(f(x))) //this laws preserves function composition while map
//2. f(x).map(id) == id(f(x)) //

const r1 = Box('squirrels')
  .map(s => s.substr(5))
  .map(s => s.toUpperCase());

const r2 = Box('squirrels')
  .map(s => s.substr(5).toUpperCase());

// 'squirrels'.substr(5).toUpperCase() //function composition

//--------------------------------
const res1 = Left('squirrels') // Right('squirrels')
  .map(s => s.substr(5))
  .map(s => s.toUpperCase());

const res2 = Left('squirrels') // Right('squirrels')
  .map(s => s.substr(5).toUpperCase());

//----------------------------
const id = x => x;

const res3 = List.of('crayons').map(id); //Right, Box, Left
const res4 = id(List.of('crayons')); //Right, Box, Left

console.log(r1, r2)
console.log(res1, res2)
console.log(res3, res4)