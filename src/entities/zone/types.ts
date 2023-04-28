import { Polygon } from 'geojson';

export enum ZoneType {
  DISTRIBUTION = 'distribution',
  COLLECTION = 'collection',
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
