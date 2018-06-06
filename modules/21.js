// Write applicatives for concurrent actions

//We start with two sequential finds using monads,
// then rewrite our code to achieve two concurrent finds.

//import Task from 'data.task';
let Task = require('data.task');

const Db = ({
  find: id =>
    new Task((rej, res) =>
      setTimeout(() =>
        res({id: id, title: `Project ${id}`}), 100))
})

const reportHeader = (p1, p2) =>
  `Report: ${p1.title} compared to ${p2.title}`

//here p2 depends on p1
// Db.find(20).chain(p1 =>
//  Db.find(8).map(p2 =>
//   reportHeader(p1, p2)))

//applicatives used to run parallel p1 and p2
Task.of(p1 => p2 => reportHeader(p1, p2))
  .ap(Db.find(20))
  .ap(Db.find(8))
  .fork(console.error, console.log)


//second approach
const reportHeader1 = p1 => p2 => `Report: ${p1.title} compared to ${p2.title}`

Task.of(reportHeader1)
  .ap(Db.find(20))
  .ap(Db.find(8))
  .fork(console.error, console.log)