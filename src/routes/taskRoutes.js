// src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { ensureAuthenticated, checkRole } = require('../middleware/authMiddleware');

/**
* @swagger
* components:
*   schemas:
*     Task: 
*       type: object
*       properties:
*         assignedTo:
*           type: string
*           description: User ID of the executive assigned to the task
*           example: 1234567890abcdef12345678
*         customerId:
*           type: string
*           description: Customer ID related to the task
*           example: abcdef123456789012345678
*         status:
*           type: string
*           description: Current status of the task
*           example: pending
*         description:
*           type: string
*           description: Description of the task
*           example: Initial customer contact for documentation
*       required:
*         - assignedTo
*         - status
*/

/**
* @swagger
* /api/v1/task:
*   post:
*     summary: Create a new task
*     tags: [Tasks]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Task'
*     responses:
*       201:
*         description: The created task
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Task'
*/
router.post('/task', ensureAuthenticated, taskController.create);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Retrieve a list of tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/tasks', ensureAuthenticated, taskController.getAllTasks);

/**
 * @swagger
 * /api/v1/task/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.get('/task/:id', ensureAuthenticated, taskController.getTaskById);

router.get('/executive-tasks', ensureAuthenticated, taskController.getTaskByExecutive);


/**
 * @swagger
 * /api/v1/task/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
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
*             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: The updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.put('/task/:id', ensureAuthenticated, taskController.updateTask);

/**
 * @swagger
 * /api/v1/task/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
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
router.delete('/task/:id', ensureAuthenticated, taskController.deleteTask);

router.post('/task/by-status',ensureAuthenticated,checkRole(['MD','admin','operations','accounts','executive','compliance']),taskController.getTasksByStatus);

router.get('/task/by-division',ensureAuthenticated,taskController.getTaskByDivision);

router.get('/tasks/compliance-verification/:id',ensureAuthenticated,taskController.complianceVerificationTaskData)


module.exports = router;
