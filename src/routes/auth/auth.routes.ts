import { Request, Response, Router } from 'express';
import { loginValidation, forgotPasswordValidation } from './validation';
import { LoginBody, ForgotPasswordBody } from './types';
import { AuthService, IAuthService } from '@domains/auth';
import { handleError } from '@utils/handleError';

export const authRoutes = () => {
  const router = Router();
  const authService: IAuthService = new AuthService();

  /**
   * @swagger
   * /auth/login:
   *  post:
   *    summary: Login user
   *    description: "Attempt to login the user with given credentials"
   *    tags:
   *      - Auth
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/Login'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/Auth'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      401:
   *        $ref: '#/components/responses/UnauthorizedError'
   */
  router.post('/login', loginValidation, async (req: Request<null, null, LoginBody>, res: Response) => {
    try {
      const { email, password } = req.body;
      const response = await authService.login(email, password);
      res.status(200).send(response);
    } catch (e) {
      return handleError(e, res);
    }
  });

  /**
   * @swagger
   * /auth/forgot-password:
   *  post:
   *    summary: Send reset password email
   *    description: "Send reset password email to the user with given email"
   *    tags:
   *      - Auth
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/ForgotPassword'
   *    responses:
   *      200:
   *       $ref: '#/components/responses/OK'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      401:
   *        $ref: '#/components/responses/UnauthorizedError'
   */
  router.post(
    '/forgot-password',
    forgotPasswordValidation,
    async (req: Request<null, null, ForgotPasswordBody>, res) => {
      try {
        const { email } = req.body;
        await authService.forgotPassword(email);
        return res.sendStatus(200);
      } catch (e) {
        return handleError(e, res);
      }
    }
  );

  return router;
};
