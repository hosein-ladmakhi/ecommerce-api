const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const authorization = req.header('authorization');
  const token = authorization.split('Bearer ')[1];
  if (!token) return res.status(400).json({ message: 'unauthorized' });
  const tokenDecode = jwt.decode(token);
  if (tokenDecode.exp * 1000 < new Date().getTime()) {
    return res.status(400).json({ message: 'unauthorized' });
  }
  req.user = tokenDecode._id;
  return next();
};
