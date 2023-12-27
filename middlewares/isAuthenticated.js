const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Not authorized: no token',
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: 'Not authorized: not verify',
      });
    }

    req.userId = decoded.id;

    next();
  });
};

module.exports = isAuthenticated;
