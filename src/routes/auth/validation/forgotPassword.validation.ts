import { validationMiddleware } from '@root/utils/validationMiddleware';

export const forgotPasswordValidation = validationMiddleware({
  email: {
    presence: true,
    email: true,
  },
});
