import { validationMiddleware } from '@utils/validationMiddleware';

export const createFreightCompanyValidation = validationMiddleware({
  name: {
    type: 'string',
    presence: { allowEmpty: false },
  },
});
