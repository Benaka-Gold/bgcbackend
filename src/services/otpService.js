// src/services/otpService.js
const otpGenerator = require('otp-generator');
const OTP = require('../database/models/OTP');

exports.generateOtp = async (phoneNumber) => {
  const otp = otpGenerator.generate(6, { digits:true,specialChars : false,lowerCaseAlphabets : false,upperCaseAlphabets: false});
  await OTP.create({ phoneNumber, otp });
  // Send OTP via SMS (you'll need an SMS service for this)
  // ...
  return otp; 
};

exports.verifyOtp = async (phoneNumber, inputOtp) => {
    const otpRecord = await OTP.findOne({ phoneNumber, status: 'pending' }).sort({createdAt : -1});
    if (otpRecord && inputOtp === otpRecord.otp) {
      await OTP.updateOne({ _id: otpRecord._id }, { status: 'verified' });  // Update based on _id to ensure accuracy
      return true;
    }
    return false;
  };
