import * as fp from "./fp";

// One in All
var onInAll = ["1", "2", "3"].map(fp.unary(parseInt));
console.log(`One in All: ${onInAll}`);

// One on One
var words = "   Now is the time for all...  ".split(/\s|\b/);
var oneOnOne = words.filter(fp.identity);
console.log(`One on One: ${oneOnOne}`);
