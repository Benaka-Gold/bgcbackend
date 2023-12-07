const express = require('express');
const divisionController = require('../controllers/divisionController');
const { ensureAuthenticated, checkRole } = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /divisions:
 *   post:
 *     summary: Create a new division.
 *     tags: [Divisions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               divisionName:
 *                 type: string
 *                 enum: [Bangalore, Rest of Karnataka, Andhra, Tamil Nadu, Telangana]
 *     responses:
 *       201:
 *         description: Division created successfully.
 */
router.post('/division',ensureAuthenticated,checkRole(['MD','admin','HR']), divisionController.createDivision);

/**
 * @swagger
 * /divisions:
 *   get:
 *     summary: Get all divisions.
 *     tags: [Divisions]
 *     responses:
 *       200:
 *         description: List of all divisions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Division'
 */
router.get('/divisions',ensureAuthenticated,checkRole(['MD','admin','HR','Telecaller','executive']), divisionController.getAllDivisions);

/**
 * @swagger
 * /divisions/{id}:
 *   get:
 *     summary: Get a division by ID.
 *     tags: [Divisions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the division.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Division data retrieved successfully.
 *       404:
 *         description: Division not found.
 */
router.get('/division/:id',ensureAuthenticated,checkRole(['MD','admin','HR']), divisionController.getDivisionById);

/**
 * @swagger
 * /divisions/{id}:
 *   put:
 *     summary: Update a division.
 *     tags: [Divisions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the division to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               divisionName:
 *                 type: string
 *                 enum: [Bangalore, Rest of Karnataka, Andhra, Tamil Nadu, Telangana]
 *     responses:
 *       200:
 *         description: Division updated successfully.
 *       404:
 *         description: Division not found.
 */
router.put('/division/:id',ensureAuthenticated,checkRole(['MD','admin','HR']), divisionController.updateDivision);

/**
 * @swagger
 * /divisions/{id}:
 *   delete:
 *     summary: Delete a division.
 *     tags: [Divisions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the division to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Division deleted successfully.
 *       404:
 *         description: Division not found.
 */
router.delete('/division/:id',ensureAuthenticated,checkRole(['MD','admin','HR']), divisionController.deleteDivision);

module.exports = router;
