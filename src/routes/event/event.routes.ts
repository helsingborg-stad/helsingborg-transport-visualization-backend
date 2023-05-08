import { Request, Response, Router } from 'express';
import { handleError } from '@root/utils/handleError';
import { IEventService, EventService } from '@root/domains/event';
import { FilterQueryType } from './types';

export const eventRoutes = () => {
  const router = Router();
  const eventService: IEventService = new EventService();

  /**
   * @swagger
   * /events:
   *  get:
   *    summary: Get events
   *    description: "Attempt to fetch events"
   *    tags:
   *      - Events
   *    consumes: application/json
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ListOfEvents'
   */
  router.get('/', async (req: Request<null, null, null, FilterQueryType>, res: Response) => {
    try {
      const names = req.query.names?.split(',');
      const orgNumbers = req.query.orgNumbers?.split(',');
      const areas = req.query.areas?.split(',');
      const results = await eventService.getEvents({
        names,
        orgNumbers,
        areas,
      });
      res.status(200).send(results);
    } catch (e) {
      return handleError(e, res);
    }
  });

  return router;
};
