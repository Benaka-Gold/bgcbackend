// src/database/models/Lead.js
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: String,
  status: {
    type: String,
    required: true,
  },
  purity : {
    type : String,
    required : false
  },
  weight : {
    type : Number,
    required : false
  },
  assignedTeam : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required : false
  },
  feedback: {
    type: String
  },
  moveLead: {
    type: Boolean,
    default: false  // default value is false if not provided
  },
  moveTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: function() {
      return this.moveLead;  // required if moveLead is true
    }
  },
  source : {
    type : String,
    required : true
  },
  taskId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Task',
    default : null
  },
  division : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Division',
    default : null
  }
  
}, {
  timestamps: true  // This enables automatic updating of createdAt and updatedAt fields
});

module.exports = mongoose.model('Lead', leadSchema);
