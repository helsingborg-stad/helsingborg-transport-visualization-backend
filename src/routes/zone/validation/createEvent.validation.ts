import { validationMiddleware } from '@root/utils/validationMiddleware';

export const createEventValidation = validationMiddleware({
  trackingId: {
    presence: true,
    type: 'string',
  },
  enteredAt: {
    presence: true,
    format: {
      pattern: /^\d{4}-\d{2}-\d{2}\ \d{2}:\d{2}:\d{2}/,
      message: 'must be ISOString',
    },
  },
  exitedAt: {
    presence: true,
    format: {
      pattern: /^\d{4}-\d{2}-\d{2}\ \d{2}:\d{2}:\d{2}/,
      message: 'must be ISOString',
    },
  },
  distributionZoneId: {
    type: 'string',
  },
});
