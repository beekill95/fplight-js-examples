import * as fp from "./fp";
import { curryProps } from "./fp.mjs";

// One in All
var onInAll = ["1", "2", "3"].map(fp.unary(parseInt));
console.log(`One in All: ${onInAll}`);

// One on One
var words = "   Now is the time for all...  ".split(/\s|\b/);
var oneOnOne = words.filter(fp.identity);
console.log(`One on One: ${oneOnOne}`);

// Partial Right
function fooPR(x, y, z, ...rest) {
  console.log(x, y, z, rest);
}

var f = fp.partialRight(fooPR, 'z:last');
f(1, 2);
f(1);
f(1, 2, 3);
f(1, 2, 3, 4);


// Curry function.
function add(x, y) {
  return x + y;
}

var adder = fp.curry(add);
var curried = [1, 2, 3, 4, 5].map(adder(3));
console.log(curried);

function sum(...nums) {
  var total = 0;
  for (let num of nums) {
    total += num;
  }

  return total;
}

var curriedSum = fp.curry(sum, 5);
console.log(sum(1, 2, 3, 4, 5));
console.log(curriedSum(1)(2)(3)(4)(5));

// Uncurry.
var uncurriedSum = fp.uncurry(curriedSum);

console.log(uncurriedSum(1, 2, 3, 4, 5));
console.log(uncurriedSum(1, 2, 3)(4)(5));

// Order matters.

function foo({x, y, z} = {}) {
  console.log(`x:${x} y:${y} z:${z}`);
}

var f1 = fp.curryProps(foo, 3);
var f2 = fp.partialProps(foo, { y: 2 });

f1({ y: 2 })({ x: 1 })({ z: 3 });
f2({ z: 3, x: 1 });

// Point free.

function output(msg) {
  console.log(msg);
}

function isShortEnough(str) {
  return str.length <= 5;
}

var isLongEnough = fp.not(isShortEnough);
var printIf = fp.uncurry(fp.partialRight(fp.when, output));

var msg1 = 'Hello';
var msg2 = msg1 + ' World';

printIf(isShortEnough, msg1);
printIf(isShortEnough, msg2);

printIf(isLongEnough, msg1);
printIf(isLongEnough, msg2);
