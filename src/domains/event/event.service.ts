import { EventResponseType } from '@root/entities';
import { IEventRepository, EventRepository, IOrganisationRepository, OrganisationRepository } from '@root/repositories';
import { FilterQueries } from './types';
import { toEventDTO } from './event.dto';

export interface IEventService {
  getEvents(filter: FilterQueries): Promise<EventResponseType[]>;
}

export class EventService implements IEventService {
  constructor(
    private repo: IEventRepository = new EventRepository(),
    private organisationRepo: IOrganisationRepository = new OrganisationRepository()
  ) {}

  async getEvents(filter: FilterQueries): Promise<EventResponseType[]> {
    const events = await this.repo.filterEvents(filter);
    const uniqueOrgNumbers: string[] = [...new Set(events.map((event) => event.orgNumber))];
    const organisations = await this.organisationRepo.findByOrgNumbers(uniqueOrgNumbers);

    return events.map((event) => toEventDTO(event, organisations));
  }
}
