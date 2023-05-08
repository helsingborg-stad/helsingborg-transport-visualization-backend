import { Request, Response, Router } from 'express';
import { isAuth } from '@root/middlewares/isAuth';
import { handleError } from '@root/utils/handleError';
import { IOrganisationService, OrganisationService } from '@domains/organisation';

export const organisationRoutes = () => {
  const router = Router();
  const organisationService: IOrganisationService = new OrganisationService();

  router.get('/', isAuth, async (req: Request, res: Response) => {
    try {
      const organisations = await organisationService.getAllOrganisations();
      res.status(200).send(organisations);
    } catch (e) {
      return handleError(e, res);
    }
  });

  return router;
};
