var articleFinder = require('./articleFinder');

var Articles = (function () {

  var articleArr = [];

  function get() {
    return articleArr;
  }

  function add (reqBody, res) {
    articleArr.push(reqBody);
    var currIndex = articleArr.indexOf(reqBody);
    var uri = reqBody.title;
    articleArr[currIndex].urlTitle = encodeURI(uri);
    res.json({success: true});
    // Need validation
  }

  function edit (req, res, reqBody) {

    var targetArt = articleFinder(req, articleArr);

    if (targetArt.urlTitle === req.url.slice(1)) {

      if (reqBody.hasOwnProperty('newTitle')) {
        targetArt.title = reqBody.newTitle;
      }

      if (reqBody.hasOwnProperty('body')) {
        targetArt.body = reqBody.body;
      }

      if (reqBody.hasOwnProperty('author')) {
        targetArt.author = reqBody.author;
      }

      targetArt.urlTitle = encodeURI(reqBody.title);
    }

    return res.send(targetArt);
  }


  function remove (req, res) {

    var targetArt = articleFinder(req, articleArr);

    if (targetArt.urlTitle === req.url.slice(1)) {

      delete targetArt;
      res.json({success: true});
    }

  }

  return {

    add: add,
    get: get,
    edit: edit,
    delete: remove
  };

})();

module.exports = Articles;