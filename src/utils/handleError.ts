import { Response } from 'express';
import logger from '@services/logger';
import StatusError from '@utils/statusError';

export const handleError = (e: StatusError, res: Response) => {
  if (e.statusCode) {
    logger.debug(e);
    return res.status(e.statusCode).send({ message: e.message });
  }
  logger.error(e);
  return res.sendStatus(500);
};
