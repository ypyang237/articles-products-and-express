var express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    productModel = require('./../db/Products.js');

var pCollection = productModel.get();

router.route('/')
  .post(function (req, res) {

    return productModel.add(req.body, res);
  })

  .get(function(req, res) {

      res.render('products/index', {products: pCollection});
  });

router.route('/:id')
  .put(function (req, res) {
    console.log('in route, products');
    console.log(req.body);

    return productModel.edit(req.body, res);
  })
  .delete(function (req, res) {

    return productModel.delete(req, res);
  });

router.route('/:id/edit').get(function(req, res) {

  res.render('products/edit', {product: pCollection[req.params.id]});
});

router.route('/new').get(function (req, res) {

  res.render('products/new');
})

module.exports = router;