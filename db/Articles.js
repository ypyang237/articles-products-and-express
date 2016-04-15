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

  function edit (res, editObj, reqTitle, reqNewTitle) {

    var targetArt = articleFinder(reqTitle, articleArr);

    console.log('targetArt', targetArt);

      if (reqNewTitle !== null) {
        targetArt.title = reqNewTitle;
        targetArt.urlTitle = encodeURI(reqNewTitle);
      }

      if (editObj.hasOwnProperty('body')) {
        targetArt.body = editObj.body;
      }

      if (editObj.hasOwnProperty('author')) {
        targetArt.author = editObj.author;
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