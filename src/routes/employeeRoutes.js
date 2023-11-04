// src/routes/employeeRoutes.js

const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { ensureAuthenticated, checkRole } = require('../middleware/authMiddleware');

/**
* @swagger
*  components: {
*    schemas: {
*        Employee: {
*            type: "object",
*            properties: {
*                empCode: {
*                    type: "string",
*                    description: "The employee code",
*                    example: "EMP12345"
*                },
*                firstName: {
*                    type: "string",
*                    description: "The employee's first name",
*                    example: "John"
*                },
*                lastName: {
*                    type: "string",
*                    description: "The employee's last name",
*                    example: "Doe"
*                },
*                email: {
*                    type: "string",
*                    description: "The employee's email address",
*                    example: "john.doe@example.com"
*                },
*                phoneNumber: {
*                    type: "string",
*                    description: "The employee's phone number",
*                    example: "1234567890"
*                },
*                dateOfBirth: {
*                    type: "string",
*                    format: "date",
*                    description: "The employee's date of birth",
*                    example: "1990-01-01"
*                },
*                address: {
*                    type: "object",
*                    properties: {
*                        street: { type: "string", example: "123 Main St" },
*                        city: { type: "string", example: "Springfield" },
*                        state: { type: "string", example: "IL" },
*                        zipCode: { type: "string", example: "62704" },
*                        country: { type: "string", example: "USA" }
*                    }
*                },
*                photo: {
*                    type: "string",
*                    format: "binary",
*                    description: "The employee's photo file"
*                },
*                documents: {
*                    type: "array",
*                    items: {
*                        type: "object",
*                        properties: {
*                            docType: { type: "string", example: "Degree Certificate" },
*                            docFile: { type: "string", format: "binary" }
*                        }
*                    }
*                },
*                position: {
*                    type: "string",
*                    description: "The employee's position",
*                    example: "Software Engineer"
*                },
*                department: {
*                    type: "string",
*                    description: "The employee's department",
*                    example: "Engineering"
*                },
*                dateHired: {
*                    type: "string",
*                    format: "date-time",
*                    description: "The date the employee was hired",
*                    example: "2022-01-15T09:00:00Z"
*                },
*                userId: {
*                    type: "string",
*                    description: "The ID of the associated user document",
*                    example: "614c40b38c5bdc2a5867b3b0"
*                }
*            },
*            required: ["empCode", "firstName", "lastName", "email", "phoneNumber", "dateOfBirth"]
*        }
*    }
*}
 * 
 * /api/v1/employee:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: The created employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
router.post('/', ensureAuthenticated, checkRole(['MD', 'HR']), employeeController.createEmployee);

/**
 * @swagger
 * /api/v1/employees:
 *   get:
 *     summary: Retrieve a list of employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get('/employees', ensureAuthenticated, checkRole(['MD', 'HR', 'admin']), employeeController.getEmployees);

/**
 * @swagger
 * /api/v1/employee/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
router.get('/:id', ensureAuthenticated, checkRole(['MD', 'HR', 'admin']), employeeController.getEmployee);

/**
 * @swagger
 * /api/v1/employee/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     tags: [Employees]
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
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: The updated employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
router.put('/:id', ensureAuthenticated, checkRole(['MD', 'HR']), employeeController.updateEmployee);

/**
 * @swagger
 * /api/v1/employee/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employees]
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
router.delete('/:id', ensureAuthenticated, checkRole(['MD', 'HR']), employeeController.deleteEmployee);

module.exports = router;
