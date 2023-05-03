import { Application } from 'express';
import { authRoutes } from './auth';
import { zoneRoutes } from './zone';

export const registerRoutes = (app: Application) => {
  app.use('/auth', authRoutes());
  app.use('/zones', zoneRoutes());
};
