function dataTypeValidation (validValues) {
// merge with form validation, use obj.keys
  return function (req, res, next) {

    var temp = Object.keys(req.body).every(function (key) {

      return typeof req.body[key] === parseInt(validValues[key]).toString;
    })

    return next();
  };
}

module.exports = dataTypeValidation;