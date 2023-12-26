const express = require('express');
const router = express.Router();
const goldRateController = require('../controllers/goldRateController');
const {ensureAuthenticated} = require('../middleware/authMiddleware')
/**
 * @swagger
 * tags:
 *   name: Gold Rates
 *   description: The gold rates managing API
 */

/**
 * @swagger
 * /gold-rate:
 *   post:
 *     summary: Create a new gold rate
 *     tags: [Gold Rates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - purity
 *               - price
 *             properties:
 *               purity:
 *                 type: string
 *                 description: The purity of the gold
 *               price:
 *                 type: number
 *                 description: The price of the gold
 *     responses:
 *       201:
 *         description: Gold rate created successfully
 *       500:
 *         description: Server error
 */
router.post('/gold-rate',ensureAuthenticated, goldRateController.createGoldRate);

/**
 * @swagger
 * /gold-rate:
 *   get:
 *     summary: Get all gold rates
 *     tags: [Gold Rates]
 *     responses:
 *       200:
 *         description: List of all gold rates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GoldRate'
 *       500:
 *         description: Server error
 */
router.get('/gold-rate',ensureAuthenticated, goldRateController.getGoldRates);

/**
 * @swagger
 * /gold-rate/{id}:
 *   get:
 *     summary: Get a gold rate by ID
 *     tags: [Gold Rates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gold rate id
 *     responses:
 *       200:
 *         description: Gold rate object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GoldRate'
 *       404:
 *         description: Gold rate not found
 *       500:
 *         description: Server error
 */
router.get('/gold-rate/:id',ensureAuthenticated, goldRateController.getGoldRateById);

/**
 * @swagger
 * /gold-rate/{id}:
 *   put:
 *     summary: Update a gold rate
 *     tags: [Gold Rates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gold rate id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               purity:
 *                 type: string
 *                 description: The purity of the gold
 *               price:
 *                 type: number
 *                 description: The price of the gold
 *     responses:
 *       200:
 *         description: Gold rate updated successfully
 *       404:
 *         description: Gold rate not found
 *       500:
 *         description: Server error
 */
router.put('/gold-rate/:id',ensureAuthenticated, goldRateController.updateGoldRate);

router.put('/gold-rate-update24k',ensureAuthenticated,goldRateController.update24kRate)

/**
 * @swagger
 * /gold-rate/{id}:
 *   delete:
 *     summary: Delete a gold rate
 *     tags: [Gold Rates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gold rate id
 *     responses:
 *       200:
 *         description: Gold rate deleted successfully
 *       404:
 *         description: Gold rate not found
 *       500:
 *         description: Server error
 */
router.delete('/gold-rate/:id',ensureAuthenticated, goldRateController.deleteGoldRate);

/**
 * @swagger
 * components:
 *   schemas:
 *     GoldRate:
 *       type: object
 *       required:
 *         - purity
 *         - price
 *       properties:
 *         purity:
 *           type: string
 *           description: The purity of the gold
 *         price:
 *           type: number
 *           description: The price of the gold
 *       example:
 *         purity: "22K"
 *         price: 4500
 */

module.exports = router;
