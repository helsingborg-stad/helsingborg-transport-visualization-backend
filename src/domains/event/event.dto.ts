import { EventResponseType, IEvent, IOrganisation } from '@root/entities';

export const toEventDTO = (event: IEvent, Organisations: IOrganisation[]): EventResponseType => {
  const org = Organisations.find((org) => org.orgNumber === event.orgNumber);
  return {
    id: event.id,
    trackingId: event.trackingId,
    zoneType: event.zoneType,
    address: event.address,
    name: event.name,
    area: event.area,
    zoneId: event.zoneId,
    enteredAt: event.enteredAt,
    exitedAt: event.exitedAt,
    createdAt: event.createdAt,
    organisation: {
      id: org.id,
      orgNumber: org.orgNumber,
      email: org.email,
      name: org.name,
      mobileNumber: org.mobileNumber,
      contactPerson: org.contactPerson,
      createdAt: org.createdAt,
      updatedAt: org.updatedAt,
    },
  };
};