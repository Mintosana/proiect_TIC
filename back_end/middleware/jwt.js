const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.cookies['jwt-token'];
  //console.log(token);
  if (!token) {
    return res.status(401).send('Access token missing');
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid or expired token');
    }

  if (user.isAdmin !== 1) {
    return res.status(403).send('Access denied. Admins only.');
  }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;