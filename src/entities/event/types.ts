import { OrganisationResponse } from '../organisation';
import { ZoneType, Zone } from '../zone';

export interface IEvent {
  id: string;
  sessionId: string;
  deviceId: string | null;
  os: string | null;
  zoneType: ZoneType;
  address: string;
  name: string;
  area: string;
  orgNumber: string;
  zoneId: string;
  distributionZoneId: string;
  enteredAt: Date;
  exitedAt: Date;
  createdAt: Date;
  distributionZone: Zone | null;
  setZone(zone: Zone): void;
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
  distributors: OrgNumberWithName[];
};

export type EventResponseType = {
  id: string;
  sessionId: string;
  deviceId: string | null;
  os: string | null;
  zoneType: ZoneType;
  address: string;
  name: string;
  area: string;
  zoneId: string;
  enteredAt: Date;
  exitedAt: Date;
  createdAt: Date;
  organisation: OrganisationResponse;
  distributionOrganisation: OrganisationResponse | null;
};
