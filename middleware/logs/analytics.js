var fs = require('fs');
var path = require('path');

function analyticTracker () {

  return function(req, res, next) {
    var reqMethod = req.originalMethod;
    var reqUri = req.originalUrl;
    var reqHeaders = JSON.stringify(req.headers);
    var d = new Date();
    var aLog = reqMethod + ' ' + reqUri + ' ' +  d + ' ' + reqHeaders + '\r\n\r\n';

    // var options = {
    //     flags: 'r+',
    //     defaultEncoding: 'utf8',
    //     fd: null,
    //     mode: 0o666,
    //     autoClose: true
    //   };
    // fs.readdir('../middleware/logs', function(err, files) {
    //   if(err) {
    //     console.log('error');
    //   }
      var filePath = path.resolve(process.cwd(), 'middleware/logs/analyticTracker.log');
      var analytics = fs.appendFile(filePath, aLog, 'utf8', function(err) {
        if(err) {
          throw new Error(err);
        }
      });
      // analytics.end(aLog);


    // console.log(aLog);

    return next();
  };
}

module.exports = analyticTracker;