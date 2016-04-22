
var productModel = (function () {

  var productArr = [];

  var pgp = require('pg-promise')();
  var dbConn = require('./../config.json');
  var db = pgp(dbConn);


  function get() {
    return db.query('SELECT * FROM products');
  }

  function add (postObj) {
    return db.query('INSERT INTO products (name, price, inventory) VALUES (\'' + postObj.name + '\', \'' + postObj.price + '\', \''+ postObj.inventory+ '\')');
  }

  function edit (editObj) {

    return db.query('UPDATE products SET name = \'' + editObj.name + '\', price = \'' + editObj.price + '\', inventory = \'' + editObj.inventory + '\' WHERE id = \'' + editObj.id + '\'');
  }

  function remove (reqID) {

    return db.query('DELETE FROM products WHERE id = \'' + reqID + '\'');
  }

  function getOne (id) {
    return db.query('SELECT * FROM products WHERE id = \'' + id + '\'');
  }

  return {
    get: get,
    add: add,
    edit: edit,
    delete: remove,
    getOne: getOne
  };

})();


module.exports = productModel;