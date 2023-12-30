// src/controllers/customerController.js
const { default: axios } = require("axios");
const customerService = require("../services/customerService");
const otpService = require("../services/otpService");

exports.createCustomer = async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await customerService.getCustomers();
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await customerService.updateCustomer(
      req.params.id,
      req.body
    );
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const success = await customerService.deleteCustomer(req.params.id);
    if (!success) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchCustomers = async (req, res) => {
  try {
    const customers = await customerService.findCustomers(req.query);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendOTP = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    const otp = await otpService.generateOtp(customer.phoneNumber);
    await axios.get(
      `https://pgapi.vispl.in/fe/api/v1/send?username=benakagold.trans&password=hhwGK&unicode=false&from=BENGLD&to=${customer.phoneNumber}&text=Thanks%20for%20choosing%20our%20service.%20The%20one%20time%20password%20to%20share%20with%20our%20executive%20is%20%${otp}.%20This%20OTP%20is%20valid%20for%205%20minutes%20only.%20Visit%20us%20www.benakagoldcompany.com%20Call%20us%206366111999.&dltContentId=1707168542372603038`)
      .then(data => {
          if(data.data.statusCode === 200){
            res.status(200).json({message: 'OTP sent successfully.'} );
          }
          else {
            res.status(401).json({message : "OTP Not successfull"})
          }
        })
    // res.status(200).json(otp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const otp = req.body.otp;
    const verification = await otpService.verifyOtp(phoneNumber, otp);
    if (verification) {
      res.status(200).json(true);
    } else {
      res.status(400).json(false);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
