import { Request, Response, Router } from 'express';
import { loginValidation, forgotPasswordValidation, resetPasswordValidation, signupValidation } from './validation';
import { LoginBody, ForgotPasswordBody, ResetPasswordBody, SignupBody } from './types';
import { AuthService, IAuthService } from '@domains/auth';
import { handleError } from '@utils/handleError';

export const authRoutes = () => {
  const router = Router();
  const authService: IAuthService = new AuthService();

  /**
   * @swagger
   * /auth/login:
   *  post:
   *    summary: Login organisation or driver
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
      const { identifier, password, pinCode } = req.body;
      const response = password
        ? await authService.loginByPassword(identifier, password)
        : await authService.loginByPinCode(identifier, pinCode);
      res.status(200).send(response);
    } catch (e) {
      return handleError(e, res);
    }
  });

  /**
   * @swagger
   * /auth/signup:
   *  post:
   *    summary: Register a organisation
   *    description: "Attempt to register a organisation with given credentials"
   *    tags:
   *      - Auth
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/Signup'
   *    responses:
   *      200:
   *        $ref: '#/components/responses/Auth'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   *      409:
   *        $ref: '#/components/responses/ConflictError'
   */
  router.post('/signup', signupValidation, async (req: Request<null, null, SignupBody>, res: Response) => {
    try {
      const response = await authService.signup(req.body);
      res.status(201).send(response);
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
   */
  router.post(
    '/forgot-password',
    forgotPasswordValidation,
    async (req: Request<null, null, ForgotPasswordBody>, res: Response) => {
      try {
        const { identifier } = req.body;
        await authService.forgotPassword(identifier);
        return res.sendStatus(200);
      } catch (e) {
        return handleError(e, res);
      }
    }
  );

  /**
   * @swagger
   * /auth/reset-password:
   *  post:
   *    summary: Reset password
   *    description: "Reset password for the user with given token"
   *    tags:
   *      - Auth
   *    consumes: application/json
   *    requestBody:
   *      content:
   *        $ref: '#/components/requestBodies/ResetPassword'
   *    responses:
   *      200:
   *       $ref: '#/components/responses/OK'
   *      400:
   *        $ref: '#/components/responses/BadRequestError'
   */
  router.post(
    '/reset-password',
    resetPasswordValidation,
    async (req: Request<null, null, ResetPasswordBody>, res: Response) => {
      try {
        const { token, password } = req.body;
        const response = await authService.resetPassword(token, password);
        return res.status(200).send(response);
      } catch (e) {
        return handleError(e, res);
      }
    }
  );

  return router;
};
