const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: The created customer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *     security:
 *       - ApiKeyAuth: []
 */
router.post('/customers', ensureAuthenticated, customerController.createCustomer);

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Retrieve a list of customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *     security:
 *       - ApiKeyAuth: []
 */
router.get('/customers', ensureAuthenticated, customerController.getCustomers);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single customer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *     security:
 *       - ApiKeyAuth: []
 */
router.get('/customers/:id', ensureAuthenticated, customerController.getCustomerById);

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update a customer by ID
 *     tags: [Customers]
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
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: The updated customer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *     security:
 *       - ApiKeyAuth: []
 */
router.put('/customers/:id', ensureAuthenticated, customerController.updateCustomer);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 *     security:
 *       - ApiKeyAuth: []
 */
router.delete('/customers/:id', ensureAuthenticated, customerController.deleteCustomer);

/**
 * @swagger
 * /customers/search:
 *   get:
 *     summary: Search for customers by query
 *     tags: [Customers]
 *     parameters:
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *         description: Customer phone number to search
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Customer name to search
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Customer email to search
 *     responses:
 *       200:
 *         description: Search results matching query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *     security:
 *       - ApiKeyAuth: []
 */
router.get('/customers/search', ensureAuthenticated, customerController.searchCustomers);

router.get('/customer/verify-otp/:id',ensureAuthenticated,customerController.sendOTP)

router.post('/customer/verify-otp',ensureAuthenticated,customerController.verifyOTP)

module.exports = router;

/**
* @swagger
* components:
*  schemas:
*    BankDetails:
*      type: object
*      properties:
*        bankName:
*          type: string
*        accountHolderName:
*          type: string
*        ifscMicr:
*          type: string
*        branch:
*          type: string
*        accountType:
*          type: string

*    Customer:
*      type: object
*      required:
*        - name
*        - phoneNumber
*        - employmentStatus
*        - organizationStatus
*        - annualIncome
*        - detailsOfJewellery
*        - natureOfOrnaments
*        - totalNumberOfOrnaments
*        - gender
*        - maritalStatus
*        - currentAddress
*        - residentialStatus
*        - panDetails
*      properties:
*        name:
*          type: string
*        phoneNumber:
*          type: string
*        landline:
*          type: string
*          nullable: true
*        altPhone:
*          type: string
*        officePhone:
*          type: string
*        email:
*          type: string
*          format: email
*        sourceOfOrnaments:
*          type: string
*          enum: [Purchased, Got As Gift, Acquired from parents, Others]
*        employmentStatus:
*          type: string
*        organizationStatus:
*          type: string
*        annualIncome:
*          type: number
*        detailsOfJewellery:
*          type: string
*          enum: [Physical Gold, Pledged Gold]
*        natureOfOrnaments:
*          type: string
*          enum: [Used, Bullion, Gold Coin, Others]
*        totalNumberOfOrnaments:
*          type: integer
*        jewelleryDetails:
*          type: string
*        dateOfPurchaseOrPledge:
*          type: string
*          format: date
*        gender:
*          type: string
*          enum: [Male, Female, Other]
*        maritalStatus:
*          type: string
*          enum: [Married, Single, Divorced, Widowed]
*        currentAddress:
*          type: string
*        officeBusinessAddress:
*          type: string
*          nullable: true
*        residentialStatus:
*          type: string
*        panDetails:
*          type: string
*        idProof:
*          type: string
*          nullable: true # Assuming this is an ID reference to a FileUpload
*        idProofNumber:
*          type: string
*        addressProof:
*          type: string
*          nullable: true # Assuming this is an ID reference to a FileUpload
*        addressProofNumber:
*          type: string
*        bankDetails:
*          $ref: '#/components/schemas/BankDetails'
*        source:
*          type: string
*        verificationRequired:
*          type: boolean
*        typesOfVerification:
*          type: array
*          items:
*            type: string
*            enum: [By Phone, House Verification, Office/Business Verification, Referral Check]
*        verificationFeedback:
*          type: string
*          nullable: true
*        authorizationLetter:
*          type: string
*          nullable: true # Assuming this is an ID reference to a FileUpload
*        noc:
*          type: string
*          nullable: true # Assuming this is an ID reference to a FileUpload
*        agreementOfPurchase:
*          type: string
*          nullable: true # Assuming this is an ID reference to a FileUpload
*        offerLetterOwnershipDeclaration:
*         type: string
*         nullable: true # Assuming this is an ID reference to a FileUpload
*        otpVerification:
*          type: boolean
*/