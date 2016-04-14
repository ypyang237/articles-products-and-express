var articleFinder = require('../db/articleFinder');

var express = require('express'),
    app = express(),
    router = express.Router(),
    bp = require('body-parser'),
    Articles = require('./../db/Articles.js');
var aCollection = Articles.get();

router.use(bp.urlencoded({extended: true}));

router.route('/')
  .post(function (req, res) {

    return Articles.add(req.body, res);
  })
  .get(function (req, res) {
    console.log(aCollection);
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

  var targetArt = articleFinder(req.params.title, aCollection);
  res.render('articles/edit', {articles: targetArt});
  // res.send('ok');
});

module.exports = router;