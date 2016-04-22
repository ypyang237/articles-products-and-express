
var productModel = (function () {

  var productArr = [];

  var pgp = require('pg-promise')();
  var dbConn = require('./../config.json');
  var db = pgp(dbConn);


  function get() {
    return db.query('SELECT * FROM products');
  }

  function add (postObj) {

    productArr.push(postObj);
    var currIndex = productArr.indexOf(postObj);
    productArr[currIndex].id = currIndex;
    // Need to add success:false if product is already in array
  }

  function edit (editObj) {

    if (editObj.hasOwnProperty('name')) {

      productArr[editObj.id].name = editObj.name;
    }
    if (editObj.hasOwnProperty('price')) {

      productArr[editObj.id].price = editObj.price;
    }
    if (editObj.hasOwnProperty('inventory')) {

      productArr[editObj.id].inventory = editObj.inventory;
    }
    // OPTIMIZE and validate id
  }

  function remove (reqID) {

    productArr.splice(reqID, 1);
    // validate success false if product was not in array
  }

  return {
    get: get,
    add: add,
    edit: edit,
    delete: remove
  };

})();


module.exports = productModel;