//Use Task for Asynchronous Actions

//We refactor a standard node callback style workflow into a composed task-based workflow.

const Task = require('data.task')
const fs = require('fs')


//OLD style with callbacks
const app = () =>
  fs.readFile('config.js', 'utf-8', (err, contents) => {
    if (err) throw err;

    const newContents = contents.replace(/8/g, '6');

    fs.writeFile('config1.json', newContents, (err, _) => {
      if (err) throw err;
      console.log('success');
    });

  });


const readFile = (filename, enc) =>
  new Task((rej, res) =>
    fs.readFile(filename, enc, (err, contents) =>
      err ? rej(err) : res(contents)));

const writeFIle = (filename, contents) =>
  new Task((rej, res) =>
    fs.writeFile(filename, contents, (err, _) =>
      err ? rej(err) : res(contents)));

//first way
const app2 = () =>
  readFile('config.json', 'utf-8')
    .map(contents => contents.replace(/8/g, '6'))
    .chain(contents => writeFIle('config1.json', contents))

//let's do in clean way, library should not handle this case
//app2().fork(e => console.error(e),
//            con => console.log('success'));


//second way
const app3 =
  readFile('config.json', 'utf-8')
    .map(contents => contents.replace(/8/g, '6'))
    .chain(replaced => writeFIle('config1.json', replaced))

//let's do in clean way, library should not handle this case
app3.fork(e => console.error(e), con => console.log('success'));
