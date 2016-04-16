function headerValidation () {

  return function (req, res, next) {

    if (!req.headers.version) {

      return res.status(400).json({error: 'bad headers!'});
    }

    return next();
  }
}

module.exports = headerValidation;