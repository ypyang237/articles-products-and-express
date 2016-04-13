var express = require('express'),
    app = express(),
    products = require('./routes/products.js'),
    articles = require('./routes/articles.js'),
    bp = require('body-parser');

app.use(bp.urlencoded({extended: true}));

app.use('/products', products);
// app.use('/articles', articles);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at 3000');
})