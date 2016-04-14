var express = require('express'),
    app = express(),
    router = express.Router(),
    bp = require('body-parser'),
    Articles = require('./../db/Articles.js');

router.use(bp.urlencoded({extended: true}));

router.route('/')
  .post(function (req, res) {

    return Articles.add(req.body, res);
  })
  .get(function (req, res) {

    return Articles.get(res);
  });

router.route('/:title')
  .put(function (req, res) {

    return Articles.edit(req, res, req.body);
  })
  .delete(function (req, res) {

    return Articles.delete(req, res);
  })


module.exports = router;