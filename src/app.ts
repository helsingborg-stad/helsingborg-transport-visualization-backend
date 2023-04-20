import 'reflect-metadata';
import 'module-alias/register';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from '@config';
import devRequestLogger from '@utils/devRequestLogger';
import apiDocs from '@services/swagger';
import { initDB } from '@services/database';
import { registerRoutes } from './domains';

export default async () => {
  await initDB();

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());

  if (config.env === 'development') {
    apiDocs(app);
    app.use(devRequestLogger);
  }

  registerRoutes(app);

  app.get('/health', (_: Request, res: Response) => {
    res.status(200).send('ok');
  });

  return app;
};
