// eslint-disable-next-line import/no-extraneous-dependencies
import { Connection } from 'typeorm';
import { Organisation } from '@root/entities';

const buildOrganisations = async (amount: number) => {
  const orgList = [...Array(amount)].map(async (_, index) => {
    const organisation = new Organisation(`${index}494327521`, `test-${index}@email.com`, `Test-${index} AB`);
    organisation.contactPerson = `Test-${index}`;
    organisation.mobileNumber = `070${index}123456`;
    await organisation.setPassword('Pa$$word00');
    await organisation.setPinCode('123456');
    return organisation;
  });
  return Promise.all(orgList);
};

export const organisationSeeder = async (connection: Connection) => {
  const orgList = await buildOrganisations(10);

  return connection.createQueryBuilder().insert().into(Organisation).values(orgList).execute();
};
