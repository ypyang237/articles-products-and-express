var articleFinder = require('./articleFinder');

var articleModel = (function () {

  var articleArr = [];

  function get() {
    return articleArr;
  }

  function add (postObj) {
    articleArr.push(postObj);

    for (var key in postObj) {

      if (postObj[key].length === 0) {
        return false;
      }
    }

    var currIndex = articleArr.indexOf(postObj);
    articleArr[currIndex].urlTitle = encodeURI(postObj.title);

    return;
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

module.exports = articleModel;