// eslint-disable-next-line import/no-extraneous-dependencies
import { Connection } from 'typeorm';
import { Zone, Organisation, ZoneType } from '@root/entities';

const buildZones = async (amount: number, orgs: Organisation[]) => {
  const orgId = orgs[0].id;
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
      orgId
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
  const orgs = await connection.getRepository(Organisation).find();
  const zonesList = await buildZones(10, orgs);
  return connection.createQueryBuilder().insert().into(Zone).values(zonesList).execute();
};
