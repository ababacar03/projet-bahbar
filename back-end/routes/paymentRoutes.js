const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');
const multer = require('multer');
const checkRole = require('../middleware/checkRole');
const upload = multer();

/**
 * @swagger
 * /api/payment:
 *   post:
 *     summary: Créer une session Stripe Checkout
 *     tags: [Payment]
 *     security:
 *           - bearerAuth: []
 *     requestBody:
 *      
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *               barId:
 *                 type: string
 *               barName:
 *                 type: string
 *     responses:
 *       200:
 *         description: URL Stripe renvoyée
 */
router.post('/', auth, checkRole('user'), upload.none(), paymentController.paymentSession);
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4N2UzNWRiOWQzZGQ4MjdkOWRiZmQyMyIsImVtYWlsIjoic2FycjI2QGdtYWlsLmNvbSIsInJvbGUiOnsiX2lkIjoiNjg3Y2RhODU5OWQyNDc3ZTczYjBjZGNmIiwicm9sZUFkbWluIjpmYWxzZSwicm9sZU1hbmFnZXIiOmZhbHNlLCJyb2xlVXNlciI6dHJ1ZSwiX192IjowfSwiaWF0IjoxNzUzMTA2Mzk5LCJleHAiOjE3NTMxMDk5OTl9.k1pySA9xhqdzn6URIHZ1PzFupyKczAf0zo2A-FigmkA
module.exports = router;
//barid: 6862a597d7a927ef9864d9aa
