// src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login with phone number to receive OTP.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: The user's phone number.
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 */
router.post('/api/v1/auth/login', authController.login);

/**
 * @swagger
 * /api/v1/auth/verify-login:
 *   post:
 *     summary: Verify OTP for login.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: The user's phone number.
 *               otp:
 *                 type: string
 *                 description: The OTP received on the phone.
 *     responses:
 *       200:
 *         description: Login successful.
 */
router.post('/api/v1/auth/verify-login', authController.verifyLogin);

module.exports = router;
