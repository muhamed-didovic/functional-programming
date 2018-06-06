//Capture Side Effects in a Task

//We examine the data structure Task, see some constructors, familiar methods,
// and finally how it captures side effects through laziness.


// here is interesting that capture side effects


"use strict";

var Task = require('data.task');


const launchMissiles = () =>
  new Task((rej, res) => {
    console.log('launch missiles!')
    res('missile')
  })

const app = launchMissiles().map(x => x + '!')

app
  .map(x => x + '!')
  .fork(e => console.error('err', e),
    x => console.log('success', x))