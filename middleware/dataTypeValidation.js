function dataTypeValidation (validValues) {
// merge with form validation, use obj.keys
  return function (req, res, next) {

    for (var key in req.body) {

      var inputType = 'string';

      if (isNaN(req.body[key]) === false) {

        inputType = 'number';
      }

      if (validValues[key] !== inputType) {

        return res.status(500).send('incorrect data type');
      }
    }

    return next();
  };
}

module.exports = dataTypeValidation;