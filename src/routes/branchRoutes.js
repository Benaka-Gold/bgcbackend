const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');
const {ensureAuthenticated,checkRole} = require('../middleware/authMiddleware')
/**
 * @swagger
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - branchName
 *         - location
 *         - branchManager
 *         - goldStock
 *         - goldMovementThreshold
 *       properties:
 *         branchName:
 *           type: string
 *           description: The name of the branch
 *         location:
 *           type: string
 *           description: The location of the branch
 *         branchManager:
 *           type: mongoose.Schema.Types.ObjectId
 *           description: The reference to the branch manager's user document
 *         goldStock:
 *           type: number
 *           description: The current stock of gold in the branch
 *         goldMovementThreshold:
 *           type: number
 *           description: The threshold for triggering gold movement to the head office
 *         employees:
 *           type: array
 *           items:
 *             type: mongoose.Schema.Types.ObjectId
 *           description: The list of employees working in the branch
 *   responses:
 *     NotFound:
 *       description: The specified resource was not found
 *     BadRequest:
 *       description: Bad request due to invalid syntax
 *     Unauthorized:
 *       description: Authentication is needed to get the requested response
 *     Forbidden:
 *       description: The client does not have access rights to the content
 */

/**
 * @swagger
 * tags:
 *   name: Branch
 *   description: API endpoints related to branches
 */

/**
 * @swagger
 * /branch:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       201:
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.post('/branch',ensureAuthenticated,checkRole(['MD','admin']),branchController.createBranch)

/**
 * @swagger
 * /branch/{id}:
 *   get:
 *     summary: Get a branch by ID
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The branch ID
 *     responses:
 *       200:
 *         description: The branch description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/branch/:id', ensureAuthenticated, branchController.getBranchById);

/**
 * @swagger
 * /branch/{id}:
 *   put:
 *     summary: Update a branch by ID
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The branch ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.put('/branch/:id', ensureAuthenticated, branchController.updateBranch);

/**
 * @swagger
 * /branch/{id}:
 *   delete:
 *     summary: Delete a branch by ID
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The branch ID to delete
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 *       400:
 *         description : Unauthorized
 *       404:
 *         description : Not found
 */
router.delete('/branch/:id', ensureAuthenticated, checkRole(['MD', 'admin']), branchController.deleteBranch);

router.get('/branches',ensureAuthenticated,branchController.getBranches);

module.exports = router;
