import { Request, Response, NextFunction } from 'express';
import logger from '@services/logger';

/**
 * Log requests in dev mode to console.
 * @param req {Request}
 * @param res {Response}
 * @param next {NextFunction}
 */
export default (req: Request, res: Response, next: NextFunction) => {
  let message = `${req.method} - ${req.url}`;

  if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
    message += `\nRequest body: \n ${JSON.stringify(req.body, null, 4)}`;
  }

  logger.info(message);
  next();
};
