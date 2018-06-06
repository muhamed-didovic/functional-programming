'use strict';

/*
Use chain for composable error handling with nested Eithers

We refactor a function that uses try/catch to a single composed expression using Either.
We then introduce the chain function to deal with nested Eithers resulting from two try/catch calls.
*/

// SETUP: fake fs
//==========
var fs = {
  readFileSync: function readFileSync(name) {
    if (name === 'config.json') {
      return JSON.stringify({ port: 8888 });
    } else {
      throw 'missing file!';
    }
  }
};

var Right = function Right(x) {
  return {
    chain: function chain(f) {
      return f(x);
    },
    map: function map(f) {
      return Right(f(x));
    },
    fold: function fold(f, g) {
      return g(x);
    },
    inspect: function inspect() {
      return 'Right(' + x + ')';
    }
  };
};

var Left = function Left(x) {
  return {
    //chain is used when there is Either inside of map method
    chain: function chain(f) {
      return Left(x);
    }, // .chain expects you to run a function and return another one
    map: function map(f) {
      return Left(x);
    },
    fold: function fold(f, g) {
      return f(x);
    }, // .fold is going to capture the idea of removing a value from its context -- taking it out of the box, whether it's a right or a left or a box itself.
    inspect: function inspect() {
      return 'Left(' + x + ')';
    }
  };
};

var fromNullable = function fromNullable(x) {
  return x != null ? Right(x) : Left(null);
};

var tryCatch = function tryCatch(f) {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

var getPort = function getPort() {
  return tryCatch(function () {
    return fs.readFileSync('config.json');
  }).chain(function (c) {
    return tryCatch(function () {
      return JSON.parse(c);
    });
  }).fold(function (e) {
    return 3000;
  }, function (c) {
    return c.port;
  });
};

var result = getPort();

console.log(result);
//# sourceMappingURL=4.js.map