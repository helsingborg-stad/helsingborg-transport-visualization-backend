import { Application } from 'express';
import { authRoutes } from './auth';
import { zoneRoutes } from './zone';
import { filterRoutes } from './filter';
import { organisationRoutes } from './organisation';

export const registerRoutes = (app: Application) => {
  app.use('/auth', authRoutes());
  app.use('/zones', zoneRoutes());
  app.use('/filters', filterRoutes());
  app.use('/organisations', organisationRoutes());
};
