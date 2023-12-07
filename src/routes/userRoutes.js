// To be deleted in production version
const User = require('../database/models/User')
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const {ensureAuthenticated} = require('../middleware/authMiddleware')


router.post('/user/create',ensureAuthenticated,userController.createUser)
/**
 * @swagger
 * /api/v1/users/{teamId}:
 *   get:
 *     summary: Retrieve a list of users by team ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the team
 *     responses:
 *       200:
 *         description: A list of users associated with the specified team ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '../database/models.User'
 *       401:
 *         description: Unauthorized access, user needs to be authenticated
 *       404:
 *         description: No users found for the specified team ID
 */
router.get('/users/:teamId',ensureAuthenticated,userController.getUsersByTeam)

router.get('/user/getUserData',ensureAuthenticated,(req,res)=>{res.status(200).json(req.user)})

router.get('/user/:role',ensureAuthenticated,userController.getUserByRole)

module.exports = router;