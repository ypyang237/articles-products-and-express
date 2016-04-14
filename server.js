var express = require('express'),
    app = express(),
    products = require('./routes/products.js'),
    articles = require('./routes/articles.js'),
    bp = require('body-parser');
var jade = require('jade');
var methodOverride = require('method-override');

app.set('view engine', 'jade');
app.set('views', './templates');

app.use(bp.urlencoded({extended: true}));

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use('/products', products);
app.use('/articles', articles);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at 3000');
});