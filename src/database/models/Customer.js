const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  source: String,
  verificationRequired: Boolean,
  typesOfVerification: [String],
  verificationFeedback: String,
  houseVerification :  { type: Schema.Types.ObjectId, ref: 'FileUpload' },
  authorizationLetter: { type: Schema.Types.ObjectId, ref: 'FileUpload' },
  noc: { type: Schema.Types.ObjectId, ref: 'FileUpload' },
  agreementOfPurchase: { type: Schema.Types.ObjectId, ref: 'FileUpload' },
  offerLetterOwnershipDeclaration: { type: Schema.Types.ObjectId, ref: 'FileUpload' },
  otpVerification: Boolean,
});

module.exports = mongoose.model('Customer', customerSchema);
