import { validationMiddleware } from '@utils/validationMiddleware';

export const resetPasswordValidation = validationMiddleware({
  token: { presence: { allowEmpty: false } },
  password: {
    presence: true,
    format: {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{10,}$/,
      message:
        'must be minimum 10 characters, must contain at least 1 special character, must contain at least 1 number, must contain at least 1 uppercase letter',
    },
  },
});
