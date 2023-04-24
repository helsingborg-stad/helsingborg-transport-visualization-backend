import { isAdmin } from '@root/middlewares/isAdmin';
import { isAuth } from '@root/middlewares/isAuth';
import { Request, Response, Router } from 'express';
import { createAdminValidation, createDriverValidation } from './validation';
import { CreateAdminBody, CreateDriverBody } from './types';
import { handleError } from '@root/utils/handleError';
import { IUserService, UserService } from '@root/domains/users';

export const userRoutes = () => {
  const router = Router();
  const userService: IUserService = new UserService();

  /**
   * @swagger
   * /user:
   *  get:
   *    summary: Get all users
   *    description: "Get all users, only admin can access this route"
   *    tags:
   *      - Users
   *    consumes: application/json
   *    responses:
   *      201:
   *        $ref: '#/components/responses/UserList'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      401:
   *        $ref: '#/components/responses/UnauthorizedError'
   */
  router.get('/', isAuth, isAdmin, async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).send(users);
    } catch (e) {
      return handleError(e, res);
    }
  });

  /**
   * @swagger
   * /user/drivers:
   *  post:
   *    summary: Add driver user
   *    description: "Add a driver to a freight company"
   *    tags:
   *      - Users
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/Driver'
   *    responses:
   *      201:
   *        $ref: '#/components/responses/SingleUser'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      401:
   *        $ref: '#/components/responses/UnauthorizedError'
   */
  router.post(
    '/drivers',
    isAuth,
    isAdmin,
    createDriverValidation,
    async (req: Request<null, null, CreateDriverBody>, res: Response) => {
      try {
        const user = await userService.createDriver(req.body);
        delete user.password;
        return res.status(201).send(user);
      } catch (e) {
        return handleError(e, res);
      }
    }
  );

  /**
   * @swagger
   * /user/admins:
   *  post:
   *    summary: Add admin user
   *    description: "Add a admin user, freight company ID is optional"
   *    tags:
   *      - Users
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/Admin'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/SingleUser'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      401:
   *        $ref: '#/components/responses/UnauthorizedError'
   */
  router.post(
    '/admins',
    isAuth,
    isAdmin,
    createAdminValidation,
    async (req: Request<null, null, CreateAdminBody>, res: Response) => {
      try {
        const user = await userService.createAdmin(req.body);
        delete user.password;
        return res.status(201).send(user);
      } catch (e) {
        return handleError(e, res);
      }
    }
  );

  return router;
};
