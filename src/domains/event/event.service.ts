import { EventResponseType, IEvent, Event, ZoneType } from '@root/entities';
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
import StatusError from '@root/utils/statusError';
import { FileExport } from './fileExport';
import { WorkBook } from 'xlsx';

export interface IEventService {
  getEvents(filter: FilterQueries): Promise<EventResponseType[]>;
  createEvent(zoneId: string, orgNumber: string, os: string, requestBody: CreateEventBody): Promise<IEvent>;
  exportEventsToExcel(events: EventResponseType[]): Promise<WorkBook>;
}

export class EventService implements IEventService {
  constructor(
    private repo: IEventRepository = new EventRepository(),
    private organisationRepo: IOrganisationRepository = new OrganisationRepository(),
    private zoneRepo: IZoneRepository = new ZoneRepository(),
  ) {}

  async getEvents(filter: FilterQueries): Promise<EventResponseType[]> {
    const events = await this.repo.filterEvents(filter);
    const uniqueOrgNumbers: string[] = [...new Set(events.map((event) => event.orgNumber))];
    const organisations = await this.organisationRepo.findByOrgNumbers(uniqueOrgNumbers);

    return events.map((event) => toEventDTO(event, organisations));
  }

  async createEvent(zoneId: string, orgNumber: string, os: string, requestBody: CreateEventBody): Promise<IEvent> {
    const { trackingId, sessionId, deviceId, enteredAt, exitedAt, distributionZoneId } = requestBody;
    const zone = await this.zoneRepo.getZoneById(zoneId);
    if(!zone) {
      throw new StatusError(400, 'Zone not found');
    }
    if (zone.type === ZoneType.DISTRIBUTION && distributionZoneId) {
      throw new StatusError(400, 'Event for distribution zone cannot have distributionZoneId');
    }
    const newEvent = new Event(sessionId ?? trackingId, new Date(enteredAt), new Date(exitedAt));
    newEvent.deviceId = deviceId ?? null;
    newEvent.os = os;
    newEvent.setZone(zone);
    newEvent.orgNumber = orgNumber;
    newEvent.distributionZoneId = distributionZoneId;
    return this.repo.save(newEvent);
  }

  async exportEventsToExcel(events: EventResponseType[]): Promise<WorkBook>{
    const excelFileWriter: FileExport = new FileExport();
    excelFileWriter.setExportFields([
      'sessionId',
      'deviceId',
      'os',
      'zoneType',
      'address',
      'name',
      'area',
      'enteredAt',
      'exitedAt',
      'createdAt',
      'organisation.name',
      'distributionOrganisation.name'
    ]);

    const workBook = await excelFileWriter.exportEventsToExcel(events);
    return workBook;
  }
}
