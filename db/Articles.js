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
    
    console.log('articleArr', articleArr);
    return;
    // Need validation
  }

  function edit (editObj, reqTitle, reqNewTitle) {

    var targetArt = articleFinder(reqTitle, articleArr);

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

    return targetArt;
    // return res.send(targetArt);
    // ^^^ not returning targetArt breaks the edit/put, returned to route /:title put
  }


  function remove (reqTitle) {

    var targetArt = articleFinder(reqTitle, articleArr);

    if (targetArt.urlTitle === reqTitle) {

      articleArr.splice(articleArr.indexOf(targetArt), 1);
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