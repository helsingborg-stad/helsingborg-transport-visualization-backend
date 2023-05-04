import { Request, Response, Router } from 'express';
import { handleError } from '@root/utils/handleError';
import { FilterService, IFilterService } from '@root/domains/filter';

export const filterRoutes = () => {
  const router = Router();
  const eventService: IFilterService = new FilterService();

  /**
   * @swagger
   * /filters/events:
   *  get:
   *    summary: Return all the different filter values
   *    description: "Return all the different filter values"
   *    tags:
   *      - Filters
   *      - Events
   *    consumes: application/json
   *    responses:
   *      200:
   *       $ref: '#/components/responses/EventFilterValues'
   */
  router.get('/events', async (req: Request, res: Response) => {
    try {
      const response = await eventService.getUniqueFilterValuesFromEvents();
      res.status(200).send(response);
    } catch (e) {
      return handleError(e, res);
    }
  });

  return router;
};
