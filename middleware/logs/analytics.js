var fs = require('fs');

function analyticTracker () {

  return function(req, res, next) {
    var reqMethod = req.originalMethod;

    var options = {
        flags: 'r+',
        defaultEncoding: 'utf8',
        fd: null,
        mode: 0o666,
        autoClose: true
      };
    // fs.readdir('../middleware/logs', function(err, files) {
    //   if(err) {
    //     console.log('error');
    //   }
      var analytics = fs.createWriteStream('../articles-products-and-express/middleware/logs/analyticTracker.log', options);
      analytics.write(reqMethod);

        //Need to fix path to relative, and utilze fs.readdir for timestamps
    // });


    return next();
  };
}

module.exports = analyticTracker;