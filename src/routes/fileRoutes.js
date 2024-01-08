const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const multer = require('multer');
const { ensureAuthenticated, checkRole } = require('../middleware/authMiddleware');
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * components:
 *   schemas:
 *     FileUploadResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message indicating the result of the upload operation.
 *         file:
 *           $ref: '#/components/schemas/File'
 *     File:
 *       type: object
 *       properties:
 *         filename:
 *           type: string
 *           description: The name of the uploaded file.
 *         path:
 *           type: string
 *           description: The path where the file is stored on the server.
 *         size:
 *           type: integer
 *           description: The size of the file in bytes.
 * 
 * /upload:
 *   post:
 *     summary: Upload a file
 *     tags: [File Operations]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload.
 *     responses:
 *       200:
 *         description: File uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FileUploadResponse'
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       403:
 *         description: Forbidden - User does not have the required role.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/upload',ensureAuthenticated,checkRole(['MD','HR','admin','operations','executive','accounts','compliance']), upload.single('file'), fileController.uploadFileController);

/**
 * @swagger
 * /download/{fileId}:
 *   get:
 *     summary: Download a file by its ID
 *     tags: [File Operations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the file to download.
 *     responses:
 *       200:
 *         description: File downloaded successfully.
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       403:
 *         description: Forbidden - User does not have the required role.
 *       404:
 *         description: Not Found - The file does not exist.
 *       500:
 *         description: Internal Server Error.
 * 
 */
router.get('/download/:fileId',ensureAuthenticated,checkRole(['MD','HR','admin','operations', 'executive','accounts','compliance']), fileController.downloadFileController);

/**
 * @swagger
 * /file/{fileId}:
 *   delete:
 *     summary: Delete a file by its ID
 *     tags: [File Operations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the file to delete.
 *     responses:
 *       200:
 *         description: File deleted successfully.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       403:
 *         description: Forbidden - User does not have the required role.
 *       404:
 *         description: Not Found - The file does not exist.
 *       500:
 *         description: Internal Server Error.
 * 
 */
router.delete('/file/:fileId',ensureAuthenticated,checkRole(['MD','HR','admin','operations', 'executive','compliance','accounts']), fileController.deleteFileController);

/**
 * @swagger
 * /files:
 *   get:
 *     summary: List all files
 *     tags: [File Operations]
 *     responses:
 *       200:
 *         description: A list of files.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/File'
 *       500:
 *         description: Internal Server Error.
 * 
 */
router.get('/files',ensureAuthenticated, fileController.listFilesController);

/**
 * @swagger
 * /update/{fileId}:
 *   put:
 *     summary: Update a file by its ID
 *     tags: [File Operations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the file to update.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The new file to upload.
 *     responses:
 *       200:
 *         description: File updated successfully.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       403:
 *         description: Forbidden - User does not have the required role.
 *       404:
 *         description: Not Found - The file does not exist.
 *       500:
 *         description: Internal Server Error.
 * 
 */
router.put('/update/:fileId',ensureAuthenticated,checkRole(['MD','HR','admin','operations','executive','compliance']), upload.single('file'), fileController.updateFileController);

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search for files
 *     tags: [File Operations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *           description: The query string to search for files.
 *     responses:
 *       200:
 *         description: A list of files that match the search criteria.
 *       401:
 *         description: Unauthorized - User not authenticated.
 *       403:
 *         description: Forbidden - User does not have the required role.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/search',ensureAuthenticated,checkRole(['MD','HR','admin','operations','compliance']), fileController.searchFilesController);

module.exports = router;