var express = require('express'),
    app = express(),
    router = express.Router(),
    bp = require('body-parser'),
    Products = require('./../db/Products.js');

var pCollection = Products.get();

router.use(bp.urlencoded({extended: true}));

router.route('/')
  .post(function (req, res) {

    return Products.add(req.body, res);
  })

  .get(function(req, res) {

      res.render('products/index', {products: pCollection});
  });

router.route('/:id')
  .put(function (req, res) {
    console.log('in route, products');
    console.log(req.body);

    return Products.edit(req.body, res);
  })
  .delete(function (req, res) {

    return Products.delete(req, res);
  });

router.route('/:id/edit').get(function(req, res) {

  res.render('products/edit', {product: pCollection[req.params.id]});



});


module.exports = router;