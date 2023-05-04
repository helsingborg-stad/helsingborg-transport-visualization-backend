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
