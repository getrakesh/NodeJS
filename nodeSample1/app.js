const http=require('http');
const server=http.createServer((req,res)=>
{
if(req.url==='/')
{
res.write('Hello World');
res.end();
}
if(req.url==='/api/courses')
{
    res.write(JSON.stringify('[1,2,3,4]'));
    res.end();
}

});

console.log('connecting');
server.listen(3000);
// var logger = require('./logger');
// const path=require('path');
// const os=require('os');
// const fs=require('fs');


// var totalMemory=os.totalmem();
// var freeMemory=os.freemem();;

// const files=fs.rea

// // console.log('Total Memory '+ totalMemory);
// console.log(`Total Memory: ${totalMemory}`);
// console.log(`Free Memory: ${freeMemory}`);

// // var pathObj=path.parse(__filename);
// // console.log(pathObj);
// // // function sayHello(name)
// // // {
// // //     console.log('Hello '+name);
// // // }
// // // sayHello('Rakesh');
// // // console.log(window)
// // logger.log('message');



// //API
