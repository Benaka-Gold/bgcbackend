// src/controllers/customerController.js
const customerService = require('../services/customerService');

exports.createCustomer = async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCustomers = async (req,res) => {
    try {
        const customers = await customerService.getCustomers()
        res.status(200).json({success : true,data : customers})
    }
    catch (error) {
        res.status(500).json({success : false,error : error.message})
    }
}

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  
  try {
    const customer = await customerService.updateCustomer(req.params.id, req.body);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
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
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
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
