import { UserTokenDestructured } from '@root/entities';
import { decodeJWT } from '@root/services/jwt';
import logger from '@root/services/logger';

export const getAuthUser = async (token?: string): Promise<UserTokenDestructured> => {
  try {
    return decodeJWT(token);
  } catch (err) {
    logger.error('Error while decoding token', err);
    throw err;
  }
};
