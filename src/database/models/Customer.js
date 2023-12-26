const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Counter = require('./Counter')

const customerSchema = new Schema({
  leadId : {
    type : Schema.Types.ObjectId,
    required : false,
    ref : 'Lead'
  },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  landline: String,
  altPhone : String,
  officePhone : String,
  email: String,
  sourceOfOrnaments: {
    type: String,
    enum: ['Purchased', 'Got As Gift', 'Acquired from parents', 'Others'],
    otherSource: String
  },
  employmentStatus: String,
  organizationStatus: String,
  annualIncome: Number,
  detailsOfJewellery: {
    type: String,
    enum: ['Physical Gold', 'Pledged Gold'],
  },
  natureOfOrnaments: {
    type: String,
    enum: ['Used', 'Bullion', 'Gold Coin', 'Others'],
    otherNature: String
  },
  totalNumberOfOrnaments: Number,
  jewelleryDetails: String,
  dateOfBirth : Date,
  dateOfPurchaseOrPledge: Date,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  maritalStatus: {
    type: String,
    enum: ['Married', 'Single', 'Divorced', 'Widowed'],
  },
  currentAddress: String,
  officeBusinessAddress: String,
  residentialStatus: String,
  panDetails: {
    number : String,
    file : {
      type : Schema.Types.ObjectId,
      ref : 'FileUpload'
    }
  },
  idProof: { 
    idType : String,
    number : String,
    file : {
      type: Schema.Types.ObjectId, ref: 'FileUpload' 
    }
  },
  addressProof: {
    idType : String,
    number : String,
    file : {
      type: Schema.Types.ObjectId, ref: 'FileUpload' 
    }
  },
  bankDetails: {
    bankName: String,
    accountHolderName: String,
    ifscMicr: String,
    branch: String,
    accountNumber : String,
    accountType : String
  },
  customerImage : { type: Schema.Types.ObjectId, ref: 'FileUpload' },
  source: String,
  verificationRequired: Boolean,
  typesOfVerification: [String],
  verificationFeedback: String,
  businessId : [{type : Schema.Types.ObjectId,ref : 'Business'}],
  c_id: { type: String, unique: true },
});

customerSchema.pre('save', async function(next) {
  try {
    const doc = this;
    const counterDoc = await Counter.findByIdAndUpdate(
      { _id: 'c_id' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const formattedId = counterDoc.seq.toString().padStart(5, '0'); 
    doc.c_id = formattedId;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Customer', customerSchema);
