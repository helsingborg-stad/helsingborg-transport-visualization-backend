import { Polygon, GeoJsonObject } from 'geojson';
import { ZoneType } from '@root/entities';

export type CreateZonesBody = GeoJsonObject & {
  type: 'FeatureCollection';
  features: [
    {
      type: 'Feature';
      geometry: Polygon;
      properties: {
        name: string;
        address: string;
        area: string;
        type: ZoneType;
        organisationId: string;
      };
    }
  ];
};
