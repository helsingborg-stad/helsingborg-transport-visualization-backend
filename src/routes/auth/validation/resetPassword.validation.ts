import { validationMiddleware } from '@utils/validationMiddleware';

export const resetPasswordValidation = validationMiddleware({
  token: { presence: { allowEmpty: false } },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must have at least 6 characters.',
    },
  },
  confirmedPassword: {
    presence: true,
    equality: 'password',
    length: {
      minimum: 6,
      message: 'must have at least 6 characters.',
    },
  },
});
