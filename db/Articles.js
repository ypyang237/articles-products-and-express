var articleFinder = require('./articleFinder');

var articleModel = (function () {

  var pgp = require('pg-promise')();
  var dbConn = require('./../config.json');
  var db = pgp(dbConn);

  function get() {
    return db.query('SELECT * FROM articles');
  }

  function add (postObj) {
    return db.query('INSERT INTO articles (title, body, author, urltitle) VALUES (\'' + postObj.title + '\', \'' + postObj.body + '\', \'' + postObj.author + '\', \'' + postObj.urltitle + '\')');
  }

  function edit (editObj, reqTitle, reqNewTitle) {

    var encodedTitle = encodeURI(reqNewTitle);

    return db.query('UPDATE articles SET title = \'' + reqNewTitle + '\', body = \'' + editObj.body + '\', author = \'' + editObj.author + '\', urltitle = \'' + encodedTitle + '\' WHERE title = \'' + reqTitle + '\'');
  }


  function remove (reqTitle) {

    return db.query('DELETE FROM articles WHERE title = \'' + reqTitle + '\'');
  }

  function getOne (title) {
    return db.query('SELECT * FROM articles WHERE title = \'' + title + '\'');
  }

  return {

    add: add,
    get: get,
    edit: edit,
    delete: remove,
    getOne: getOne
  };

})();

module.exports = articleModel;