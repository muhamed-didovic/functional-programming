'use strict';

var _ = require('lodash');

function sum(arr) {
  var list = _(arr);
  console.log(_.tail(arr));
  //console.log('head', list.head(), 'tail', list.tail());
  return list.isEmpty() ? 0 : list.head() + sum(list.tail());
}
//console.log(sum([])); //-> 0
console.log(sum([1, 2, 3, 4, 5, 6, 7, 8, 9])); //->45
//# sourceMappingURL=recursion.js.map