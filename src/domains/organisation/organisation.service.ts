import { OrganisationResponse } from '@root/entities';
import { OrganisationRepository, IOrganisationRepository } from '@root/repositories';

export interface IOrganisationService {
  getAllOrganisations(): Promise<OrganisationResponse[]>;
}

export class OrganisationService implements IOrganisationService {
  constructor(private orgRepo: IOrganisationRepository = new OrganisationRepository()) {}

  getAllOrganisations(): Promise<OrganisationResponse[]> {
    return this.orgRepo.getAllOrganisations();
  }
}
