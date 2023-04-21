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
  router.get('/', isAuth, isAdmin, async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).send(users);
    } catch (e) {
      return handleError(e, res);
    }
  });
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
