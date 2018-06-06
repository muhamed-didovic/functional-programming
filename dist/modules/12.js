//Capture Side Effects in a Task

//We examine the data structure Task, see some constructors, familiar methods,
// and finally how it captures side effects through laziness.


// here is interesting that capture side effects


"use strict";

var Task = require('data.task');

var launchMissiles = function launchMissiles() {
  return new Task(function (rej, res) {
    console.log('launch missiles!');
    res('missile');
  });
};

var app = launchMissiles().map(function (x) {
  return x + '!';
});

app.map(function (x) {
  return x + '!';
}).fork(function (e) {
  return console.error('err', e);
}, function (x) {
  return console.log('success', x);
});
//# sourceMappingURL=12.js.map