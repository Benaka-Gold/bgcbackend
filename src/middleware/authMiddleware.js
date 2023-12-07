const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// This middleware ensures that the user is authenticated
const ensureAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {

      if (err || !user) {
        return res.status(403).json({ error: 'You are not authenticated' });
      }
      req.user = user;
      next();
    })(req, res, next);
  };


// This middleware checks the user's role
const checkRole = (roles) => (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!roles.includes(decodedToken.role)) {
          return res.status(403).json({ error: 'You do not have permission to access this resource' });
        }
        next();
      } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
      }
    } else {
      return res.status(401).json({ error: 'No token provided' });
    }
  };
  
  module.exports = {
    ensureAuthenticated,
    checkRole
  };  