import { NextFunction, Request, Response } from 'express';
import StatusError from '@utils/statusError';
import { extractAuthToken } from '@utils/extractAuthToken';
import { handleError } from '@utils/handleError';
import logger from '@services/logger';
import { getAuthUser } from '@utils/getAuthUser';
import { TokenExpiredError } from 'jsonwebtoken';

export const isAuth = async (request: Request<any>, response: Response, next: NextFunction) => {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new StatusError(401, 'Not authenticated.');
    }
    const token = extractAuthToken(authorization);
    // @ts-ignore
    request.auth = await getAuthUser(token);
    logger.info(`User authenticated.`);
    return next();
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return response.status(401).send({ message: 'Token expired.' });
    }
    return handleError(e, response);
  }
};
