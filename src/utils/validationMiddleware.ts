import validate from 'validate.js';

validate.validators.geojsonFeatures = (value: any[]) => {
  if (!Array.isArray(value)) {
    return 'must be an array of features';
  }
  for (let i = 0; i < value.length; i++) {
    const feature = value[i];

    if (feature.type !== 'Feature') {
      return 'must be a valid GeoJSON Feature';
    }

    if (!feature.properties) {
      return 'must contain properties';
    }

    if (!feature.properties.name) {
      return 'must contain name';
    }

    if (!feature.properties.address) {
      return 'must contain address';
    }

    if (!feature.properties.area) {
      return 'must contain area';
    }

    if (!feature.properties.type) {
      return 'must contain type';
    }

    if (!feature.properties.organisationId) {
      return 'must contain organisationId';
    }

    if (!feature.geometry) {
      return 'must contain a valid GeoJSON geometry';
    }

    if (feature.geometry.type !== 'Polygon') {
      return 'must be a valid GeoJSON Polygon';
    }
  }
};

/**
 * Used to generate the validation wrapper middleware.
 * @param rules
 * @return {function(...[*]=)}
 */
export const validationMiddleware =
  (rules) =>
  async ({ body }, res, next) => {
    try {
      await validate.async(body, rules, { cleanAttributes: true });
      return next();
    } catch (e) {
      //log whole error object
      console.log(e);
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
