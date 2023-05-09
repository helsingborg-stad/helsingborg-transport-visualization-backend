import { validationMiddleware } from '@root/utils/validationMiddleware';

export const forgotPasswordValidation = validationMiddleware({
  identifier: {
    presence: true,
  },
});
