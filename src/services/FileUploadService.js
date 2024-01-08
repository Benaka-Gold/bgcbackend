// Import necessary AWS SDK v3 packages
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fs = require("fs");
const path = require("path");
const FileUpload = require("../database/models/FileUpload");
const baseURL = process.env.BASE_URL || "http://localhost:3000";
// const { getSignedUrl } = require('@aws-sdk/cloudfront-signer');
// Initialize the S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

function getFilePath(entityType, entityName, fileName) {
  const folderPath = path.join("uploads", entityType, entityName);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  return path.join(folderPath, fileName);
}

exports.uploadFile = async (file, entityType, entityName, useS3 = true) => {
  const filePath = getFilePath(entityType, entityName, file.filename);
  const newFile = new FileUpload({
    fileName: file.filename,
    entityType,
    entityName,
    fileType: file.mimetype,
    localFilePath: useS3 ? null : filePath,
    s3FilePath: useS3
      ? `s3://${process.env.AWS_BUCKET_NAME}/${filePath}`
      : null,
  });

  if (useS3) {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME, 
      Body: fileStream,
      Key: filePath
    };

    try {
      console.log("Uploading")
      const s3Response = await s3Client.send(new PutObjectCommand(uploadParams));
      if(!s3Response.$metadata.httpStatusCode === 200){
        throw new Error('Could not upload file to S3')
      }
      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
      // console.log(`File uploaded successfully at ${s3Response.Location}`);
      newFile.s3FilePath = fileUrl;
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error("Error deleting the original file:", err);
        } else {
          console.log("Original file deleted successfully");
        }
      });
      const folder = path.join('uploads', entityType, entityName)
      fs.rmdirSync(folder, { recursive: true, force: true });
    } catch (err) {
      console.error("Error uploading file: ", err);
    }
  } else {
    // Copy the file to the new location
    fs.copyFile(file.path, filePath, async (err) => {
      if (err) throw err;

      // Delete the original file after successful copy
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error("Error deleting the original file:", err);
        } else {
          console.log("Original file deleted successfully");
        }
      });
    });
  }

  await newFile.save();
  return newFile;
};

exports.generateDownloadLink = async (fileId) => {
  const file = await FileUpload.findById(fileId);
  if (!file) throw new Error("File not found");
  const filePath = getFilePath(file.entityType, file.entityName, file.fileName);

  if (file.s3FilePath) {
    const downloadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filePath,
      Expires: 300, // link expiration time in seconds
    };
    return getSignedUrl(s3Client, new GetObjectCommand(downloadParams));
  } else {
    return `${baseURL}/${filePath}`;
  }
};


const privateKey = fs.readFileSync('/root/bgcBackend/src/utils/pk-APKARN4BD7SIMVSGVEQG.pem', 'utf8');

//  exports.generateDownloadLink = async (fileId) => {
//   const file = await FileUpload.findById(fileId);
//   if (!file) throw new Error("File not found");
//   const filePath = getFilePath(file.entityType, file.entityName, file.fileName);
  
//   if (file.s3FilePath) {
//     const urlToSign = `${process.env.CLOUDFRONT_DOMAIN}/${filePath}`;
//     const dateLessThan = Math.floor(Date.now() / 1000) + 300 * 60; // Unix timestamp
//     const signInput = {
//       url: urlToSign,
//       keyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID,
//       privateKey: privateKey,
//       dateLessThan: new Date(dateLessThan * 1000), // Convert Unix timestamp back to ISO for the function
//     };
//     try {
//       const signedUrl = getSignedUrl(signInput);
//       return signedUrl;
//     } catch (error){
//      console.log(error.message)
//     }
//   } else {
//     return `${baseURL}/${filePath}`;
//   }
// };

exports.deleteFile = async (fileId) => {
  const file = await FileUpload.findById(fileId);

  if (!file) throw new Error("File not found");
  const filePath = getFilePath(file.entityType, file.entityName, file.fileName);

  if (file.s3FilePath) {
    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filePath,
    };
    try {
      await s3Client.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
      console.error(error);
      throw error;
    }
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

exports.updateFile = async (
  fileId,
  newFile,
  entityType,
  entityName,
  useS3 = false
) => {
  const file = await FileUpload.findById(fileId);
  if (!file) throw new Error("File not found");

  const oldFilePath = getFilePath(file.entityType, file.entityName, file.fileName);
  const newFilePath = getFilePath(entityType, entityName, newFile.filename);

  if (file.s3FilePath) {
    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: oldFilePath,
    };
    try {
      await s3Client.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
      console.error(error);
    }
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
  file.s3FilePath = useS3 ? `s3://${process.env.AWS_BUCKET_NAME}/${newFilePath}` : null;

  if (useS3) {
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: newFilePath,
      Body: fs.createReadStream(newFile.path),
    };
    await s3Client.send(new PutObjectCommand(uploadParams));
  } else {
    fs.copyFile(newFile.path, newFilePath, (err) => {
      if (err) throw err;
    });
  }

  await file.save();
  return file;
};

exports.searchFiles = async (searchTerm, limit = 10, skip = 0) => {
  const regex = new RegExp(searchTerm, "i"); // case-insensitive search
  return FileUpload.find({ fileName: regex }).limit(limit).skip(skip);
};
