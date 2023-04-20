import { Application } from 'express';
import { authRoutes } from './auth';

export const registerRoutes = (app: Application) => {
  app.use('/auth', authRoutes());
};
