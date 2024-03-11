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
        lat: number | null;
        lng: number | null;
      };
    }
  ];
};

export type FilterEventQueryType = {
  names?: string;
  organisations?: string;
  areas?: string;
  weekdays?: string;
  distributors?: string;
  from?: string;
  to?: string;
  timeInterval?: string;
};

export type CreateEventBody = {
  trackingId: string;
  sessionId?: string;
  deviceId?: string;
  distributionZoneId: string;
  enteredAt: Date;
  exitedAt: Date;
};

export type IdParamsType = {
  id: string;
};
