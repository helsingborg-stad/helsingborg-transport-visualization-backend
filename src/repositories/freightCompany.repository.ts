import { IFreightCompany, FreightCompany } from '@root/entities';
import { buildRepository } from '@root/services/database';
import { Repository } from 'typeorm';

export interface IFreightCompanyRepository {
  save(freightCompany: IFreightCompany): Promise<IFreightCompany>;
  findById(id: number): Promise<IFreightCompany | null>;
  findAll(): Promise<IFreightCompany[]>;
}

export class FreightCompanyRepository implements IFreightCompanyRepository {
  constructor(private repo: Repository<IFreightCompany> = buildRepository<IFreightCompany>(FreightCompany)) {}
  async save(freightCompany: IFreightCompany): Promise<IFreightCompany> {
    return this.repo.save(freightCompany);
  }

  async findById(id: number): Promise<IFreightCompany | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findAll(): Promise<IFreightCompany[]> {
    return this.repo.find();
  }
}
