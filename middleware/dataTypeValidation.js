function dataTypeValidation (validValues) {

  return function (req, res, next) {

    for (var key in req.body) {

      var inputType = 'string';

      if (isNaN(req.body[key]) === false) {

        inputType = 'number';
      }

      if (validValues[key] !== inputType) {

        return res.status(400).send('Incorrect data types!');
      }
    }

    return next();
  }
};

module.exports = dataTypeValidation;