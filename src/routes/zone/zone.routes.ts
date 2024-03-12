import { Request, Response, Router } from 'express';
import { createZonesValidation, createEventValidation } from './validation';
import { ZoneService, IZoneService } from '@domains/zone';
import { IEventService, EventService } from '@root/domains/event';
import { handleError } from '@root/utils/handleError';
import { isAuth } from '@root/middlewares/isAuth';
import { isPasswordAuthenticated } from '@root/middlewares/isPasswordAuthenticated';
import { CreateZonesBody, FilterEventQueryType, CreateEventBody, IdParamsType } from './types';
import { write } from 'xlsx';

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
   *    parameters:
   *      - $ref: '#/components/headers/Authorization'
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
   * /zones/{id}:
   *  delete:
   *    summary: Delete zone by ID
   *    description: "Attempt to delete zone with cascading delete of events"
   *    tags:
   *      - Zones
   *    parameters:
   *      - $ref: '#/components/headers/Authorization'
   *      - $ref: '#/components/parameters/Id'
   *    consumes: application/json
   *    responses:
   *      204:
   *       $ref: '#/components/responses/NoContent'
   */
  router.delete('/:id', isAuth, isPasswordAuthenticated(true), async (req: Request<IdParamsType>, res: Response) => {
    try {
      const { id } = req.params;
      //@ts-ignore
      const { id: userId } = req.auth;
      await zoneService.deleteZone(id, userId);
      res.sendStatus(204);
    } catch (e) {
      return handleError(e, res);
    }
  });

  /**
   * @swagger
   * /zones/{id}/delivery:
   *  get:
   *    summary: Get all delivery zones related to a distribution zone
   *    description: "Attempt to fetch all related delivery zones to a distribution zone"
   *    tags:
   *      - Zones
   *    parameters:
   *      - $ref: '#/components/parameters/Id'
   *    consumes: application/json
   *    responses:
   *      200:
   *        $ref: '#/components/responses/FeatureCollection'
   */
  router.get('/:id/delivery', async (req: Request<IdParamsType>, res: Response) => {
    try {
      const { id } = req.params;
      const deliveryZones = await zoneService.getDeliveryZones(id);
      res.status(200).send(deliveryZones);
    } catch (e) {
      return handleError(e, res);
    }
  });

  /**
   * @swagger
   * /zones/{id}/distribution:
   *  get:
   *    summary: Get all distribution zones related to a delivery zone
   *    description: "Attempt to fetch all related distribution zones to a delivery zone"
   *    tags:
   *      - Zones
   *    parameters:
   *      - $ref: '#/components/parameters/Id'
   *    consumes: application/json
   *    responses:
   *      200:
   *        $ref: '#/components/responses/FeatureCollection'
   */
  router.get('/:id/distribution', async (req: Request<IdParamsType>, res: Response) => {
    try {
      const { id } = req.params;
      const deliveryZones = await zoneService.getDistributionZones(id);
      res.status(200).send(deliveryZones);
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
      const organisations = req.query.organisations?.split(',');
      const areas = req.query.areas?.split(',');
      const weekdays = req.query.weekdays?.split(',');
      const distributors = req.query.distributors?.split(',');
      const timeInterval = req.query.timeInterval?.split('-');
      const from = req.query.from;
      const to = req.query.to;
      const results = await eventService.getEvents({
        names,
        organisations,
        areas,
        weekdays,
        distributors,
        timeInterval,
        from,
        to,
      });
      res.status(200).send(results);
    } catch (e) {
      return handleError(e, res);
    }
  });

    /**
   * @swagger
   * /zones/events/export:
   *  get:
   *    summary: Get events and export to excel
   *    description: "Attempt to fetch events with export to excel"
   *    tags:
   *      - Events
   *      - Zones
   *    consumes: application/json
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ExeclFile'
   */
  router.get('/events/export', async (req: Request<null, null, null, FilterEventQueryType>, res: Response) => {
    try {
      const names = req.query.names?.split(',');
      const organisations = req.query.organisations?.split(',');
      const areas = req.query.areas?.split(',');
      const weekdays = req.query.weekdays?.split(',');
      const distributors = req.query.distributors?.split(',');
      const timeInterval = req.query.timeInterval?.split('-');
      const from = req.query.from;
      const to = req.query.to;
      const results = await eventService.getEvents({
        names,
        organisations,
        areas,
        weekdays,
        distributors,
        timeInterval,
        from,
        to,
      });
      const workBook = await eventService.exportEventsToExcel(results);
      const buffer = write(workBook, { type: 'buffer', bookType: 'xlsx' });
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="events.xlsx"`);
      res.status(200);
      return res.end(buffer);
    } catch (e) {
      return handleError(e, res);
    }
  });

  /**
   * @swagger
   * /zones/{id}/events:
   *  post:
   *    summary: Add event related to a zone
   *    description: "Attempt to create event related to a zone"
   *    tags:
   *      - Events
   *      - Zones
   *    parameters:
   *      - $ref: '#/components/parameters/Id'
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
    isPasswordAuthenticated(true),
    createEventValidation,
    async (req: Request<IdParamsType, null, CreateEventBody>, res: Response) => {
      try {
        //@ts-ignore
        const { orgNumber } = req.auth;
        const os = req.get('User-Agent');
        const { id } = req.params;
        const result = await eventService.createEvent(id, orgNumber, os, req.body);
        res.status(201).send(result);
      } catch (e) {
        return handleError(e, res);
      }
    }
  );

  return router;
};
