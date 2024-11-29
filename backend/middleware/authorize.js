// authorize.js
const authorize = (allowedRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: No user found' });
      }
  
      const userRole = req.user.role;
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      next();
    };
  };
  
  module.exports = authorize;
  