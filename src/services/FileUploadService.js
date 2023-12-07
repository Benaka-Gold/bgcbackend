const FileUpload = require('../database/models/FileUpload');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const baseURL = process.env.BASE_URL || 'http://localhost:3000';

aws.config.update({/* your AWS S3 config */});
const s3 = new aws.S3();

function getFilePath(entityType, entityName, fileName) {
  const folderPath = path.join('uploads', entityType, entityName);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  return path.join(folderPath, fileName);
}

exports.uploadFile = async (file, entityType, entityName, useS3 = false) => {
  const filePath = getFilePath(entityType, entityName, file.filename);
  
  const newFile = new FileUpload({
    fileName: file.filename,
    entityType,
    entityName,
    fileType: file.mimetype,
    localFilePath: useS3 ? null : filePath,
    s3FilePath: useS3 ? `s3://your-bucket/${file.filename}` : null
  });

  if (useS3) {
    // S3 upload logic
  } else {
    // Copy the file to the new location
    fs.copyFile(file.path, filePath, async (err) => {
      if (err) throw err;

      // Delete the original file after successful copy
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error('Error deleting the original file:', err);
        } else {
          console.log('Original file deleted successfully');
        }
      });
    });
  }

  await newFile.save();
  return newFile;
};


exports.generateDownloadLink = async (fileId) => {
  const file = await FileUpload.findById(fileId);
  if (!file) throw new Error('File not found');

  if (file.s3FilePath) {
    const params = {
      Bucket: 'your-bucket',
      Key: file.fileName,
      Expires: 60 // link expiration time in seconds
    };
    return s3.getSignedUrlPromise('getObject', params);
  } else {
    const filePath = getFilePath(file.entityType, file.entityName, file.fileName);
    return `${baseURL}/${filePath}`;
  }
};

exports.deleteFile = async (fileId) => {
  const file = await FileUpload.findById(fileId);
  if (!file) throw new Error('File not found');

  const filePath = getFilePath(file.entityType, file.entityName, file.fileName);

  if (file.s3FilePath) {
    const params = {
      Bucket: 'your-bucket',
      Key: file.fileName
    };
    await s3.deleteObject(params).promise();
  } else {
    fs.unlink(filePath, (err) => {
      if (err) console.error(err);
    });
  }

  await FileUpload.findByIdAndDelete(fileId);
  return true; // indicate success
};

exports.listFiles = async (query = {}, limit = 10, skip = 0) => {
  return FileUpload.find(query).limit(limit).skip(skip);
};

exports.updateFile = async (fileId, newFile, entityType, entityName, useS3 = false) => {
  const file = await FileUpload.findById(fileId);
  if (!file) throw new Error('File not found');

  const oldFilePath = getFilePath(file.entityType, file.entityName, file.fileName);
  const newFilePath = getFilePath(entityType, entityName, newFile.filename);

  // Delete the old file
  if (file.s3FilePath) {
    const params = {
      Bucket: 'your-bucket',
      Key: file.fileName
    };
    await s3.deleteObject(params).promise();
  } else {
    fs.unlink(oldFilePath, (err) => {
      if (err) throw err;
    });
  }

  file.fileName = newFile.filename;
  file.entityType = entityType;
  file.entityName = entityName;
  file.fileType = newFile.mimetype;
  file.localFilePath = useS3 ? null : newFilePath;
  file.s3FilePath = useS3 ? `s3://your-bucket/${newFile.filename}` : null;

  if (useS3) {
    const params = {
      Bucket: 'your-bucket',
      Key: newFile.filename,
      Body: fs.createReadStream(newFile.path)
    };
    await s3.upload(params).promise();
  } else {
    fs.copyFile(newFile.path, newFilePath, (err) => {
      if (err) throw err;
    });
  }

  await file.save();
  return file;
};

exports.searchFiles = async (searchTerm, limit = 10, skip = 0) => {
  const regex = new RegExp(searchTerm, 'i');  // case-insensitive search
  return FileUpload.find({ fileName: regex }).limit(limit).skip(skip);
};

