import { NextFunction, Request, Response } from 'express';
import { UserTokenDestructured, UserTypes } from '@root/entities';
import StatusError from '@utils/statusError';
import { handleError } from '@utils/handleError';

export const isOfUserType =
  (userTypes: Array<UserTypes> = []) =>
  (request: Request<any>, response: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const auth = request?.auth as UserTokenDestructured;

      if (!userTypes.includes(auth.userType)) {
        throw new StatusError(403, 'Forbidden');
      }

      return next();
    } catch (e) {
      return handleError(e, response);
    }
  };
