const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  landline: String,
  email: { type: String, unique: true },
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
  permanentAddress: String,
  officeBusinessAddress: String,
  residentialStatus: String,
  panDetails: String,
  passportNumber: String,
  idProof: { type: Schema.Types.ObjectId, ref: 'FileUpload' },
  idProofNumber: String,
  addressProof: { type: Schema.Types.ObjectId, ref: 'FileUpload' },
  addressProofNumber: String,
  bankDetails: {
    bankName: String,
    accountHolderName: String,
    ifscMicr: String,
    branch: String
  },
  source: String,
  verificationRequired: Boolean,
  typesOfVerification: [String],
  verificationFeedback: String,
  authorizationLetter: { type: Schema.Types.ObjectId, ref: 'FileUpload' },
  noc: { type: Schema.Types.ObjectId, ref: 'FileUpload' },
  agreementOfPurchase: { type: Schema.Types.ObjectId, ref: 'FileUpload' },
  offerLetterOwnershipDeclaration: { type: Schema.Types.ObjectId, ref: 'FileUpload' },
  otpVerification: Boolean,
});

module.exports = mongoose.model('Customer', customerSchema);
