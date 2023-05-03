import { NextFunction, Request, Response } from 'express';
import { OrganisationTokenDestructured } from '@root/entities';
import StatusError from '@utils/statusError';
import { handleError } from '@utils/handleError';

export const isPasswordAuthenticated =
  (status: boolean = true) =>
  (req: Request<any>, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const auth = req?.auth as OrganisationTokenDestructured;

      if (auth.isPasswordAuthenticated !== status) {
        throw new StatusError(403, 'Forbidden');
      }

      return next();
    } catch (e) {
      return handleError(e, res);
    }
  };
