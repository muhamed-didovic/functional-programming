//Leapfrogging types with Traversable

//We use the traversable instance on List to reimplement Promise.all() type functionality.


const fs = require('fs')
const Task = require('data.task')
const futurize = require('futurize').futurize(Task)
const { List } = require('immutable-ext')

const readFile = futurize(fs.readFile)

//1 way
const files1 = ['./examples/box.js', 'config.json'];
const f = files1.map(fileName => readFile(fileName, 'ytf-8'));
console.log('ffff', f);
//we have this [Task] but we want this Tak([])
// it means array of Tasks should be task of array of results
// turn these types inside out, leapfrog types
// so that arrays are inside, when we want this we call traverse
// this leads to second way below


//2 way
const files = List(['./examples/box.js', 'config.json'])

//here we add Task.of(type up) as first argument,
// we are not in typed setting, it can't figure out what outer type should be
// in case of failure
//traverse returns Task
//in end we have List(Task) of results
files.traverse(Task.of, fn => readFile(fn, 'utf-8'))
  .fork(console.error, console.log)

// streams don't have traverse method
// traverse expects return applicative functor from a function
// so Task is applicative functor
