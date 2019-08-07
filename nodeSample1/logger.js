var url='http://mylogger.com';

function log(message)
{
    //send an http request
    console.log(message);
}
module.exports.log=log;