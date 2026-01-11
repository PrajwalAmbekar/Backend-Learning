// using only one function in math.js file

// const add = require('./Modules/math');
// const result =add(2,34);
// console.log("the sum of to given numbers is " + result);



//using multiple function in math.js


// const math = require('./Modules/math')

// const sum = math.add(2,34)
// const difference = math.sub(2,34)

// console.log("the sum and difference between to numbers are " + sum , difference)



//Destructuring above version code

const {add, sub } = require('./math')

const sum =  add(2,43)
const difference = sub(2,43)

console.log("the sum and difference between to numbers are " + sum , difference)