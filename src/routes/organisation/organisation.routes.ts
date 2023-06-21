import { Request, Response, Router } from 'express';
import { handleError } from '@root/utils/handleError';
import { IOrganisationService, OrganisationService } from '@domains/organisation';
import { isAuth } from '@root/middlewares/isAuth';
import { isPasswordAuthenticated } from '@root/middlewares/isPasswordAuthenticated';
import { updateOrganisationValidation } from './validation';
import { PatchOrganisationBody } from './types';

export const organisationRoutes = () => {
  const router = Router();
  const organisationService: IOrganisationService = new OrganisationService();

  /**
   * @swagger
   * /organisations:
   *  get:
   *    summary: Get all organisations
   *    description: "Attempt to fetch all organisations"
   *    tags:
   *      - Organisations
   *    consumes: application/json
   *    responses:
   *      200:
   *        $ref: '#/components/responses/ListOfOrganisations'
   */
  router.get('/', async (req: Request, res: Response) => {
    try {
      const organisations = await organisationService.getAllOrganisations();
      res.status(200).send(organisations);
    } catch (e) {
      return handleError(e, res);
    }
  });

  /**
   * @swagger
   * /organisations/{id}:
   *  delete:
   *    summary: Delete organisation by ID
   *    description: "Attempt to delete organisation with cascading delete of zones and events"
   *    tags:
   *      - Organisations
   *    consumes: application/json
   *    responses:
   *      204:
   *       $ref: '#/components/responses/NoContent'
   */
  router.delete('/:id', isAuth, isPasswordAuthenticated(true), async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      //@ts-ignore
      const { id: userId } = req.auth;
      await organisationService.deleteOrganisation(id, userId);
      res.sendStatus(204);
    } catch (e) {
      return handleError(e, res);
    }
  });

  /**
   * @swagger
   * /organisations/{id}:
   *  patch:
   *    summary: Update organisation by ID
   *    description: "Attempt to update organisation"
   *    tags:
   *      - Organisations
   *    consumes: application/json
   *    requestBody:
   *     content:
   *      $ref: '#/components/requestBodies/PatchOrganisation'
   *    responses:
   *      200:
   *       $ref: '#/components/responses/Organisation'
   */
  router.patch(
    '/:id',
    isAuth,
    isPasswordAuthenticated(true),
    updateOrganisationValidation,
    async (req: Request<any, null, PatchOrganisationBody>, res: Response) => {
      try {
        const { id } = req.params;
        //@ts-ignore
        const { id: userId } = req.auth;
        console.log(req.body);
        const updatedOrganisation = await organisationService.updateOrganisation(id, userId, req.body);
        res.status(200).send(updatedOrganisation);
      } catch (e) {
        return handleError(e, res);
      }
    }
  );

  return router;
};
