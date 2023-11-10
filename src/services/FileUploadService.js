// src/services/fileUploadService.js
const FileUpload = require('../database/models/FileUpload');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');

aws.config.update({/* your AWS S3 config */ });
const s3 = new aws.S3();

exports.uploadFile = async (file, useS3 = false) => {
  const newFile = new FileUpload({
    fileName: file.originalname, // Changed from file.filename to file.originalname
    fileType: file.mimetype,
    localFilePath: useS3 ? null : file.path,
    s3FilePath: useS3 ? `s3://your-bucket/${file.originalname}` : null // Changed file.name to file.originalname
  });

  if (useS3) {
    const params = {
      Bucket: 'your-bucket',
      Key: file.name,
      Body: fs.createReadStream(file.path)
    };
    await s3.upload(params).promise();
  } else {
    const localPath = path.join(__dirname, '../../uploads', file.originalname);
    fs.copyFile(file.path, localPath, (err) => {
      if (err) throw err;
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
      Key: path.basename(file.s3FilePath),
      Expires: 60 // link expiration time in seconds
    };
    return s3.getSignedUrlPromise('getObject', params);
  } else {
    return path.join(__dirname, '../../uploads', file.fileName);
  }
};


exports.deleteFile = async (fileId) => {
  const file = await FileUpload.findById(fileId);
  if (!file) throw new Error('File not found');

  if (file.s3FilePath) {
    const params = {
      Bucket: 'your-bucket',
      Key: path.basename(file.s3FilePath)
    };
    await s3.deleteObject(params).promise();
  } else {
    fs.unlink(path.join(__dirname, '../../uploads', file.fileName), (err) => {
      if (err) throw err;
    });
  }

  await file.remove();
  return true; // indicate success
};

exports.listFiles = async (query = {}, limit = 10, skip = 0) => {
  return FileUpload.find(query).limit(limit).skip(skip);
};

exports.generatePreviewLink = exports.generateDownloadLink;


exports.updateFile = async (fileId, newFile, useS3 = false) => {
  const file = await FileUpload.findById(fileId);
  if (!file) throw new Error('File not found');

  // Delete the old file
  if (file.s3FilePath) {
    const params = {
      Bucket: 'your-bucket',
      Key: path.basename(file.s3FilePath)
    };
    await s3.deleteObject(params).promise();
  } else {
    fs.unlink(path.join(__dirname, '../../uploads', file.fileName), (err) => {
      if (err) throw err;
    });
  }


  file.fileName = newFile.name;
  file.fileType = newFile.mimetype;
  file.localFilePath = useS3 ? null : path.join(__dirname, '../../uploads', newFile.name);
  file.s3FilePath = useS3 ? `s3://your-bucket/${newFile.name}` : null;

  if (useS3) {
    const params = {
      Bucket: 'your-bucket',
      Key: newFile.name,
      Body: fs.createReadStream(newFile.path)
    };
    await s3.upload(params).promise();
  } else {
    fs.copyFile(newFile.path, path.join(__dirname, '../../uploads', newFile.name), (err) => {
      if (err) throw err;
    });
  }

  await file.save();
  return file;
};


/**
 * Searches files based on a search term in the file name.
 * @param {string} searchTerm - The term to search for in file names.
 * @param {number} limit - Limit the number of results.
 * @param {number} skip - Skip a number of results.
 * @returns {Promise<Array>} - The list of files that match the search term.
 */
exports.searchFiles = async (searchTerm, limit = 10, skip = 0) => {
  const regex = new RegExp(searchTerm, 'i');  // case-insensitive search
  return FileUpload.find({ fileName: regex }).limit(limit).skip(skip);
};
