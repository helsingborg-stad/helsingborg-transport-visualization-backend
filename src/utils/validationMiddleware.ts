import validate from 'validate.js';

/**
 * Used to generate the validation wrapper middleware.
 * @param rules
 * @return {function(...[*]=)}
 */
export const validationMiddleware = (rules) => async ({ body }, res, next) => {
  try {
    await validate.async(body, rules, { cleanAttributes: true });
    return next();
  } catch (e) {
    return res.status(400).send({
      message: 'Validation Error',
      data: e,
    });
  }
};

/**
 * Used to add async validators.
 * @param validatorName
 * @param handler
 */
export const addAsyncValidator = (validatorName, handler) => {
  // @ts-ignore
  validate.validators[validatorName] = (value) => new validate.Promise(handler(value));
};
