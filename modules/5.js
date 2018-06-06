const Right = x =>
  ({
    chain: f => f(x),
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inspect: () => `Right(${x})`
  })

const Left = x =>
  ({
    //chain is used when there is Either inside of map method
    chain: f => Left(x), // .chain expects you to run a function and return another one
    map: f => Left(x),
    fold: (f, g) => f(x), // .fold is going to capture the idea of removing a value from its context -- taking it out of the box, whether it's a right or a left or a box itself.
    inspect: () => `Left(${x})`
  })

const fromNullable = x => x != null ? Right(x) : Left(null);

const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e)
  }
}

//First Example
const openSite = () => {
  if (current_user) {
    return renderPage(current_user);
  } else {
    return showLogin()
  }
};

const openSite2 = () => {
  //first way
  // return fromNullable(currentUser)
  //   .map(u => user)
  //   .fold(() => showLogin(), u => renderPage(u));

  //second way
  return fromNullable(currentUser)
    .fold(showLogin, renderPage)
};

//Second Example
const getPrefs = user => {
  if (user.premium) {
    return loadPrefs(user.preferences);
  } else {
    return defaultPrefs;
  }
};

const gP = user => {
  //first way
  // return fromNullable(user.premium)
  //   .chain(u => tryCatch(user.preferences))
  //   .fold(() => defaultPrefs, prefs => loadPrefs(prefs));

  //second way
  return (user.premium ? Right(user) : Left('not premium'))
    .map(u => u.preferences)
    .fold(() => defaultPrefs, prefs => loadPrefs(prefs))
};


//Third Example
const streetName = user => {
  const address = user.address;

  if (address) {
    const street = address.street;

    if (street) {
      return street.name;
    }
    return 'no street';
  }
};

const sn = user => {
  //first way
  // return fromNullable(user)
  //   .chain(user => formNullable(user.address))
  //   .chain(address => formNullable(address.street))
  //   .fold(() => 'no street', street => street.name)

  //second way
  return fromNullable(user.address)
    .chain(a => formNullable(a.street))
    .map(s => s.name)
    .fold(() => 'no street', n => n)
};

//Fourth Example
const concatUniq = (x, ys) => {
  const found = ys.filter(y => y === x)[0];
  return found ? ys : ys.concat(x);
};

const cu = (x, ys) => {
  return fromNullable(ys.filter(y => y === x)[0])
    .fold(() => ys.concat(x), y => ys)
};

//Fifth Example
const wrapExamples = example => {
  if (example.previewPath) {
    try {
      example.preview = fs.readFileSync(example.previewPath);
    } catch (e) {
    }
  }
  return example;
};

const we = example => {
  return fromNullable(example.previewPath)
    .chain(example => tryCatch(fs.readFileSync(example.previewPath)))
    .fold(() => example, preview => Object.assign(example, {preview}))//Object.assign({}, example, { preview })
};

//Sixth example
const parseDbUrl = cfg => {
  try {
    const c = JSON.parse(cfg);
    if (c.url) {
      return c.url.match(/postgres:...../);
    }
  } catch (e) {
    return null;
  }
};

const pdu = cfg => {
  //first way, maybe this wont work???
  // return tryCatch(cfg)
  //   .fromNullable(JSON.parse(cfg))
  //   .map(c => c.url)
  //   .fold(() => null, u => u.match('...'));

  //second way
  return tryCatch(() => JSON.parse(cfg))
    .chain(c => fromNullable(c.url))
    .fold(() => null, u => u.match('...'));
};

