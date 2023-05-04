import { FilterTypeResponse } from '@root/entities';
import { IEventRepository, EventRepository, IOrganisationRepository, OrganisationRepository } from '@root/repositories';

export interface IFilterService {
  getUniqueFilterValuesFromEvents(): Promise<FilterTypeResponse>;
}

export class FilterService implements IFilterService {
  constructor(
    private eventRepo: IEventRepository = new EventRepository(),
    private organisationRepo: IOrganisationRepository = new OrganisationRepository()
  ) {}

  async getUniqueFilterValuesFromEvents(): Promise<FilterTypeResponse> {
    const filterResponse: FilterTypeResponse = await this.eventRepo.findUniqueValues([
      '"orgNumber"',
      'name',
      'area',
      'address',
    ]);
    const organisations = await this.organisationRepo.findByOrgNumbers(
      filterResponse.organisations.map((org) => org.orgNumber)
    );

    filterResponse.organisations = organisations.map((org) => ({
      name: org.name,
      orgNumber: org.orgNumber,
    }));

    return filterResponse;
  }
}
