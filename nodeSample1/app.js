var logger = require('./logger');
const path=require('path');
const os=require('os');

var totalMemory=os.totalmem();
var freeMemory=os.freemem();

// console.log('Total Memory '+ totalMemory);
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

// var pathObj=path.parse(__filename);
// console.log(pathObj);
// // function sayHello(name)
// // {
// //     console.log('Hello '+name);
// // }
// // sayHello('Rakesh');
// // console.log(window)
// logger.log('message');

