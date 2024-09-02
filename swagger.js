import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Football League API',
      version: '1.0.0',
      description: 'API documentation for the Football League system',
    },
    servers: [
      {
        url: 'http://localhost:5001/api', // Make sure this matches your actual server URL
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    // Remove the global security requirement
  },
  apis: ['./src/routes/*.router.js', './src/models/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: false,
    },
  }));
};

export default swaggerDocs;