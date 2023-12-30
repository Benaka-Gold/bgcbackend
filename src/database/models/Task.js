// src/database/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  // Assign the task to a user (executive)
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming 'User' model represents executives as well
    required: true
  },
  leadId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Lead',
    required : false,
    default : null
  },
  // Reference to the customer, if a lead converts to a customer
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    default: null // Initially null, set when a lead is converted to a customer
  },
  // Status of the task
  status: {
    type: String,
    default: 'pending',
  },
  // Additional details about the task
  description: String,
  appointmentTime: {
    type: Date,
    required: false
  },
  purity : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'GoldRate'
  },
  division : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Division'
  },
  businessId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Business'
  },
  state : Object
}, { timestamps: true }); // Enable automatic timestamps for createdAt and updatedAt

module.exports = mongoose.model('Task', taskSchema);
