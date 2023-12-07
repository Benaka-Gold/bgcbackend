const fs = require('fs');
const path = require('path');
const FileUpload = require('../database/models/FileUpload'); // Adjust the path as needed

const uploadsDir = path.join(__dirname, '../../uploads'); // Adjust the path to your uploads directory

async function cleanupOrphanedFiles(directory = uploadsDir) {
  try {
    const filesAndDirs = fs.readdirSync(directory);

    for (const item of filesAndDirs) {
      const itemPath = path.join(directory, item);
      if (fs.statSync(itemPath).isFile()) {
        const relativeFilePath = path.relative(uploadsDir, itemPath);
        console.log(`Checking file: ${relativeFilePath}`); // Log the relative file path

        const fileInDb = await FileUpload.findOne({ localFilePath: `uploads/`+relativeFilePath });
        if (!fileInDb) {
          console.log(`Deleting orphaned file: ${relativeFilePath}`);
          fs.unlinkSync(itemPath);
        } else {
          console.log(`File found in DB: ${relativeFilePath}`);
        }
      } else if (fs.statSync(itemPath).isDirectory()) {
        console.log(`Entering directory: ${itemPath}`); // Log when entering a directory
        cleanupOrphanedFiles(itemPath);
      }
    }
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}

cleanupOrphanedFiles();
