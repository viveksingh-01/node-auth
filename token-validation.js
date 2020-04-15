const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send('Access Denied');
  }
  try {
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verifiedToken;
    next();
  } catch (err) {
    res.status(403).send('Invalid token');
  }
}

module.exports = verifyToken;
