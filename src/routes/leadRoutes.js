const leadController = require('../controllers/leadController')
const express = require('express')
const router = express.Router()
const { ensureAuthenticated, checkRole } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/v1/lead/getLeads:
 *   get:
 *     summary: Get all leads
 *     tags: [Leads]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized
 */ 
router.get('/lead/getLeads',ensureAuthenticated,checkRole(['MD','admin','operations','hr','Telecaller','compliance']),leadController.getLeads)

/**
 * @swagger
 * /api/v1/lead/create:
 *   post:
 *     summary: Create a new lead
 *     tags: [Leads]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *             
 *               name:
 *                 type: string
 *                 description: The lead's name.
 *               phoneNumber:
 *                 type: string
 *                 description: The lead's phone number.
 *               email:
 *                 type: string
 *                 description: The lead's email (optional).
 *               status:
 *                 type: string
 *                 description: The lead's status.
 *               assignedTeam:
 *                 type: string
 *                 description: The ID of the assigned team.
 *               purity:
 *                 type: string
 *                 description : Purity of the Gold
 *               weight:
 *                 type: number
 *                 description : Total weight of the gold
 *     responses:
 *       201:
 *         description: Lead created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 */
router.post('/lead/create',ensureAuthenticated,checkRole(['MD','admin','operations','hr','Telecaller','compliance']),leadController.createLead)

/**
 * @swagger
 * /api/v1/lead/getTeamLeads:
 *   post:
 *     summary: Get leads by team
 *     tags: [Leads]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamId:
 *                 type: id
 *                 description: The ID of the team to filter leads by.
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 */
router.post('/lead/getTeamLeads',ensureAuthenticated,checkRole(['MD','admin','operations','hr','Telecaller','compliance']),leadController.getLeadsByTeam)

/**
 * @swagger
 * /api/v1/lead/getLeadByUser:
 *   post:
 *     summary: Get lead by user
 *     tags: [Leads]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to filter leads by.
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 */
router.post('/lead/getLeadByUser',ensureAuthenticated,checkRole(['MD','admin','operations','hr','Telecaller','compliance']),leadController.getLeadByUser)


/**
 * @swagger
 * /api/v1/lead/update/{id}:
 *   put:
 *     summary: Update a lead by ID
 *     tags: [Leads]
 *     security:
 *       - BearerAuth: []
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
 *             $ref: '#/components/schemas/Lead'
 *     responses:
 *       200:
 *         description: The updated lead
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lead'
 */
router.put('/lead/update/:id', ensureAuthenticated, checkRole(['MD', 'HR','admin','Telecaller','compliance','accounts', 'executive']), leadController.updateLead);

/**
 * @swagger
 * /api/v1/lead/getFreshLeads/{teamId}:
 *   get:
 *     summary: Get fresh leads by team ID
 *     tags: [Leads]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the team to get fresh leads for.
 *     responses:
 *       200:
 *         description: Successful response with the list of fresh leads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lead'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/lead/getFreshLeads/:teamId',ensureAuthenticated,checkRole(['MD','HR','admin','Telecaller','compliance']),leadController.getFreshLeads);


router.get('/lead/getMoveLeads',ensureAuthenticated,checkRole(['HR','admin']),leadController.getMoveLeads);

router.get('/lead/bystatus/:status',ensureAuthenticated,checkRole(["MD",'operations','admin']),leadController.getLeadsByStatus);

router.get('/lead/confirmed-leads',ensureAuthenticated,checkRole(['Telecaller']),leadController.getAssignedLeadsStatus)

module.exports = router;