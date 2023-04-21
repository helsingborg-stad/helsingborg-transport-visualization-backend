// eslint-disable-next-line import/no-extraneous-dependencies
import { Connection } from 'typeorm';
import { FreightCompany } from '@root/entities';

const buildFreightCompanies = async (amount: number) => {
  const freightCompanyList = [...Array(amount)].map(async (_, index) => {
    const freightCompany = new FreightCompany(`Company-${index}`);
    return freightCompany;
  });
  return Promise.all(freightCompanyList);
};

export const freightCompanySeeder = async (connection: Connection) => {
  const freightCompanyList = await buildFreightCompanies(10);

  return connection.createQueryBuilder().insert().into(FreightCompany).values(freightCompanyList).execute();
};
