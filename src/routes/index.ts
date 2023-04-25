import { Application } from 'express';
import { authRoutes } from './auth';
import { freightCompanyRoutes } from './freightCompany';
import { userRoutes } from './user';
import { geolocationRoutes } from './geolocation';

export const registerRoutes = (app: Application) => {
  app.use('/auth', authRoutes());
  app.use('/freight-company', freightCompanyRoutes());
  app.use('/user', userRoutes());
  app.use('/geolocation', geolocationRoutes());
};
