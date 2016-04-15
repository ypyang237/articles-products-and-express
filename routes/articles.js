var articleFinder = require('../db/articleFinder');

var express = require('express'),
    app = express(),
    router = express.Router(),
    Articles = require('./../db/Articles.js'); //articlesModel

router.route('/')
  .post(function (req, res) {

    return Articles.add(req.body, res, req); //intead of req.body, put a literal object here
  })
  .get(function (req, res) {
    var aCollection = Articles.get();
    res.render('articles/index', {articles: aCollection});
  });

router.route('/:title')
  .put(function (req, res) {

    return Articles.edit(req, res, req.body);
  })
  .delete(function (req, res) {

    return Articles.delete(req, res);
  });

router.route('/:title/edit').get(function(req, res) {

  var aCollection = Articles.get();
  var targetArt = articleFinder(req.params.title, aCollection);

  res.render('articles/edit', {articles: targetArt});
});

router.route('/new').get(function(req, res) {

  res.render('articles/new');
});

module.exports = router;