const jwt = require('jsonwebtoken');

exports.generateToken = function (id, username) {
  return jwt.sign({ id, username }, process.env.SECRET_KEY, {
    expiresIn: '30d',
  });
};
