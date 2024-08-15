import { validationMiddleware } from '@root/utils/validationMiddleware';

export const importPasswordValidation = validationMiddleware({
    password: {
        presence: true,
        type: 'string',
    },
});
