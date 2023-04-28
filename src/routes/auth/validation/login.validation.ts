import { validationMiddleware } from '@root/utils/validationMiddleware';

export const loginValidation = validationMiddleware({
  identifier: {
    presence: true,
    type: 'string',
  },
  password: {
    length: {
      minimum: 10,
      message: 'must have at least 10 characters.',
    },
  },
  pinCode: {
    length: {
      minimum: 6,
      message: 'must have at least 6 characters.',
    },
  },
});
