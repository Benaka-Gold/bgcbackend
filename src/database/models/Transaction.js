const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
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
  },
  details: {
    type: String,
    required: false
  },
  fundId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fund',
    required: true
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
