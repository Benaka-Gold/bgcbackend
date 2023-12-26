// src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();
const teamService = require('../services/teamService')
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login with phone number to receive OTP.
 *     tags: [Authentication]
 *     requestBody:
 *       required: 
 * 
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
router.post('/auth/login', authController.login);

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
router.post('/auth/verify-login', authController.verifyLogin);

router.get('/auth/getUserData',ensureAuthenticated,async (req,res)=>{
    let teamMembers
    if(req.user.teamId){
        const team = await teamService.getTeamById(req.user.teamId)
        teamMembers = team.members.filter(item => {
          return item._id.toString() === req.user._id.toString();
        })
      }

    res.status(200).json({user : req.user,team : teamMembers})
})

module.exports = router;
