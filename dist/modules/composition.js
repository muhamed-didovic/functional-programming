'use strict';

var _ = require('lodash');
var __ = require('underscore');

var str = "We can only see a short distance ahead but we can see plenty there that needs to be done";
var explode = function explode(str) {
  //console.log('111', str.split(/\s+/));
  return str.split(/\s+/);
};
var count = function count(arr) {
  console.log(2222, arr.length);
  return arr.length;
};
//var countWords = __.compose(count, explode); //-> 19
//console.log('aa', countWords(str));


var check = _.curry(function (len, size) {
  console.log(len, '--', size);
  return size >= len;
});
var check10 = check(10);
console.log(check10(0));
var checkText = __.compose(check10, count, explode);
//console.log(333, checkText(str)); //-> true
//console.log(444, check(10)(9));

// var greet    = function(name){
//   console.log('111', name);
//   return "hi: " + name;
// };
// var exclaim  = function(statement){
//   console.log('ssss', statement);
//   return statement.toUpperCase() + "!";
// };
// var welcome = __.compose(greet, exclaim); //from right to left
//console.log(welcome('moe'));
//# sourceMappingURL=composition.js.map