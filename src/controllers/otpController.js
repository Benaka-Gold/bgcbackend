const otpService = require('../services/otpService');

exports.generateOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const otp = await otpService.generateOtp(phoneNumber);
    // You might want to comment out the next line in production
    res.status(200).send({ success: true, otp });  // Sending OTP in response for testing
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const isVerified = await otpService.verifyOtp(phoneNumber, otp);
    if (isVerified) {
      res.status(200).send({ success: true });
    } else {
      res.status(400).send({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};