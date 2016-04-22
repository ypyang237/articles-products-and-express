function dataTypeValidation (validValues) {
// merge with form validation, use obj.keys
  return function (req, res, next) {

    var badValue = {};
    //if temp is true its ok
    var check = Object.keys(req.body).every(function (key) {

      if (validValues[key] === 'number') {
        if ((typeof req.body[key] === validValues[key]) === false) {
          badValue = {};
          badValue[key] = 'should be a number';
        }

        return parseInt(req.body[key]).toString() == req.body[key];
      }
      else {
        return typeof req.body[key] === validValues[key];
      }
    });

    if (check === false) {
      return res.status(400).json(badValue);
    }

    return next();
  };
}

module.exports = dataTypeValidation;