import { Repository, MoreThanOrEqual } from 'typeorm';
import { IOrganisation, Organisation, OrganisationResponse } from '@root/entities';
import { buildRepository } from '@root/services/database';

export interface IOrganisationRepository {
  findByEmail: (email: string) => Promise<IOrganisation | null>;
  findById: (id: string) => Promise<IOrganisation | null>;
  findByIdOrEmail: (identifier: string) => Promise<IOrganisation | null>;
  findByForgotPasswordToken: (token: string) => Promise<IOrganisation | null>;
  save: (organisation: IOrganisation) => Promise<IOrganisation>;
  getAllOrganisations: () => Promise<OrganisationResponse[]>;
}

export class OrganisationRepository implements IOrganisationRepository {
  constructor(private repo: Repository<IOrganisation> = buildRepository<IOrganisation>(Organisation)) {}

  async findByEmail(email: string): Promise<IOrganisation | null> {
    return this.repo.findOne({
      where: { email: email.toLowerCase() },
    });
  }

  async findById(id: string): Promise<IOrganisation | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByIdOrEmail(identifier: string): Promise<IOrganisation | null> {
    return this.repo.findOne({
      where: [{ id: identifier }, { email: identifier.toLowerCase() }],
    });
  }

  async save(organisation: IOrganisation): Promise<IOrganisation> {
    return this.repo.save(organisation);
  }

  async getAllOrganisations(): Promise<OrganisationResponse[]> {
    return this.repo.find({
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });
  }

  async findByForgotPasswordToken(token: string): Promise<IOrganisation | null> {
    return this.repo.findOne({
      where: {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiration: MoreThanOrEqual(new Date()),
      },
    });
  }
}
