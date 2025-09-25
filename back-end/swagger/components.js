module.exports = {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  schemas: {
    User: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          example: '60c72b2f9e1d4e1a88f8a2c1'
        },
        username: {
          type: 'string',
          example: 'taph_aka_pape'
        },
        firstname: {
          type: 'string',
          example: 'moustapha'
        },
        name: {
          type: 'string',
          example: 'sarr'
        },
        email: {
          type: 'string',
          example: 'sarr@gmail.com'
        },
        password: {
          type: 'string',
          example: 'amiradiasarr'
        },
        createdAt: {
          type: 'string',
          format: 'date-time'
        }
      }
    },
    Bar: {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      example: '60c72b2f9b1e8c1a88e4c8f1'
    },
    name: {
      type: 'string',
      example: 'Le Square'
    },
    latitude: {
      type: 'number',
      example: 50.6345623
    },
    longitude: {
      type: 'number',
      example: 3.0609558
    },
    rate: {
      type: 'number',
      example: 4.2
    },
    description: {
      type: 'string',
      example: 'Le meilleur moyen de résister à la tentation.'
    },
    image: {
      type: 'string',
      description: 'Chemin d’accès à l’image statique',
      example: '/images/bars/squareBar.jpg'
    },
    address: {
      type: 'string',
      example: '67 Rue de Béthune, Lille'
    },
    phone: {
      type: 'string',
      example: '03 20 54 64 51'
    },
    website: {
      type: 'string',
      example: ''
    },
    openingHours: {
      type: 'string',
      example: '09h00 - 00h00'
    },
    manager: {
      type: 'array',
      items: {
        type: 'string'
      },
      example: []
    }
  }
}

  }
  
};
