var articleFinder = require('./articleFinder');

var Articles = (function () {

  var articleArr = [];

  function get() {
    return articleArr;
  }

  function add (postObj) {
    articleArr.push(postObj);
    var currIndex = articleArr.indexOf(postObj);
    articleArr[currIndex].urlTitle = encodeURI(postObj.title);
    
    return;
    // Need validation
  }

  function edit (req, res, reqBody, reqTitle) {

    var targetArt = articleFinder(reqTitle, articleArr);

    if (targetArt.urlTitle === reqTitle) {
  
      if (reqBody.hasOwnProperty('newTitle')) {
        targetArt.title = reqBody.newTitle;
        targetArt.urlTitle = reqBody.newTitle;
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