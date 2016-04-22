var express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    productModel = require('./../db/Products.js');
    analyticTracker = require('../middleware/logs/analytics.js');
    formValidation = require('../middleware/formValidation');
    dataTypeValidation = require('../middleware/dataTypeValidation');


router.route('/')
  .get(analyticTracker(), function(req, res) {
      var pCollection = productModel.get();
      pCollection
      .then(function(products) {
        res.render('products/index', {products: products});
      })
      .catch(function(e) {
        res.send(e);
      });
  })
  .post(analyticTracker(),  formValidation(['name', 'price', 'inventory']), dataTypeValidation({name: 'string', price: 'number', inventory: 'number'}), function (req, res) {

    var postObj = {
      name: req.body.name,
      price: req.body.price,
      inventory: req.body.inventory
    };

    productModel.add(postObj)
      .then(function () {
        res.json({success: true});
      })
      .catch(function(e) {
        res.send(e);
      });
  });

router.route('/:id')
  .put(analyticTracker(), dataTypeValidation({id: 'number', name: 'string', price: 'number', inventory: 'number'}), function (req, res) {

    var editObj = {

      name: req.body.name,
      price: req.body.price,
      inventory: req.body.inventory,
      id: req.body.id
    };

    productModel.edit(editObj)
      .then(function (product) {
        res.redirect('/products');
      })
      .catch(function (error) {
        res.send(error);
      });
  })
  .delete(analyticTracker(), function (req, res) {

    var reqID = req.params.id;

    productModel.delete(reqID)
      .then(function (product) {

        res.json({success: true});
      })
      .catch(function (error) {
        res.send(error);
      });
  });

router.route('/:id/edit').get(function(req, res) {

  var selectedProduct = productModel.getOne(req.params.id);
  selectedProduct
    .then(function (product) {
      res.render('products/edit', {product: product[0]});
    })
    .catch(function (error) {
      res.send(error);
    });
});

router.route('/new').get(analyticTracker(), function (req, res) {

  res.render('products/new');
});

module.exports = router;