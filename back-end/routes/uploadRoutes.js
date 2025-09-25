const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'bars/'});
const { uploadImage } = require('../controllers/uploadController');

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload d'une image
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: URL de l'image uploadée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: "https://res.cloudinary.com/xxx/image/upload/xxx.jpg"
 *       500:
 *         description: Erreur serveur
 */

router.post('/', upload.single('image'), uploadImage);

module.exports = router;