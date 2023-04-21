import { validationMiddleware } from '@root/utils/validationMiddleware';

export const createAdminValidation = validationMiddleware({
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
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
    },
  },
});
