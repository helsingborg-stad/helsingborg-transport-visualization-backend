import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const apiDocs = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
    },
  },
  apis: ['./swagger/*.{json,yml}', './build/routes/**/*.{js,ts}'],
});

export default (app: Application) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(apiDocs, { explorer: true }),
  );
};
