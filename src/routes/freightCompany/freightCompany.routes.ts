import { Router, Request, Response } from 'express';
import { createFreightCompanyValidation } from './validation';
import { handleError } from '@root/utils/handleError';
import { isAuth } from '@root/middlewares/isAuth';
import { isAdmin } from '@root/middlewares/isAdmin';
import { FreightCompanyService, IFreightCompanyService } from '@root/domains/freightCompany';
import { CreateFreightCompanyBody } from './types';

export const freightCompanyRoutes = () => {
  const router = Router();
  const freightCompanyService: IFreightCompanyService = new FreightCompanyService();

  /**
   * @swagger
   * /freight-company:
   *  post:
   *    summary: Add freight company
   *    description: "Add new freight company"
   *    tags:
   *      - Freight Company
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/FreightCompany'
   *    responses:
   *      201:
   *        $ref: '#/components/responses/AddFreightCompany'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      401:
   *        $ref: '#/components/responses/UnauthorizedError'
   */
  router.post(
    '/',
    isAuth,
    isAdmin,
    createFreightCompanyValidation,
    async (req: Request<null, null, CreateFreightCompanyBody>, res: Response) => {
      try {
        const result = await freightCompanyService.create(req.body);
        return res.status(201).send(result);
      } catch (e) {
        return handleError(e, res);
      }
    }
  );

  /**
   * @swagger
   * /freight-company:
   *  get:
   *    summary: Get all freight companies
   *    description: "Get list of all freight companies"
   *    tags:
   *      - Freight Company
   *    consumes: application/json
   *    responses:
   *      200:
   *        $ref: '#/components/responses/FreightCompanyList'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      401:
   *        $ref: '#/components/responses/UnauthorizedError'
   */
  router.get(
    '/',
    isAuth,
    isAdmin,
    async (req: Request, res: Response) => {
      try {
        const result = await freightCompanyService.getList();
        return res.status(200).send(result);
      } catch (e) {
        return handleError(e, res);
      }
    }
  );

  return router;
};
