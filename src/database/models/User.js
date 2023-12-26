// src/database/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
    role : {
      type : String,
      required : true
    },
    teamId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Team',
      required : true
    },
    division : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Division',
      required : false
    }
  },{timestamps : true});

module.exports = mongoose.model('User', userSchema);
