import { Request, Response, Router } from 'express';
import { createZonesValidation, createEventValidation } from './validation';
import { ZoneService, IZoneService } from '@domains/zone';
import { IEventService, EventService } from '@root/domains/event';
import { handleError } from '@root/utils/handleError';
import { isAuth } from '@root/middlewares/isAuth';
import { isPasswordAuthenticated } from '@root/middlewares/isPasswordAuthenticated';
import { CreateZonesBody, FilterEventQueryType, CreateEventBody, IdParamsType } from './types';

export const zoneRoutes = () => {
  const router = Router();
  const zoneService: IZoneService = new ZoneService();
  const eventService: IEventService = new EventService();

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
    isPasswordAuthenticated(true),
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
  router.get('/', async (req: Request, res: Response) => {
    try {
      const zones = await zoneService.getAllZones();
      res.status(200).send(zones);
    } catch (e) {
      return handleError(e, res);
    }
  });

  /**
   * @swagger
   * /zones/events:
   *  get:
   *    summary: Get events
   *    description: "Attempt to fetch events"
   *    tags:
   *      - Events
   *      - Zones
   *    consumes: application/json
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ListOfEvents'
   */
  router.get('/events', async (req: Request<null, null, null, FilterEventQueryType>, res: Response) => {
    try {
      const names = req.query.names?.split(',');
      const orgNumbers = req.query.orgNumbers?.split(',');
      const areas = req.query.areas?.split(',');
      const weekdays = req.query.weekdays?.split(',');
      const results = await eventService.getEvents({
        names,
        orgNumbers,
        areas,
        weekdays,
      });
      res.status(200).send(results);
    } catch (e) {
      return handleError(e, res);
    }
  });

  /**
   * @swagger
   * /zones/{id}/events:
   *  post:
   *    summary: Add zones to the database
   *    description: "Attempt to create zones based on given FeatureCollection"
   *    tags:
   *      - Events
   *      - Zones
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/Event'
   *    responses:
   *      201:
   *        $ref: '#/components/responses/IEvent'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      401:
   *        $ref: '#/components/responses/UnauthorizedError'
   */
  router.post(
    '/:id/events',
    isAuth,
    isPasswordAuthenticated(false),
    createEventValidation,
    async (req: Request<IdParamsType, null, CreateEventBody>, res: Response) => {
      try {
        //@ts-ignore
        const { orgNumber } = req.auth;
        const { id } = req.params;
        const result = await eventService.createEvent(id, orgNumber, req.body);
        res.status(201).send(result);
      } catch (e) {
        return handleError(e, res);
      }
    }
  );

  return router;
};
