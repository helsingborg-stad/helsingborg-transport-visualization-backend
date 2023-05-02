import { validationMiddleware } from '@root/utils/validationMiddleware';

export const createZonesValidation = validationMiddleware({
  type: {
    presence: true,
    inclusion: {
      within: ['FeatureCollection'],
      message: 'must be a valid GeoJSON FeatureCollection',
    },
  },
  features: {
    presence: true,
    geojsonFeatures: true,
  },
});
