const express = require('express');
const router = express.Router();
const teamTypeController = require('../controllers/teamTypeController.js');
const { ensureAuthenticated, checkRole } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Team Types
 *   description: Management of Team Types
 */

/**
 * @swagger
 * /team-types:
 *   get:
 *     tags: [Team Types]
 *     summary: Retrieve a list of team types
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of team types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TeamType'
 */
router.get('/team-types', ensureAuthenticated, teamTypeController.getTeamTypes);

/**
 * @swagger
 * /team-type/{id}:
 *   get:
 *     tags: [Team Types]
 *     summary: Get a team type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A single team type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamType'
 */
router.get('/team-type/:id', ensureAuthenticated, checkRole(['MD','admin','operations','hr']), teamTypeController.getTeamTypeById);

/**
 * @swagger
 * /api/v1/team-type:
 *   post:
 *     tags: [Team Types]
 *     summary: Create a new team type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamType'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: The created team type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamType'
 */
router.post('/team-type', ensureAuthenticated, checkRole(['MD','admin']), teamTypeController.createTeamType);

/**
 * @swagger
 * /api/v1/team-types/update/{id}:
 *   put:
 *     tags: [Team Types]
 *     summary: Update a team type by ID
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
 *             $ref: '#/components/schemas/TeamType'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The updated team type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamType'
 */
router.put('/team-type/update/:id', ensureAuthenticated, checkRole(['MD','admin']), teamTypeController.updateTeamType);

/**
 * @swagger
 * /api/v1/team-types/delete/{id}:
 *   delete:
 *     tags: [Team Types]
 *     summary: Delete a team type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/team-type/delete/:id', ensureAuthenticated, checkRole(['MD','admin']), teamTypeController.deleteTeamType);

module.exports = router;
