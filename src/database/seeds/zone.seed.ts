// eslint-disable-next-line import/no-extraneous-dependencies
import { Connection } from 'typeorm';
import { Zone, ZoneType } from '@root/entities';

const buildZones = async (amount: number) => {
  const zonesList = [...Array(amount)].map(async (_, index) => {
    const zone = new Zone(
      {
        type: 'Polygon',
        coordinates: [
          [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0],
            [0, 0],
          ],
        ],
      },
      //replace with a valid organisation's id
      `0cb88b29-10a2-4a2e-b7ac-e83eae04a93d`
    );

    zone.name = `Zone ${index}`;
    zone.address = `Address ${index}`;
    zone.area = `Area ${index}`;
    zone.type = ZoneType.DISTRIBUTION;

    return zone;
  });
  return Promise.all(zonesList);
};

export const zoneSeeder = async (connection: Connection) => {
  const zonesList = await buildZones(10);
  return connection.createQueryBuilder().insert().into(Zone).values(zonesList).execute();
};
