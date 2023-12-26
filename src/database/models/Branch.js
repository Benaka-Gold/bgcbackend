const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  branchName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  branchManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: false
  },
  goldStock: {
    type: Number,
    required: false
  },
  goldMovementThreshold: {
    type: Number,
    required: false
  },
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }],
  branchImage : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'FileUpload',
    required : false
  },
  division : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Division',
    required : true
  },
  fund : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Fund',
    default : null
  },
  gst : String,
});

module.exports = mongoose.model('Branch', branchSchema);
