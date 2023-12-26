const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Business:
 *       type: object
 *       required:
 *         - taskId
 *         - leadId
 *         - customerId
 *         - totalAmount
 *         - transactionId
 *       properties:
 *         taskId:
 *           type: string
 *           description: Reference to a Task
 *         leadId:
 *           type: string
 *           description: Reference to a Lead
 *         customerId:
 *           type: string
 *           description: Reference to a Customer
 *         totalAmount:
 *           type: number
 *           description: Total amount of the transaction
 *         transactionId:
 *           type: string
 *           description: Reference to a Transaction
 */

/**
 * @swagger
 * /api/business:
 *   post:
 *     summary: Create a new business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Business'
 *     responses:
 *       201:
 *         description: Business created successfully
 *       500:
 *         description: Error creating business
 */
router.post('/business', ensureAuthenticated, businessController.createBusiness);

/**
 * @swagger
 * /api/business:
 *   get:
 *     summary: Get all businesses
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of businesses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Business'
 *       500:
 *         description: Error fetching businesses
 */
router.get('/business', ensureAuthenticated, businessController.getAllBusinesses);

/**
 * @swagger
 * /api/business/{id}:
 *   get:
 *     summary: Get a business by ID
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The business ID
 *     responses:
 *       200:
 *         description: Business object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Business'
 *       404:
 *         description: Business not found
 *       500:
 *         description: Error fetching business
 */
router.get('/business/:id', ensureAuthenticated, businessController.getBusinessById);

/**
 * @swagger
 * /api/business/{id}:
 *   put:
 *     summary: Update a business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The business ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Business'
 *     responses:
 *       200:
 *         description: Business updated successfully
 *       404:
 *         description: Business not found
 *       500:
 *         description: Error updating business
 */
router.put('/business/:id', ensureAuthenticated, businessController.updateBusiness);

/**
 * @swagger
 * /api/business/{id}:
 *   delete:
 *     summary: Delete a business
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The business ID
 *     responses:
 *       200:
 *         description: Business deleted successfully
 *       404:
 *         description: Business not found
 *       500:
 *         description: Error deleting business
 */
router.delete('/business/:id', ensureAuthenticated, businessController.deleteBusiness);

router.post('/business/period',ensureAuthenticated,businessController.getBusinessByPeriod);

router.get('/business/bill/:id',ensureAuthenticated,businessController.generateBill);

module.exports = router;
