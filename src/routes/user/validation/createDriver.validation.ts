import { validationMiddleware } from '@root/utils/validationMiddleware';

export const createDriverValidation = validationMiddleware({
  email: {
    presence: true,
    email: true,
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must have at least 6 characters.',
    },
  },
  freightCompanyId: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
    },
  },
});
