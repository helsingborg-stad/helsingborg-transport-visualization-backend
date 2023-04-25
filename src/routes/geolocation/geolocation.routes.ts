import { Request, Response, Router } from 'express';
import { isAuth } from '@root/middlewares/isAuth';
import { isOfUserType } from '@root/middlewares/isOfUserType';
import { UserTypes } from '@root/entities';
import { handleError } from '@root/utils/handleError';
import { createGeolocationValidation } from './validation';
import { CreateGeolocationBody } from './types';
import { IGeolocationService, GeolocationService } from '@root/domains/geolocation';

export const geolocationRoutes = () => {
  const router = Router();
  const geolocationService: IGeolocationService = new GeolocationService();

  router.post(
    '/',
    isAuth,
    isOfUserType([UserTypes.DRIVER]),
    createGeolocationValidation,
    async (req: Request<null, null, CreateGeolocationBody>, res: Response) => {
      try {
        // @ts-ignore
        const { id } = req.auth;
        const geolocation = await geolocationService.createGeolocation(id, req.body);
        return res.status(201).send(geolocation);
      } catch (e) {
        return handleError(e, res);
      }
    }
  );

  return router;
};
