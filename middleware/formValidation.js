function formValidation (validFields) {

  return function (req, res, next) {

    var missingKeys = validFields.filter((key) => {

      return !req.body.hasOwnProperty(key) || req.body[key].length === 0;
    });

    if (missingKeys.length !== 0) {

      return res.status(500).send('incorrect form values');
    }

    return next();
  };
}

module.exports = formValidation;