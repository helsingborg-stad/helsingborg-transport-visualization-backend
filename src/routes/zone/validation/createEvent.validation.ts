import { validationMiddleware } from '@root/utils/validationMiddleware';

export const createEventValidation = validationMiddleware({
  trackingId: {
    presence: true,
  },
  enteredAt: {
    presence: true,
  },
  exitedAt: {
    presence: true,
  },
});
