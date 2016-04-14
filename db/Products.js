
var Products = (function () {

  var productArr = [];

  function get() {
    return productArr;
  }

  function add (reqBody, res) {

    productArr.push(reqBody);
    var currIndex = productArr.indexOf(reqBody);
    productArr[currIndex].id = currIndex;
    res.json({success: true});
    // Need to add success:false if product is already in array
  }

  function edit (reqBody, res) {

    if (reqBody.hasOwnProperty('name')) {

      productArr[reqBody.id].name = reqBody.name;
    }
    if (reqBody.hasOwnProperty('price')) {

      productArr[reqBody.id].price = reqBody.price;
    }
    if (reqBody.hasOwnProperty('inventory')) {

      productArr[reqBody.id].inventory = reqBody.inventory;
    }

    return res.send(productArr[reqBody.id]);
    // OPTIMIZE and validate id
  }

  function remove (req, res) {

    productArr.splice(req.params.id, 1);

    res.json({success: true});

    // validate success false if product was not in array
  }

  return {
    get: get,
    add: add,
    edit: edit,
    delete: remove
  };

})();


module.exports = Products;