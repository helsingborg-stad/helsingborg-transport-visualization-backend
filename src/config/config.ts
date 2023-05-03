import { IConfig } from './types';

export const config: IConfig = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  token: process.env.TOKEN,
  frontendUrl: process.env.FRONTEND_URL,
  dbConnectionName: process.env.DB_CONNECTION_NAME,
  sendgridKey: process.env.SENDGRID_KEY,
  mailApiKey: process.env.MAIL_API_KEY,
  mailApiUrl: process.env.MAIL_API_URL,
};
