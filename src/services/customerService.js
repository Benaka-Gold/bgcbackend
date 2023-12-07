// src/services/customerService.js
const Customer = require('../database/models/Customer');
// const Ornament = require('../database/models/Ornament'); 

exports.createCustomer = async (customerData) => {
  const customer = new Customer(customerData);
  await customer.save();
  return customer;
};

exports.getCustomers = async () => {
    return await Customer.find();
}

exports.getCustomerById = async (id) => {
  return await Customer.findById(id);
};

exports.updateCustomer = async (id, updateData) => {
  return await Customer.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteCustomer = async (id) => {
  await Customer.findByIdAndDelete(id);
  // Optionally delete related ornaments
  await Ornament.deleteMany({ customerId: id });
  return true;
};

exports.findCustomers = async (query) => {
  const searchQuery = {};
  if (query.phone) searchQuery.phone = query.phone;
  if (query.name) searchQuery.name = new RegExp(query.name, 'i');
  // Add more fields to search by as needed
  return await Customer.find(searchQuery);
};