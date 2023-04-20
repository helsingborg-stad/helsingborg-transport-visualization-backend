import { Request, Response, Router } from 'express';
import { loginValidation } from './validation';
import { LoginBody } from './types';
import { AuthService, IAuthService } from '@domains/auth';
import { handleError } from '@utils/handleError';

export const authRoutes = () => {
  const router = Router();
  const authService: IAuthService = new AuthService();
  router.post('/login', loginValidation, async (req: Request<null, null, LoginBody>, res: Response) => {
    try {
      const { email, password } = req.body;
      const response = await authService.login(email, password);
      res.status(200).send(response);
    } catch (e) {
      return handleError(e, res);
    }
  });
  return router;
};
