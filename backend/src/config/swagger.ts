import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "Multi Store Stock Movement API",
      version: "1.0.0",
      description:
        "REST API for managing products, stores and inventory.",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Development Server",
      },
    ],

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./src/docs/*.ts",
    "./src/modules/**/*.routes.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );
};