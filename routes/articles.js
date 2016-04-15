var articleFinder = require('../db/articleFinder');
    // analyticTracker = require('../middleware/analyticTracker');

var express = require('express'),
    app = express(),
    router = express.Router(),
    articleModel = require('./../db/Articles.js');

router.route('/')
  .post(function (req, res) {

    var postObj = {
      title: req.body.title,
      body: req.body.body,
      author: req.body.author
    }

    articleModel.add(postObj);
    return res.json({success: true});
  })
  .get(function (req, res) {
    var aCollection = articleModel.get();
    res.render('articles/index', {articles: aCollection});
  });

router.route('/:title')
  .put(function (req, res) {

    var reqTitle = req.params.title;
    var reqNewTitle = null;
    if (req.body.newTitle) {

      reqNewTitle = req.body.newTitle;
    }

    var editObj = {

      body: req.body.body,
      author: req.body.author
    }

    return articleModel.edit(res, editObj, reqTitle, reqNewTitle);
  })
  .delete(function (req, res) {

    return articleModel.delete(req, res);
  });

router.route('/:title/edit').get(function(req, res) {

  var reqTitle = req.params.title;

  var aCollection = articleModel.get();
  var targetArt = articleFinder(reqTitle, aCollection);

  res.render('articles/edit', {articles: targetArt});
});

router.route('/new').get(function(req, res) {

  res.render('articles/new');
});

module.exports = router;