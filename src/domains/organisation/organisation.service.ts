import { OrganisationResponse } from '@root/entities';
import { OrganisationRepository, IOrganisationRepository, EventRepository, IEventRepository } from '@root/repositories';
import { UpdateOrganisationBody } from './types';
import StatusError from '@root/utils/statusError';
import { toAuthDTO } from '../auth/auth.dto';

export interface IOrganisationService {
  getAllOrganisations(): Promise<OrganisationResponse[]>;
  deleteOrganisation(id: string, userId: string): Promise<any>;
  updateOrganisation(id: string, userId: string, body: UpdateOrganisationBody): Promise<OrganisationResponse>;
}

export class OrganisationService implements IOrganisationService {
  constructor(
    private orgRepo: IOrganisationRepository = new OrganisationRepository(),
    private eventRepo: IEventRepository = new EventRepository()
  ) {}

  getAllOrganisations(): Promise<OrganisationResponse[]> {
    return this.orgRepo.getAllOrganisations();
  }

  async deleteOrganisation(id: string, userId: string): Promise<any> {
    if (id !== userId) throw new StatusError(401, 'Not authorized');
    const organisation = await this.orgRepo.findById(id);
    if (!organisation) throw new StatusError(404, 'Organisation not found');
    await this.eventRepo.deleteByOrgNumber(organisation.orgNumber);
    return this.orgRepo.deleteOrganisation(id);
  }

  async updateOrganisation(id: string, userId: string, body: UpdateOrganisationBody): Promise<OrganisationResponse> {
    if (id !== userId) throw new StatusError(401, 'Not authorized');
    const organisation = await this.orgRepo.findById(id);
    if (!organisation) throw new StatusError(404, 'Organisation not found');
    if (body.password) await organisation.setPassword(body.password);
    if (body.pinCode) await organisation.setPinCode(body.pinCode);
    if (body.contactPerson) organisation.contactPerson = body.contactPerson;
    if (body.mobileNumber) organisation.mobileNumber = body.mobileNumber;
    if (body.email) organisation.email = body.email;
    return toAuthDTO(await this.orgRepo.save(organisation), true);
  }
}
