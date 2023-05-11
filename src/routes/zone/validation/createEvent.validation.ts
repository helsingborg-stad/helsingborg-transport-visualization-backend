import { validationMiddleware } from '@root/utils/validationMiddleware';

export const createEventValidation = validationMiddleware({
  trackingId: {
    presence: true,
    type: 'string',
  },
  enteredAt: {
    presence: true,
    type: 'string',
  },
  exitedAt: {
    presence: true,
    type: 'string',
  },
  distributionZoneId: {
    type: 'string',
  },
});
