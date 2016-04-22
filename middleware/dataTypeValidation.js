function dataTypeValidation (validValues) {
// merge with form validation, use obj.keys
  return function (req, res, next) {

    //if temp is true its ok
    var check = Object.keys(req.body).every(function (key) {

      if (validValues[key] === 'number') {
        return parseInt(req.body[key]).toString() == req.body[key]; // typeof req.body.id = 'number', validValues['id'] = 'number'
      }
      else {
        return typeof req.body[key] === validValues[key];
      }
    });

    if (check === false) {
      return res.status(400).send('Incorrect data type');
    }

    return next();
  };
}

module.exports = dataTypeValidation;