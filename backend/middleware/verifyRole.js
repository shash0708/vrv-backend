const jwt = require('jsonwebtoken');

const verifyRole = (roles) => {
  return (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies
    console.log(token);

    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log(decoded.role)
      // Check if the user's role matches one of the allowed roles
      if (!roles.includes(decoded.role)) {
        console.log(`Role from token: ${decoded.role}`);
        console.log(`Allowed roles: ${roles}`);
        return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
      }

      next(); // Role is valid, proceed to the next middleware or route handler
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
};

module.exports = verifyRole;
