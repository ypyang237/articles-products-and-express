var express = require('express'),
    app = express(),
    router = express.Router(),
    articleModel = require('./../db/Articles.js'),
    articleFinder = require('../db/articleFinder'),
    formValidation = require('../middleware/formValidation'),
    dataTypeValidation = require('../middleware/dataTypeValidation'),
    headerValidation = require('../middleware/headerValidation');

router.route('/')
  .get(analyticTracker(), function (req, res) {
    var aCollection = articleModel.get();
    aCollection
      .then(function (articles) {
        res.render('articles/index', {articles: articles});
      })
      .catch(function (error) {
        res.send(error);
      });
  })
  .post(analyticTracker(), formValidation(['title', 'body', 'author']), dataTypeValidation({title: 'string', body: 'string', author: 'string'}), headerValidation(), function (req, res) {

    var postObj = {
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
      urlTitle: encodeURI(req.body.title)
    };

    articleModel.add(postObj)
      .then(function (article) {
        res.json({success: true});
      })
      .catch(function (error) {
        res.send(error);
      });
  });
  
router.route('/:title')
  .put(analyticTracker(), dataTypeValidation({id: 'number', title: 'string', body: 'string', author: 'string', urlTitle: 'string', newTitle: 'string'}), function (req, res) {

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
    targetArt
      .then(function (article) {

        res.send({success: true});
      })
      .catch(function (error) {
        res.send(error);
      });
  })
  .delete(analyticTracker(), function (req, res) {

    var reqTitle = req.params.title;

    articleModel.delete(reqTitle);
    return res.json({success: true});
  });

router.route('/:title/edit').get(analyticTracker(), function(req, res) {

  articleModel.getOne(req.params.title)
    .then(function (article) {
      
      res.render('articles/edit', {articles: article[0]});
    })
    .catch(function (error) {
      res.send(error);
    });
});

router.route('/new').get(analyticTracker(), function(req, res) {
  res.render('articles/new');
});

module.exports = router;