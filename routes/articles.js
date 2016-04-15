var articleFinder = require('../db/articleFinder');
    // analyticTracker = require('../middleware/analyticTracker');

var express = require('express'),
    app = express(),
    router = express.Router(),
    articleModel = require('./../db/Articles.js');

router.route('/')
  .post(analyticTracker(), function (req, res) {

    var postObj = {
      title: req.body.title,
      body: req.body.body,
      author: req.body.author
    }

    articleModel.add(postObj);
    return res.json({success: true});
  })
  .get(analyticTracker(), function (req, res) {
    var aCollection = articleModel.get();
    res.render('articles/index', {articles: aCollection});
  });

router.route('/:title')
  .put(analyticTracker(), function (req, res) {

    var reqTitle = req.params.title;
    var reqNewTitle = null;
    if (req.body.newTitle) {

      reqNewTitle = req.body.newTitle;
    }

    var editObj = {

      body: req.body.body,
      author: req.body.author
    };

    var targetArt = articleModel.edit(editObj, reqTitle, reqNewTitle);
    return res.send(targetArt);
    // ^^ broke without returned targetArt from db/Articles
  })
  .delete(analyticTracker(), function (req, res) {

    var reqTitle = req.params.title;

    articleModel.delete(reqTitle);
    return res.json({success: true});
  });

router.route('/:title/edit').get(analyticTracker(), function(req, res) {

  var reqTitle = req.params.title;

  var aCollection = articleModel.get();
  var targetArt = articleFinder(reqTitle, aCollection);

  res.render('articles/edit', {articles: targetArt});
});

router.route('/new').get(analyticTracker(), function(req, res) {

  res.render('articles/new');
});

module.exports = router;