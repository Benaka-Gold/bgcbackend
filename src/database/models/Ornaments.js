const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ornamentSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  name: String,
  grossWeight: Number,
  netWeight: Number,
  billAvailable: Boolean,
  image: { type: Schema.Types.ObjectId, ref: 'FileUpload' },
  imageBill : {type : Schema.Types.ObjectId,ref : 'FileUpload'}
});

module.exports = mongoose.model('Ornament', ornamentSchema);
