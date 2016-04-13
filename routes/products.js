var express = require('express'),
    app = express(),
    router = express.Router(),
    bp = require('body-parser'),
    Products = require('./../db/Products.js');

router.use(bp.urlencoded({extended: true}));

router.route('/')
  .post(function (req, res) {

    return Products.add(req.body, res);
  });

router.route('/:id')
  .put(function (req, res) {

    return Products.edit(req.body, res);
  })
  .delete(function (req, res) {

    return Products.delete(req, res);
  })


module.exports = router;