// src/database/models/OTP.js
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    phoneNumber: String,
    otp: String,
    status: { type: String, default: 'pending' },  // Status can be 'pending', 'verified', or 'expired'
    createdAt: { type: Date, default: Date.now, expires: 300 }  // OTP expires after 5 minutes
  });
module.exports = mongoose.model('OTP', otpSchema);
