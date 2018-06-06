'use strict';

//Use Task for Asynchronous Actions

//We refactor a standard node callback style workflow into a composed task-based workflow.

var Task = require('data.task');
var fs = require('fs');

//OLD style with callbacks
var app = function app() {
  return fs.readFile('config.js', 'utf-8', function (err, contents) {
    if (err) throw err;

    var newContents = contents.replace(/8/g, '6');

    fs.writeFile('config1.json', newContents, function (err, _) {
      if (err) throw err;
      console.log('success');
    });
  });
};

var readFile = function readFile(filename, enc) {
  return new Task(function (rej, res) {
    return fs.readFile(filename, enc, function (err, contents) {
      return err ? rej(err) : res(contents);
    });
  });
};

var writeFIle = function writeFIle(filename, contents) {
  return new Task(function (rej, res) {
    return fs.writeFile(filename, contents, function (err, _) {
      return err ? rej(err) : res(contents);
    });
  });
};

//first way
var app2 = function app2() {
  return readFile('config.json', 'utf-8').map(function (contents) {
    return contents.replace(/8/g, '6');
  }).chain(function (contents) {
    return writeFIle('config1.json', contents);
  });
};

//let's do in clean way, library should not handle this case
//app2().fork(e => console.error(e),
//            con => console.log('success'));


//second way
var app3 = readFile('config.json', 'utf-8').map(function (contents) {
  return contents.replace(/8/g, '6');
}).chain(function (replaced) {
  return writeFIle('config1.json', replaced);
});

//let's do in clean way, library should not handle this case
app3.fork(function (e) {
  return console.error(e);
}, function (con) {
  return console.log('success');
});
//# sourceMappingURL=13.js.map