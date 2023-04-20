import JWT from 'jsonwebtoken';
import { config } from '@config';

const expiresIn = '3h';

/**
 * Creates a JWT token out of given payload.
 * @param payload {Object}
 * @return {string}
 */
export const createJWT = (payload: object) => JWT.sign(payload, config.token, { expiresIn });

/**
 * Decodes a JWT token into the original object
 * @param token {string}
 * @return {Object}
 */
export const decodeJWT = (token: string) => JWT.verify(token, config.token);
