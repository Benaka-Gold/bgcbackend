// src/config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { verifyOtp } = require('../services/otpService');
const User = require('../database/models/User');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload._id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

passport.use(new LocalStrategy({
  usernameField: 'phoneNumber',
  passwordField: 'otp',
  session: false
}, async (phoneNumber, otp, done) => {
  try {
    const isVerified = await verifyOtp(phoneNumber, otp);
    if (!isVerified) {
      return done(null, false, { message: 'Invalid OTP' });
    }
    const user = await User.findOne({ phoneNumber });
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

module.exports = passport;