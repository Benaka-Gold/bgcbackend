const fileUploadService = require('../services/FileUploadService');

exports.uploadFileController = async (req, res) => {
  try {
    const { entityType, entityName } = req.body; // Extract entityType and entityName from the request
    const useS3 = process.env.USE_S3;
    const file = await fileUploadService.uploadFile(req.file,entityType,entityName, useS3);
    res.status(200).json({ success: true, data: file });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.downloadFileController = async (req, res) => {
  try {
    const link = await fileUploadService.generateDownloadLink(req.params.fileId);
    res.status(200).json({ success: true, data: link });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteFileController = async (req, res) => {
  try {
    console.log(req.params.fileId)
    const success = await fileUploadService.deleteFile(req.params.fileId);
    res.status(200).json({ success: true, data: success });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.listFilesController = async (req, res) => {
  try {
    const files = await fileUploadService.listFiles(req.query, req.query.limit, req.query.skip);
    res.status(200).json({ success: true, data: files });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateFileController = async (req, res) => {
  try {
    const { entityType, entityName } = req.body; // Extract entityType and entityName from the request
    const useS3 = false;
    const file = await fileUploadService.updateFile(req.params.fileId, req.file, entityType, entityName, useS3);
    res.status(200).json({ success: true, data: file });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchFilesController = async (req, res) => {
  try {
    const files = await fileUploadService.searchFiles(req.query.searchTerm, req.query.limit, req.query.skip);
    res.status(200).json({ success: true, data: files });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Don't forget to include your router configurations and middleware
