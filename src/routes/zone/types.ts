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

export type FilterEventQueryType = {
  names?: string;
  orgNumbers?: string;
  areas?: string;
};

export type CreateEventBody = {
  trackingId: string;
  enteredAt: Date;
  exitedAt: Date;
};

export type IdParamsType = {
  id: string;
};
