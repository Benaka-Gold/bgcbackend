// src/database/models/FileUpload.js
const mongoose = require('mongoose');

const fileUploadSchema = new mongoose.Schema({
  fileName: {
    type : String,
    required : true
  },
  localFilePath: String,
  s3FilePath: String,
  fileType: String,
},{timestamps : true});

module.exports = mongoose.model('FileUpload', fileUploadSchema);
