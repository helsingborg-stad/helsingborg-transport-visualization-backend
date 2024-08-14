import multer from 'multer';
import { Request, Response, Router } from 'express';
import { IEventService, EventService } from '@root/domains/event';
import { handleError } from '@root/utils/handleError';
import { FilterEventQueryType } from './types';
import { write } from 'xlsx';
import { AuthRequest, isAuth } from '@root/middlewares/isAuth';
import { isPasswordAuthenticated } from '@root/middlewares/isPasswordAuthenticated';
import { importPasswordValidation } from './validation/importPassword.validation';

export const eventsRouter = () => {
  const upload = multer(
    {
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 50 * 1024 * 1024, // limit file size to 50MB
      },
    },
  );
  const router = Router();
  const eventService: IEventService = new EventService();

  /**
   * @swagger
   * /zones/events:
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
  router.get(
    '/',
    async (req: Request<null, null, null, FilterEventQueryType>, res: Response) => {
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
   * /zones/events/grouped:
   *  get:
   *    summary: Get events grouped by session
   *    description: "Attempt to fetch grouped events"
   *    tags:
   *      - Events
   *    consumes: application/json
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ListOfGroupedEvents'
   */
  router.get(
    '/grouped',
    async (req: Request<null, null, null, FilterEventQueryType>, res: Response) => {
      try {
        const names = req.query.names?.split(',');
        const organisations = req.query.organisations?.split(',');
        const areas = req.query.areas?.split(',');
        const weekdays = req.query.weekdays?.split(',');
        const distributors = req.query.distributors?.split(',');
        const timeInterval = req.query.timeInterval?.split('-');
        const from = req.query.from;
        const to = req.query.to;
        const results = await eventService.getGroupedEvents({
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
   * /zones/events/import:
   *  post:
   *    summary: Imports events from excel
   *    description: "Attempt to import events from excel"
   *    tags:
   *      - Events
   *    parameters:
   *      - $ref: '#/components/headers/Authorization'
   *    consumes: multipart/form-data
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ListOfEvents'
   */
  router.post(
    '/import',
    isAuth,
    isPasswordAuthenticated(true),
    upload.single('file'),
    importPasswordValidation,
    async (req: Request<null, null, { password: string }> & AuthRequest & { file: File }, res: Response) => {
      try {
        const { file } = req;
        const { password } = req.body;
        eventService.validateImportPassword(password);
        const results = await eventService.importEventsFromExcel(file.buffer);
        res.status(200).send(results);
      } catch (e) {
        return handleError(e, res);
      }
    });

  /**
   * @swagger
   * /zones/events/import/password:
   *  post:
   *    summary: Authenticate password for importing events
   *    description: "Attempt to authenticate password for importing events"
   *    tags:
   *      - Events
   *    parameters:
   *      - $ref: '#/components/headers/Authorization'
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/ImportPassword'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ListOfEvents'
   */
  router.post(
    '/import/password',
    isAuth,
    isPasswordAuthenticated(true),
    importPasswordValidation,
    async (req: Request<null, null, { password: string }> & AuthRequest, res: Response) => {
      try {
        const { password } = req.body;
        eventService.validateImportPassword(password);
        res.status(200).send();
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
   *    consumes: application/json
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ExeclFile'
   */
  router.get(
    '/export',
    async (req: Request<null, null, null, FilterEventQueryType>, res: Response) => {
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

  return router;
};
