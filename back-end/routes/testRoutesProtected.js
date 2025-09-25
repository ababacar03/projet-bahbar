const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

/**
 * @swagger
 * tags:
 *   name: Test
 *   description: Test des rôles d'accès
 */

//route pour les users authentifiés
/**
 * @swagger
 * /api/test/user-only:
 *   get:
 *     summary: Accès réservé aux users
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Accès autorisé (user)
 *       403:
 *         description: Accès interdit
 */
router.get('/user-only', auth, checkRole('user'), (req, res) => {
  res.status(200).json({
    message: 'Bienvenue User',
    user: req.user
  });
});

//route pour les managers authentifiés
/**
 * @swagger
 * /api/test/manager-only:
 *   get:
 *     summary: Accès réservé aux managers
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Accès autorisé
 *       403:
 *         description: Accès refusé
 */
router.get('/manager-only', auth, checkRole('manager'), (req, res) => {
  res.status(200).json({
    message: 'Bienvenue Manager',
    user: req.user
  });
});

// Route accessible uniquement aux `admins`
/**
 * @swagger
 * /api/test/admin-only:
 *   get:
 *     summary: Accès réservé aux admins
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Accès autorisé (admin)
 *       403:
 *         description: Accès interdit
 */

router.get('/admin-only', auth, checkRole('admin'), (req, res) => {
  res.status(200).json({
    message: 'Bienvenue Admin',
    user: req.user
  });
});

// Route accessible aux `admins` ET `managers`
/**
 * @swagger
 * /api/test/admin-or-manager:
 *   get:
 *     summary: Accès réservé aux managers ou admins
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Accès autorisé (admin/manager)
 *       403:
 *         description: Accès interdit
 */

router.get('/admin-or-manager', auth, checkRole('admin', 'manager'), (req, res) => {
  res.status(200).json({
    message: 'Bienvenue Admin ou Manager',
    user: req.user
  });
});

module.exports = router;
