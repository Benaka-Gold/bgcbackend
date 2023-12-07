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
    enum : ['pending','op_approval','ac_approval','cancelled','completed']
  },
  // Additional details about the task
  description: String,
  appointmentTime: {
    type: Date,
    required: false
  },
  weight : Number,
  purity : String
}, { timestamps: true }); // Enable automatic timestamps for createdAt and updatedAt

module.exports = mongoose.model('Task', taskSchema);
