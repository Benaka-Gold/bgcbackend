const mongoose = require('mongoose');

const fileUploadSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  entityType: { // New field to store the type of entity (e.g., 'employee', 'customer')
    type: String,
    required: true
  },
  entityName: { // New field to store the name of the entity
    type: String,
    required: true
  },
  localFilePath: String,
  s3FilePath: String,
  fileType: String,
}, { timestamps: true });

module.exports = mongoose.model('FileUpload', fileUploadSchema);
