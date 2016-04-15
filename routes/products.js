var express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    productModel = require('./../db/Products.js');
    analyticTracker = require('../middleware/logs/analytics.js');




var pCollection = productModel.get();

router.route('/')
  .post(analyticTracker(), function (req, res) {

    var postObj = {

      name: req.body.name,
      price: req.body.price,
      inventory: req.body.inventory
    };

    productModel.add(postObj, res);
    return res.json({success: true});
  })
  .get(function(req, res) {

      res.render('products/index', {products: pCollection});
  });

router.route('/:id')
  .put(function (req, res) {

    var editObj = {

      name: req.body.name,
      price: req.body.price,
      inventory: req.body.inventory,
      id: req.body.id
    }

    productModel.edit(editObj, res);
    return res.json({success: true})
  })
  .delete(function (req, res) {

    var reqID = req.params.id;

    productModel.delete(reqID);
    return res.json({success: true});
  });

router.route('/:id/edit').get(function(req, res) {

  res.render('products/edit', {product: pCollection[req.params.id]});
});

router.route('/new').get(function (req, res) {

  res.render('products/new');
})

module.exports = router;