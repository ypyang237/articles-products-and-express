var articleFinder = require('./articleFinder');

var articleModel = (function () {

  var pgp = require('pg-promise')();
  var dbConn = require('./../config.json');
  var db = pgp(dbConn);

  function get() {
    return db.query('SELECT * FROM articles');
  }

  function add (postObj) {
    articleArr.push(postObj);
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