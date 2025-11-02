import express from 'express';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

import contactsRouter from './routers/Contacts.js';
import authRouter from './routers/auth.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export default function setupServer() {
  const app = express();

  // --- Middleware ---
  app.use(express.json());
  app.use(cookieParser());

  // --- Routes ---
  app.use('/api/auth', authRouter);
  app.use('/api/contacts', contactsRouter);

  // --- Swagger Docs Route ---
  const swaggerPath = path.resolve('docs/swagger.json');
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // --- Error Handlers ---
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
