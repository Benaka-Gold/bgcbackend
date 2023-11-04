// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { generateOtp } = require('../services/otpService');
const userService = require('../services/userService')

exports.login = async (req, res, next) => {
  try {
    const user = await userService.getUserByPhone(req.body.phoneNumber);
    console.log(user)
    if(user !== null){
        const otp = await generateOtp(req.body.phoneNumber);
        res.status(200).json({ success: true, message: 'OTP sent successfully.',otp : otp} );
    }
    else {
        res.status(404).json({success : false,message : "User not found"})
        return;
    }   
    
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.verifyLogin = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user: user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {expiresIn : '6d'});
      return res.json({ user, token });
    });
  })(req, res);
};

exports.authorizeRole = (roles) => {
  return (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user || !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};
