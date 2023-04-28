import { validationMiddleware } from '@root/utils/validationMiddleware';

export const signupValidation = validationMiddleware({
  id: {
    presence: true,
    type: 'string',
  },
  name: {
    presence: true,
    type: 'string',
  },
  email: {
    presence: true,
    email: true,
  },
  password: {
    presence: true,
    length: {
      minimum: 10,
      message: 'must have at least 10 characters.',
    },
  },
  pinCode: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must have at least 6 characters.',
    },
  },
});
