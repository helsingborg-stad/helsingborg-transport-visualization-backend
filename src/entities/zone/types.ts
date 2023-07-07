import { Polygon, GeoJsonObject } from 'geojson';
import { IOrganisation } from '../organisation';

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
  createdAt: Date;
  organisationId: string;
  organisation: IOrganisation;
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
  ] | [];
};
