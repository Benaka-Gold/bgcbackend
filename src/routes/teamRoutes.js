const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { ensureAuthenticated, checkRole } = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         members:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *
 * /api/v1/teams:
 *    get:
 *     summary: Retrieve a list of teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: A list of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
  *               $ref: '#/components/schemas/Team'
 *               
 */
router.get('/teams', ensureAuthenticated, checkRole(['MD', 'HR','admin','Telecaller']), teamController.getTeams);

/**
 * @swagger
 * /api/v1/team/{id}:
 *   get:
 *     summary: Get a team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single team
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 */
router.get('/team/:id', ensureAuthenticated, checkRole(['MD', 'HR','admin']), teamController.getTeamById);

/**
 * @swagger
 * /api/v1/team:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       201:
 *         description: The created team
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 */
router.post('/team', ensureAuthenticated, checkRole(['MD','admin','hr']), teamController.createTeam);

/**
 * @swagger
 * /api/v1/team/{id}:
 *   put:
 *     summary: Update a team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       200:
 *         description: The updated team
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 */
router.put('/team/:id', ensureAuthenticated, checkRole(['MD', 'HR','admin']), teamController.updateTeam);

/**
 * @swagger
 * /api/v1/team/{id}:
 *   delete:
 *     summary: Delete a team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/team/:id', ensureAuthenticated, checkRole(['MD']), teamController.deleteTeam);

/**
 * @swagger
 * /api/v1/teams/by-type/{teamName}:
 *   get:
 *     summary: Get teams by team type name
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: teamName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of teams by team type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 *       400:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
router.get('/teams/by-type/:teamName', ensureAuthenticated, checkRole(['MD', 'HR', 'admin', 'Telecaller']), teamController.getTeamsByTeamType);


module.exports = router;
