var fs = require('fs');
var path = require('path');

function analyticTracker () {

  return function(req, res, next) {
    var reqMethod = req.originalMethod;
    var reqUri = req.originalUrl;
    var reqHeaders = JSON.stringify(req.headers);
    var d = new Date();
    var aLog = reqMethod + ' ' + reqUri + ' ' +  d + ' ' + reqHeaders + '\r\n\r\n';

      var filePath = path.resolve(process.cwd(), 'middleware/logs/analyticTracker.log');
      var analytics = fs.appendFile(filePath, aLog, 'utf8', function(err) {
        if(err) {
          throw new Error(err);
        }
      });

    return next();
  };
}

module.exports = analyticTracker;