const express = require('express');
const router = express.Router();
const barController = require('../controllers/barController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


/**
 * @swagger
 * tags:
 *   name: Bars
 *   description: Gestion des bars
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Bar:
 *       type: object
 *       required:
 *         - name
 *         - latitude
 *         - longitude
 *       properties:
 *         _id:
 *           type: string
 *           description: ID auto-généré du bar
 *         nameBar:
 *           type: string
 *           description: Nom du bar
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 *         rate:
 *           type: number
 *         description:
 *           type: string
 *         image:
 *           type: string
 *         address:
 *           type: string
 *         phone:
 *           type: string
 *         website:
 *           type: string
 *         openingHours:
 *           type: string
 *         manager:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *       example:
 *         nameBar: Bar La Guinguette
 *         latitude: 48.8566
 *         longitude: 2.3522
 *         rate: 4.5
 *         description: Ambiance conviviale
 *         image: https://image.url/bar.jpg
 *         address: 123 Rue du Bar, Paris
 *         phone: 0123456789
 *         website: https://bar.com
 *         openingHours: 18h - 2h
 *         manager: ["665a12d8f9f7c9e3a9f432b1"]
 */

/**
 * @swagger
 * /api/bars:
 *   post:
 *     summary: Créer un nouveau bar
 *     tags: [Bars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nameBar:
 *                 type: string
 *               latitude:
 *                 type: number
 *                 example: 48.8566
 *               longitude:
 *                 type: number
 *                 example: 2.3522
 *               rate:
 *                 type: number
 *                 example: 4.5
 *               description:
 *                 type: string
 *               address:
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
 *     responses:
 *       201:
 *         description: Bar créé avec succès
 *       404:
 *         description: Données invalides
 */

router.post('/', auth, upload.single('image'), barController.createBar);

/**
 * @swagger
 * /api/bars:
 *   get:
 *     summary: Récupérer tous les bars
 *     tags: [Bars]
 *     responses:
 *       200:
 *         description: Liste de tous les bars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bar'
 */
router.get('/', barController.getAllBars);

/**
 * @swagger
 * /api/bars/{id}:
 *   get:
 *     summary: Récupérer un bar par son ID
 *     tags: [Bars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du bar
 *     responses:
 *       200:
 *         description: Bar trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bar'
 *       404:
 *         description: Bar non trouvé
 */
router.get('/:id', barController.getBarById);

/**
 * @swagger
 * /api/bars/{id}:
 *   put:
 *     summary: Mettre à jour un bar
 *     tags: [Bars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du bar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bar'
 *     responses:
 *       200:
 *         description: Bar mis à jour
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Bar non trouvé
 */
router.put('/:id', barController.updateBar);

/**
 * @swagger
 * /api/bars/{id}:
 *   delete:
 *     summary: Supprimer un bar
 *     tags: [Bars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du bar
 *     responses:
 *       200:
 *         description: Bar supprimé
 *       404:
 *         description: Bar non trouvé
 */
router.delete('/:id', barController.deleteBar);

module.exports = router;
