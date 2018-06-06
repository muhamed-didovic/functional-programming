//Maintaining structure whilst asyncing

//We take our Promise.all() analogy further by using traversable on a Map().
// Then we use two traversals in the same workflow.

const Task = require('data.task')
const { List, Map } = require('immutable-ext')

const httpGet = (path, params) =>
  Task.of(`${path} result`)

//result: Map({home: Task('/ result')})
//what we really want is Task to be outside like this
//Task(Map({home: '/result'})), in order to do that see 2 way
Map({home: '/', about: '/about-us', blog: '/blog'})
  .map( route => {
    console.log('222', httpGet(route, {}));
    return httpGet(route, {})
  })
  //.fold(console.error, console.log)

console.log('1');

//2 way
Map({home: '/', about: '/about-us', blog: '/blog'})
  .traverse(Task.of, route => httpGet(route, {}))
  .fork(console.error, console.log)
console.log(2);

//3 way, Tasks is outer
Map({home: ['/', '/home'], about: ['/about-us']})
  .traverse(Task.of, routes =>
    List(routes)
      .traverse(Task.of, route => httpGet(route, {})))
  .fork(console.error, console.log);
console.log(3);  