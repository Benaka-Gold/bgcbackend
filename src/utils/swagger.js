// src/utils/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BGC Backend API',
      version: '1.0.0',
      description: 'API Documentation for BGC Backend',
    },
    servers: [
      {
        url: 'http://192.168.1.109:4000/api/v1',
      },
    ],
  },
  apis: ['src/routes/*.js'], // path to your route files
};

const specs = swaggerJsDoc(options);
module.exports = specs;
