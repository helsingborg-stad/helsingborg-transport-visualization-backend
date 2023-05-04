// eslint-disable-next-line import/no-extraneous-dependencies
import { Connection } from 'typeorm';
import { Event, ZoneType, Zone, Organisation } from '@root/entities';

const buildEvents = async (amount: number, firstDeliveryZoneIds: Zone[], orgNumbers: Organisation[]) => {
  const firstDeliveryZoneId = firstDeliveryZoneIds[0].id;
  const orgNumber = orgNumbers[0].orgNumber;
  const eventList = [...Array(amount)].map(async (_, index) => {
    const event = new Event(`test-tracking-id-${index}`, orgNumber, ZoneType.DELIVERY, firstDeliveryZoneId);

    event.name = `Event ${index}`;
    event.address = `Address ${index}`;
    event.area = `Area ${index}`;
    event.enteredAt = new Date();
    event.exitedAt = new Date();

    return event;
  });
  return Promise.all(eventList);
};

export const eventSeeder = async (connection: Connection) => {
  const zones = await connection.getRepository(Zone).find({ where: { type: ZoneType.DELIVERY } });
  const orgs = await connection.getRepository(Organisation).find();

  const zonesList = [
    ...(await buildEvents(10, zones, orgs)),
    ...(await buildEvents(10, zones, orgs)),
    ...(await buildEvents(10, zones, orgs)),
    ...(await buildEvents(10, zones, orgs)),
    ...(await buildEvents(10, zones, orgs)),
  ];
  return connection.createQueryBuilder().insert().into(Event).values(zonesList).execute();
};
