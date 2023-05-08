import { OrganisationResponse } from '../organisation';
import { ZoneType } from '../zone';

export interface IEvent {
  id: string;
  trackingId: string;
  zoneType: ZoneType;
  address: string;
  name: string;
  area: string;
  orgNumber: string;
  zoneId: string;
  enteredAt: Date;
  exitedAt: Date;
  createdAt: Date;
}

export type OrgNumberWithName = {
  name: string;
  orgNumber: string;
};

export type FilterTypeResponse = {
  organisations: OrgNumberWithName[];
  names: string[];
  areas: string[];
  addresses: string[];
};

export type EventResponseType = {
  id: string;
  trackingId: string;
  zoneType: ZoneType;
  address: string;
  name: string;
  area: string;
  zoneId: string;
  enteredAt: Date;
  exitedAt: Date;
  createdAt: Date;
  organisation: OrganisationResponse;
};
