const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const passport = require('passport');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * /api/login/register:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */
router.post('/register', loginController.registerUser);
module.exports = router;

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Authentifier un utilisateur
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentification réussie
 */
router.post('/', loginController.loginUser);

/**
 * @swagger
 * /api/login/register/bar:
 *   post:
 *     summary: Créer un utilisateur et son bar
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               name:
 *                 type: string
 *               firstname:
 *                 type: string
 *               nameBar:
 *                 type: string
 *               address:
 *                 type: string
 *               rate:
 *                 type: number
 *                 example: 4.5
 *               description:
 *                 type: string
 *               phone:
 *                 type: string
 *               website:
 *                 type: string
 *               openingHours:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *             required:
 *               - email
 *               - password
 *               - nameBar
 *               - address
 *     responses:
 *       '201':
 *         description: Utilisateur et bar créés
 */
router.post('/register/bar', upload.single('image'), loginController.registerBar);
module.exports = router;
/**
 * @swagger
 * /api/login/protected:
 *   get:
 *     summary: Rafraîchir le token d'authentification
 *     tags: [Login]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Accès autorisé
 *       401:
 *         description: Non autorisé
 */
router.get('/protected', auth, (req, res) => {
  res.status(200).json({
    message: '✅ Accès autorisé à la route protégée',
    user: req.user,
  });
});