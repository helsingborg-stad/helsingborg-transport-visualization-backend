import { validationMiddleware } from '@root/utils/validationMiddleware';

export const updateOrganisationValidation = validationMiddleware({
  password: {
    presence: false,
    format: {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{10,}$/,
      message:
        'must be minimum 10 characters, must contain at least 1 special character, must contain at least 1 number, must contain at least 1 uppercase letter',
    },
  },
  pinCode: {
    presence: false,
    format: {
      pattern: /^(?!.*(\d)\1{2})(?!.*(\d)(\d)\2{2})[0-9]{6}$/,
      message: 'must be 6 digits, max 2 repeating after each other, min 3 unique digits',
    },
  },
  contactPerson: {
    type: 'string',
    presence: false,
  },
  mobileNumber: {
    type: 'string',
    presence: false,
  },
  email: {
    presence: false,
    email: true,
  },
});
