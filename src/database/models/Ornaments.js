const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ornamentSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  name: String,
  grossWeight: Number,
  netWeight: Number,
  billAvailable: Boolean,
  purity :{ type: Schema.Types.ObjectId, ref: 'GoldRate' },
  amount:Number,
  image: { type: Schema.Types.ObjectId, ref: 'FileUpload' },
  BillImage : {type : Schema.Types.ObjectId,ref : 'FileUpload'},
  businessId : {
    type : Schema.Types.ObjectId,
    ref : 'Business',
    required : true
  },
});

module.exports = mongoose.model('Ornament', ornamentSchema);
