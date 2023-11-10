const express = require('express');
const router = express.Router();
const ornamentController = require('../controllers/ornamentController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /ornaments:
 *   post:
 *     summary: Create a new ornament
 *     tags: [Ornaments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ornament'
 *     responses:
 *       201:
 *         description: The created ornament
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ornament'
 *     security:
 *       - bearerAuth: []
 */
router.post('/ornaments', ensureAuthenticated, ornamentController.createOrnament);

/**
 * @swagger
 * /ornaments/customer/{customerId}:
 *   get:
 *     summary: Retrieve a list of ornaments for a specific customer
 *     tags: [Ornaments]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *           description: The customer ID to retrieve ornaments for
 *     responses:
 *       200:
 *         description: A list of ornaments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ornament'
 *     security:
 *       - bearerAuth: []
 */
router.get('/ornaments/customer/:customerId', ensureAuthenticated, ornamentController.getOrnamentsByCustomerId);

/**
 * @swagger
 * /ornaments/{id}:
 *   get:
 *     summary: Get a specific ornament by its ID
 *     tags: [Ornaments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the ornament to retrieve
 *     responses:
 *       200:
 *         description: A single ornament
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ornament'
 *     security:
 *       - bearerAuth: []
 */
router.get('/ornaments/:id', ensureAuthenticated, ornamentController.getOrnamentById);

/**
 * @swagger
 * /ornaments/{id}:
 *   put:
 *     summary: Update a specific ornament by its ID
 *     tags: [Ornaments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the ornament to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ornament'
 *     responses:
 *       200:
 *         description: The updated ornament
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ornament'
 *     security:
 *       - bearerAuth: []
 */
router.put('/ornaments/:id', ensureAuthenticated, ornamentController.updateOrnament);

/**
 * @swagger
 * /ornaments/{id}:
 *   delete:
 *     summary: Delete a specific ornament by its ID
 *     tags: [Ornaments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the ornament to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the ornament
 *     security:
 *       - bearerAuth: []
 */
router.delete('/ornaments/:id', ensureAuthenticated, ornamentController.deleteOrnament);

module.exports = router;
