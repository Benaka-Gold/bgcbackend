// src/database/models/TeamType.js
const mongoose = require('mongoose');

const teamTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
});

module.exports = mongoose.model('TeamType', teamTypeSchema);
