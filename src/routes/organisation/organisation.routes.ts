import { Request, Response, Router } from 'express';
import { handleError } from '@root/utils/handleError';
import { IOrganisationService, OrganisationService } from '@domains/organisation';

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

  return router;
};
