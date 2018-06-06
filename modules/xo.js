const Box = require('./examples/box')
const Either = require('./examples/either')
const Task = require('data.task')


const xo = input =>
  Task.of(input)
    .map(str => {
      console.log('str', str);
      return str.replace(/[^o]/ig, "").length === str.replace(/[^x]/ig, "").length
    })




//
// xo('xXxoOO').fork(console.error, console.log);
// xo('xxx').fork(console.error, console.log);
// xo('ooxx').fork(console.error, console.log);
xo('aaaa').fork(console.error, console.log);
xo('').fork(console.error, console.log);