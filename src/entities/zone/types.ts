import { Polygon, GeoJsonObject } from 'geojson';

export enum ZoneType {
  DISTRIBUTION = 'distribution',
  DELIVERY = 'delivery',
}

export interface IZone {
  id: string;
  name: string;
  address: string;
  area: string;
  type: ZoneType;
  polygon: Polygon;
  organisationId: string;
}

export type FeatureCollection = GeoJsonObject & {
  type: 'FeatureCollection';
  features: [
    {
      type: 'Feature';
      geometry: Polygon;
      properties: {
        id: string;
        name: string;
        address: string;
        area: string;
        type: ZoneType;
        organisationId: string;
      };
    }
  ];
};
