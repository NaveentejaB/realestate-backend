const jwt = require("jsonwebtoken");

// Middleware function to verify JWT token
const verifyToken= (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, "123", (err, authData) => {
      if (err) {
        res.status(403).json({ message: "Forbidden: Invalid token" });
      } else {
        req.user = authData.user; // Attach user data to request object
        next(); // Proceed to the next middleware or route handler
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized: No token provided" });
  }
}

// Middleware function to authorize user based on role
const authorizeUser =(allowedRoles) =>{
  return function(req, res, next) {
    const { role } = req.user;
    if (allowedRoles.includes(role)) {
      next(); // Proceed to the next middleware or route handler
    } else {
      res.status(403).json({ message: "Forbidden: Insufficient role permissions" });
    }
  };
}

module.exports = { verifyToken, authorizeUser };
