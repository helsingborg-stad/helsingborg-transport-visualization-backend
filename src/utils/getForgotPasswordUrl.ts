import { config } from '../config';

export const buildForgotPasswordUrl = (token: string): string => `${config.frontendUrl}/auth/reset-password/${token}`;
