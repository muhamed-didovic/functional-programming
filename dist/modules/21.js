'use strict';

// Write applicatives for concurrent actions

//We start with two sequential finds using monads,
// then rewrite our code to achieve two concurrent finds.

//import Task from 'data.task';
var Task = require('data.task');

var Db = {
  find: function find(id) {
    return new Task(function (rej, res) {
      return setTimeout(function () {
        return res({ id: id, title: 'Project ' + id });
      }, 100);
    });
  }
};

var reportHeader = function reportHeader(p1, p2) {
  return 'Report: ' + p1.title + ' compared to ' + p2.title;
};

//here p2 depends on p1
// Db.find(20).chain(p1 =>
//  Db.find(8).map(p2 =>
//   reportHeader(p1, p2)))

//applicatives used to run parallel p1 and p2
Task.of(function (p1) {
  return function (p2) {
    return reportHeader(p1, p2);
  };
}).ap(Db.find(20)).ap(Db.find(8)).fork(console.error, console.log);

//second approach
var reportHeader1 = function reportHeader1(p1) {
  return function (p2) {
    return 'Report: ' + p1.title + ' compared to ' + p2.title;
  };
};

Task.of(reportHeader1).ap(Db.find(20)).ap(Db.find(8)).fork(console.error, console.log);
//# sourceMappingURL=21.js.map