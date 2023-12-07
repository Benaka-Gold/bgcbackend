const express = require('express');
const fundController = require('../controllers/fundController');
const { ensureAuthenticated, checkRole } = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /funds:
 *   post:
 *     summary: Create a new fund.
 *     tags: [Funds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - fundType
 *               - relatedTo
 *               - onModel
 *             properties:
 *               amount:
 *                 type: number
 *               fundType:
 *                 type: string
 *               relatedTo:
 *                 type: string
 *               onModel:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fund created successfully.
 */
router.post('/fund', ensureAuthenticated, checkRole(['MD', 'admin', 'HR']), fundController.createFund);

/**
 * @swagger
 * /funds/{id}:
 *   get:
 *     summary: Get a fund by ID.
 *     tags: [Funds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the fund.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fund data retrieved successfully.
 *       404:
 *         description: Fund not found.
 */
router.get('/fund/:id', ensureAuthenticated, checkRole(['MD', 'admin', 'HR']), fundController.getFundById);

/**
 * @swagger
 * /funds/{id}:
 *   put:
 *     summary: Update a fund.
 *     tags: [Funds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the fund to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               fundType:
 *                 type: string
 *               relatedTo:
 *                 type: string
 *               onModel:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fund updated successfully.
 *       404:
 *         description: Fund not found.
 */
router.put('/fund/:id', ensureAuthenticated, checkRole(['MD', 'admin', 'HR']), fundController.updateFund);

/**
 * @swagger
 * /funds/{id}:
 *   delete:
 *     summary: Delete a fund.
 *     tags: [Funds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the fund to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fund deleted successfully.
 *       404:
 *         description: Fund not found.
 */
router.delete('/fund/:id', ensureAuthenticated, checkRole(['MD', 'admin', 'HR']), fundController.deleteFund);

router.get('/funds',ensureAuthenticated,checkRole(['MD','admin','HR']),fundController.getAllFunds)

module.exports = router;
