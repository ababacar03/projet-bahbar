const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth'); // ← assure-toi qu'il est bien importé

//ajouter un bar à un utilisateur
/**
 * @swagger
 * /api/users/favorites/{barId}:
 *   post:
 *     summary: Ajouter un bar aux favoris de l'utilisateur connecté
 *     tags: [Favoris]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: barId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du bar à ajouter en favori
 *     responses:
 *       200:
 *         description: Bar ajouté aux favoris
 *       404:
 *         description: Erreur lors de l'ajout
 *       401:
 *         description: Non autorisé
 */
router.post('/favorites/:barId', auth, userController.addFavoriteBar);

//supprimer un bar des favoris de l'utilisateur
/**
 * @swagger
 * /api/users/favorites/{barId}:
 *   delete:
 *     summary: Supprimer un bar des favoris de l'utilisateur connecté
 *     tags: [Favoris]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: barId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du bar à retirer des favoris
 *     responses:
 *       200:
 *         description: Bar retiré des favoris
 *       404:
 *         description: Erreur lors de la suppression
 *       401:
 *         description: Non autorisé
 */

router.delete('/favorites/:barId', auth, userController.removeFavoriteBar);

//recupérer les favoris de l'utilisateur connecté
/**
 * @swagger
 * /api/users/favorites:
 *   get:
 *     summary: Récupérer la liste des bars favoris de l'utilisateur connecté
 *     tags: [Favoris]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des bars favoris
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bar'
 *       401:
 *         description: Non autorisé
 */
router.get('/favorites', auth,  userController.getFavoriteBars);


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer un nouve utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateu créé
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 */
router.delete('/:id', userController.deleteUser);


module.exports = router;
