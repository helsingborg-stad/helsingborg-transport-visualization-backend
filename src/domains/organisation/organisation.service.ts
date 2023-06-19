import { OrganisationResponse } from '@root/entities';
import { OrganisationRepository, IOrganisationRepository, EventRepository, IEventRepository } from '@root/repositories';
import StatusError from '@root/utils/statusError';

export interface IOrganisationService {
  getAllOrganisations(): Promise<OrganisationResponse[]>;
  deleteOrganisation(id: string, userId: string): Promise<OrganisationResponse>;
}

export class OrganisationService implements IOrganisationService {
  constructor(
    private orgRepo: IOrganisationRepository = new OrganisationRepository(),
    private eventRepo: IEventRepository = new EventRepository()
  ) {}

  getAllOrganisations(): Promise<OrganisationResponse[]> {
    return this.orgRepo.getAllOrganisations();
  }

  async deleteOrganisation(id: string, userId: string): Promise<OrganisationResponse> {
    if (id !== userId) throw new StatusError(401, 'Not authorized');
    const organisation = await this.orgRepo.findById(id);
    if (!organisation) throw new StatusError(404, 'Organisation not found');
    await this.eventRepo.deleteByOrgNumber(organisation.orgNumber);
    return this.orgRepo.deleteOrganisation(id);
  }
}
