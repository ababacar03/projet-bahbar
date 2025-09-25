// swagger/swaggerOptions.js

let swaggerSpec;

if (process.env.NODE_ENV === 'test') {
  // On retourne un objet vide pendant les tests pour éviter l’erreur Jest
  swaggerSpec = {};
} else {
  const swaggerJsdoc = require('swagger-jsdoc');

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API du Projet BahBar',
        version: '1.0.0',
        description: "Documentation Swagger de l'API BahBar",
      },
      components: require('./components'),
    },
    apis: [__dirname + '/../routes/*.js'],
  };

  swaggerSpec = swaggerJsdoc(options);
}

module.exports = swaggerSpec;
