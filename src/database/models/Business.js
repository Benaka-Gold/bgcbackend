const mongoose = require('mongoose');
const Counter = require('./Counter');

const businessSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  pledgeCopy : {type: mongoose.Schema.Types.ObjectId,ref : 'FileUpload'},
  transactionType : {
    type : String,
    enum : ['cash','account_transfer']
  },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  releasingAmount : {type : Number,default : 0},
  totalAmount: {type : Number,default : 0},
  serviceAmount : {type : Number,default : 0},
  grossAmount : {type : Number,default : 0},
  netWeight : {type : Number,default : 0},
  goldType : String,
  grossWeight : Number,
  status : String,
  division : { type : mongoose.Schema.Types.ObjectId,ref : 'Division'},
  releaseCopy : {type: mongoose.Schema.Types.ObjectId,ref : 'FileUpload'},
  branchId : {type : mongoose.Schema.Types.ObjectId,ref : "Branch"},
  releaseApprovedBy : {type : mongoose.Schema.Types.ObjectId,ref : 'User'},
  purchaseApprovedBy : {type : mongoose.Schema.Types.ObjectId,ref : 'User'},
  feedback : String,
  nbfcBankDetails : { type : mongoose.Schema.Types.ObjectId, ref : 'FileUpload' },
  b_id : { type : String, unique : true},
  houseVerification :  { type: mongoose.Schema.Types.ObjectId, ref: 'FileUpload' },
  authorizationLetter: { type: mongoose.Schema.Types.ObjectId, ref: 'FileUpload' },
  noc: { type: mongoose.Schema.Types.ObjectId, ref: 'FileUpload' },
  agreementOfPurchase: { type: mongoose.Schema.Types.ObjectId, ref: 'FileUpload' },
  offerLetterOwnershipDeclaration: { type: mongoose.Schema.Types.ObjectId, ref: 'FileUpload' },
  otpVerification: Boolean,
  typesOfVerification: [String],
},{timestamps : true});

businessSchema.pre('save', async function(next) {
  try {
    const doc = this;
    const counterDoc = await Counter.findByIdAndUpdate(
      { _id: 'b_id' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const formattedId = counterDoc.seq.toString().padStart(5, '0'); 
    doc.b_id = formattedId;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Business', businessSchema);
