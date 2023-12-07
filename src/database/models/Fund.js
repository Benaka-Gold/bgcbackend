const mongoose = require('mongoose');

const FundSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  fundType: {
    type: String,
    required: true
  },
  relatedTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
  }
  
}, { timestamps: true }); // This adds createdAt and updatedAt fields automatically

module.exports = mongoose.model('Fund', FundSchema);
