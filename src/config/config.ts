import { IConfig } from './types';

export const config: IConfig = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  token: process.env.TOKEN,
  frontendUrl: process.env.FRONTEND_URL,
  dbConnectionName: process.env.DB_CONNECTION_NAME,
};
