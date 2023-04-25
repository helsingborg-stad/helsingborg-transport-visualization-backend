import { validationMiddleware } from '@root/utils/validationMiddleware';

export const createGeolocationValidation = validationMiddleware({
  latitude: {
    presence: true,
    numericality: {
      greaterThan: -90,
      lessThan: 90,
      message: 'must be between -90 and 90.',
    },
  },
  longitude: {
    presence: true,
    numericality: {
      greaterThan: -180,
      lessThan: 180,
      message: 'must be between -180 and 180.',
    },
  },
  heading: {
    presence: true,
    numericality: {
      greaterThan: 0,
      lessThan: 360,
      message: 'must be between 0 and 360.',
    },
  },
  registeredAt: {
    presence: true,
    type: 'string',
  },
});
