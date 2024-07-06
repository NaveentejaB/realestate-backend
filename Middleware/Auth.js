const jwt = require("jsonwebtoken");

// JWT Secret Key
const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjAxODQwNTEsImV4cCI6MTcyMDE4NzY1MX0.V6tJ-T1hxd4yv2zQyK_EtB7lVTlqENDGbnzBAltkql0';


// Middleware for JWT verification
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(403).json({ message: 'Token not provided' });
    }
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      req.userId = decoded.userId;
      next();
    });
  };

module.exports = {verifyToken};