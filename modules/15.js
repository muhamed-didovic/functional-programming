// Lift into a Pointed Functor with of

//We examine the of function we've seen on a few types and discover it's the Pointed interface.

//if puts or lifts our value into type
const Box = require('./examples/box')
const Either = require('./examples/either')
const Task = require('data.task')

Task.of('hello') // Task('hello')
//Either.of('hello') // Right('hello')
Box.of(100) // Box(100)

console.log(Task.of('hello'));

Either.of('hello').map(x => x + '!')