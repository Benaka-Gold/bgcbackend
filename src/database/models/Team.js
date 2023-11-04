// src/database/models/Team.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teamTypeId: {
    type: Schema.Types.ObjectId,
    ref: 'TeamType',
    required: true,
    unique : false
  },
  members: [{
    userId : {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isTL : {
      type : Boolean,
      default : false
    }
  }],
});

module.exports = mongoose.model('Team', teamSchema);
