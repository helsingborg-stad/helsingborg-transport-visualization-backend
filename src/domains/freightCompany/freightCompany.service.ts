import { FreightCompany, IFreightCompany } from '@root/entities';
import { IFreightCompanyRepository, FreightCompanyRepository } from '@root/repositories';
import { FreightCompanyCreateType } from './types';

export interface IFreightCompanyService {
  getById(id: number): Promise<IFreightCompany>;
  getList(): Promise<IFreightCompany[]>;
  create(freightCompany: FreightCompanyCreateType): Promise<IFreightCompany>;
}

export class FreightCompanyService implements IFreightCompanyService {
  constructor(private repo: IFreightCompanyRepository = new FreightCompanyRepository()) {}
  async getById(id: number): Promise<IFreightCompany> {
    return this.repo.findById(id);
  }

  async getList(): Promise<IFreightCompany[]> {
    return this.repo.findAll();
  }

  async create(freightCompanyData: FreightCompanyCreateType): Promise<IFreightCompany> {
    const freightCompany = new FreightCompany(freightCompanyData.name);
    return this.repo.save(freightCompany);
  }
}
