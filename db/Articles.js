var Articles = (function () {

  var articleArr = [];

  function get(res) {
    return res.json(articleArr);
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

    for (var i = 0; i < articleArr.length; i++) {

      if (articleArr[i].urlTitle === req.url.slice(1)) {

        if (reqBody.hasOwnProperty('newTitle')) {
          articleArr[i].title = reqBody.newTitle;
        }

        if (reqBody.hasOwnProperty('body')) {
          articleArr[i].body = reqBody.body;
        }

        if (reqBody.hasOwnProperty('author')) {
          articleArr[i].author = reqBody.author;
        }

        articleArr[i].urlTitle = encodeURI(reqBody.title);        
      }
      
      return res.send(articleArr[i]);
    }
  }

  function remove (req, res) {

    for (var i = 0; i < articleArr.length; i++) {

      if (articleArr[i].urlTitle === req.url.slice(1)) {

        delete articleArr[i];
        res.json({success: true});
      }
    }
  }

  return {

    add: add,
    get: get,
    edit: edit,
    delete: remove
  } 

})();

module.exports = Articles;