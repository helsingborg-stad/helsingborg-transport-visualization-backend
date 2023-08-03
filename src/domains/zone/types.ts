import { GeoJsonObject, Polygon } from 'geojson';
import { ZoneType } from '@root/entities';

export type ZoneCreateType = GeoJsonObject & {
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
        lat: number | null;
        lng: number | null;
      };
    }
  ];
};
