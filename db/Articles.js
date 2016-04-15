var articleFinder = require('./articleFinder');

var Articles = (function () {

  var articleArr = [];

  function get() {
    return articleArr;
  }

  function add (reqBody, res, req) {
    articleArr.push(reqBody);
    var currIndex = articleArr.indexOf(reqBody);
    articleArr[currIndex].urlTitle = encodeURI(reqBody.title);
    res.json({success: true});
    // Need validation
  }

  function edit (req, res, reqBody) {

    var targetArt = articleFinder(req, articleArr);

    if (targetArt.urlTitle === req.url.slice(1)) {
      if (reqBody.title) {
        targetArt.urlTitle = encodeURI(reqBody.title);
      }
      else if (reqBody.newTitle){
        targetArt.urlTitle = encodeURI(reqBody.newTitle);
      }
      if (reqBody.hasOwnProperty('newTitle')) {
        targetArt.title = reqBody.newTitle;
      }

      if (reqBody.hasOwnProperty('body')) {
        targetArt.body = reqBody.body;
      }

      if (reqBody.hasOwnProperty('author')) {
        targetArt.author = reqBody.author;
      }

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