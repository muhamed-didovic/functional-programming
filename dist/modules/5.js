'use strict';

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

//First Example
var openSite = function openSite() {
  if (current_user) {
    return renderPage(current_user);
  } else {
    return showLogin();
  }
};

var openSite2 = function openSite2() {
  //first way
  // return fromNullable(currentUser)
  //   .map(u => user)
  //   .fold(() => showLogin(), u => renderPage(u));

  //second way
  return fromNullable(currentUser).fold(showLogin, renderPage);
};

//Second Example
var getPrefs = function getPrefs(user) {
  if (user.premium) {
    return loadPrefs(user.preferences);
  } else {
    return defaultPrefs;
  }
};

var gP = function gP(user) {
  //first way
  // return fromNullable(user.premium)
  //   .chain(u => tryCatch(user.preferences))
  //   .fold(() => defaultPrefs, prefs => loadPrefs(prefs));

  //second way
  return (user.premium ? Right(user) : Left('not premium')).map(function (u) {
    return u.preferences;
  }).fold(function () {
    return defaultPrefs;
  }, function (prefs) {
    return loadPrefs(prefs);
  });
};

//Third Example
var streetName = function streetName(user) {
  var address = user.address;

  if (address) {
    var street = address.street;

    if (street) {
      return street.name;
    }
    return 'no street';
  }
};

var sn = function sn(user) {
  //first way
  // return fromNullable(user)
  //   .chain(user => formNullable(user.address))
  //   .chain(address => formNullable(address.street))
  //   .fold(() => 'no street', street => street.name)

  //second way
  return fromNullable(user.address).chain(function (a) {
    return formNullable(a.street);
  }).map(function (s) {
    return s.name;
  }).fold(function () {
    return 'no street';
  }, function (n) {
    return n;
  });
};

//Fourth Example
var concatUniq = function concatUniq(x, ys) {
  var found = ys.filter(function (y) {
    return y === x;
  })[0];
  return found ? ys : ys.concat(x);
};

var cu = function cu(x, ys) {
  return fromNullable(ys.filter(function (y) {
    return y === x;
  })[0]).fold(function () {
    return ys.concat(x);
  }, function (y) {
    return ys;
  });
};

//Fifth Example
var wrapExamples = function wrapExamples(example) {
  if (example.previewPath) {
    try {
      example.preview = fs.readFileSync(example.previewPath);
    } catch (e) {}
  }
  return example;
};

var we = function we(example) {
  return fromNullable(example.previewPath).chain(function (example) {
    return tryCatch(fs.readFileSync(example.previewPath));
  }).fold(function () {
    return example;
  }, function (preview) {
    return Object.assign(example, { preview: preview });
  }); //Object.assign({}, example, { preview })
};

//Sixth example
var parseDbUrl = function parseDbUrl(cfg) {
  try {
    var c = JSON.parse(cfg);
    if (c.url) {
      return c.url.match(/postgres:...../);
    }
  } catch (e) {
    return null;
  }
};

var pdu = function pdu(cfg) {
  //first way, maybe this wont work???
  // return tryCatch(cfg)
  //   .fromNullable(JSON.parse(cfg))
  //   .map(c => c.url)
  //   .fold(() => null, u => u.match('...'));

  //second way
  return tryCatch(function () {
    return JSON.parse(cfg);
  }).chain(function (c) {
    return fromNullable(c.url);
  }).fold(function () {
    return null;
  }, function (u) {
    return u.match('...');
  });
};
//# sourceMappingURL=5.js.map