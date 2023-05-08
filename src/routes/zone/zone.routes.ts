import { Request, Response, Router } from 'express';
import { createZonesValidation } from './validation';
import { ZoneService, IZoneService } from '@domains/zone';
import { handleError } from '@root/utils/handleError';
import { isAuth } from '@root/middlewares/isAuth';
import { isPasswordAuthenticated } from '@root/middlewares/isPasswordAuthenticated';
import { CreateZonesBody } from './types';

export const zoneRoutes = () => {
  const router = Router();
  const zoneService: IZoneService = new ZoneService();

  /**
   * @swagger
   * /zones:
   *  post:
   *    summary: Add zones to the database
   *    description: "Attempt to create zones based on given FeatureCollection"
   *    tags:
   *      - Zones
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/FeatureCollection'
   *    responses:
   *      201:
   *        $ref: '#/components/responses/Created'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      401:
   *        $ref: '#/components/responses/UnauthorizedError'
   */
  router.post(
    '/',
    isAuth,
    isPasswordAuthenticated,
    createZonesValidation,
    async (req: Request<null, null, CreateZonesBody>, res: Response) => {
      try {
        //@ts-ignore
        const { id } = req.auth;
        await zoneService.createZones(req.body, id);
        res.status(201).send({ message: 'Zones created' });
      } catch (e) {
        return handleError(e, res);
      }
    }
  );

  /**
   * @swagger
   * /zones:
   *  get:
   *    summary: Get all zones
   *    description: "Attempt to fetch all zones"
   *    tags:
   *      - Zones
   *    consumes: application/json
   *    responses:
   *      200:
   *        $ref: '#/components/responses/FeatureCollection'
   *      401:
   *        $ref: '#/components/responses/UnauthorizedError'
   */
  router.get('/', isAuth, async (req: Request, res: Response) => {
    try {
      const zones = await zoneService.getAllZones();
      res.status(200).send(zones);
    } catch (e) {
      return handleError(e, res);
    }
  });

  return router;
};
