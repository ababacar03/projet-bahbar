const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');
const barRoutes = require('./barRoutes');
const paymentRoutes = require('./paymentRoutes');
const testRoutes = require('./testRoutesProtected');
const uploadRoutes = require('./uploadRoutes');

// Import Swagger UI and Swagger options
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger/swaggerOptions');

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


router.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l’API !' });
});

router.use('/bars', barRoutes);
router.use('/users', userRoutes);
router.use('/login', loginRoutes);
router.use('/payment', paymentRoutes);
//router.use('/test', require('./test'));
router.use('/test', testRoutes);
module.exports = router;
router.use('/upload', uploadRoutes);
