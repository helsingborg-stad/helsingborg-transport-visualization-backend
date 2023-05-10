import { EventResponseType, IEvent, Event } from '@root/entities';
import {
  IEventRepository,
  EventRepository,
  IOrganisationRepository,
  OrganisationRepository,
  IZoneRepository,
  ZoneRepository,
} from '@root/repositories';
import { FilterQueries, CreateEventBody } from './types';
import { toEventDTO } from './event.dto';

export interface IEventService {
  getEvents(filter: FilterQueries): Promise<EventResponseType[]>;
  createEvent(zoneId: string, orgNumber: string, requestBody: CreateEventBody): Promise<IEvent>;
}

export class EventService implements IEventService {
  constructor(
    private repo: IEventRepository = new EventRepository(),
    private organisationRepo: IOrganisationRepository = new OrganisationRepository(),
    private zoneRepo: IZoneRepository = new ZoneRepository()
  ) {}

  async getEvents(filter: FilterQueries): Promise<EventResponseType[]> {
    const events = await this.repo.filterEvents(filter);
    const uniqueOrgNumbers: string[] = [...new Set(events.map((event) => event.orgNumber))];
    const organisations = await this.organisationRepo.findByOrgNumbers(uniqueOrgNumbers);

    return events.map((event) => toEventDTO(event, organisations));
  }

  async createEvent(zoneId: string, orgNumber: string, requestBody: CreateEventBody): Promise<IEvent> {
    const { trackingId, enteredAt, exitedAt, distributionZoneId } = requestBody;
    const zone = await this.zoneRepo.getZoneById(zoneId);
    const newEvent = new Event(trackingId, new Date(enteredAt), new Date(exitedAt));
    newEvent.setZone(zone);
    newEvent.orgNumber = orgNumber;
    newEvent.distributionZoneId = distributionZoneId;
    return this.repo.save(newEvent);
  }
}
