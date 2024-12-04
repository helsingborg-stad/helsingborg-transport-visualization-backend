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
import { FileImport } from './fileImport';

export interface IEventService {
  getEvents(filter: FilterQueries, orgId: string): Promise<EventResponseType[]>;
  createEvent(zoneId: string, orgNumber: string, os: string, requestBody: CreateEventBody): Promise<IEvent>;
  importEventsFromExcel(fileBuffer: Buffer): Promise<IEvent[]>;
  exportEventsToExcel(events: EventResponseType[]): Promise<WorkBook>;
  getGroupedEvents(filter: FilterQueries, orgId: string): Promise<EventResponseType[][]>;
  validateImportPassword(password: string): void;
}

export class EventService implements IEventService {
  constructor(
    private repo: IEventRepository = new EventRepository(),
    private organisationRepo: IOrganisationRepository = new OrganisationRepository(),
    private zoneRepo: IZoneRepository = new ZoneRepository(),
  ) { }

  async getEvents(filter: FilterQueries, orgId: string): Promise<EventResponseType[]> {
    let events = await this.repo.filterEvents(filter);
    const uniqueOrgNumbers: string[] = [...new Set(events.map((event) => event.orgNumber))];
    const organisations = await this.organisationRepo.findByOrgNumbers(uniqueOrgNumbers);
    const currentOrg = await this.organisationRepo.findById(orgId);
    if (!currentOrg.isPublic) {
      events = events.filter((event) => event.orgNumber === currentOrg.orgNumber);
    } else {
      // remove all events that are private
      events = events.filter((event) => {
        const org = organisations.find((org) => org.orgNumber === event.orgNumber);
        return org.isPublic;
      });
    }

    return events.map((event) => toEventDTO(event, organisations));
  }

  async getGroupedEvents(filter: FilterQueries, orgId: string): Promise<EventResponseType[][]> {
    let events = await this.repo.filterEvents(filter);
    const uniqueOrgNumbers: string[] = [...new Set(events.map((event) => event.orgNumber))];
    const organisations = await this.organisationRepo.findByOrgNumbers(uniqueOrgNumbers);
    const currentOrg = await this.organisationRepo.findById(orgId);
    if (!currentOrg.isPublic) {
      events = events.filter((event) => event.orgNumber === currentOrg.orgNumber);
    } else {
      // remove all events that are private
      events = events.filter((event) => {
        const org = organisations.find((org) => org.orgNumber === event.orgNumber);
        return org.isPublic;
      });
    }
    
    const groupedEvents = events.reduce((grouped, event) => {
      const key = event.sessionId;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(toEventDTO(event, organisations));
      return grouped;
    }, {});

    return Object.values(groupedEvents);
  }

  async createEvent(zoneId: string, orgNumber: string, os: string, requestBody: CreateEventBody): Promise<IEvent> {
    const { trackingId, sessionId, deviceId, enteredAt, exitedAt, distributionZoneId } = requestBody;
    const zone = await this.zoneRepo.getZoneById(zoneId);
    if (!zone) {
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

  async importEventsFromExcel(fileBuffer: Buffer): Promise<IEvent[]> {
    const excelFileReader: FileImport = new FileImport(
      fileBuffer,
      {
        headerRow: 0,
        dataRangeStart: 1,
      }
    );
    const rows = await excelFileReader.getRows();
    const events: IEvent[] = [];
    const errors: {
      row: number;
      message: string;
    }[] = [];
    for (const row of rows) {
      if(!row.sessionId || row.sessionId === '') {
        errors.push({ row: rows.indexOf(row) + 1, message: `"Leverans med" saknas` });
      }
      if (!row.time || row.time === '') {
        errors.push({ row: rows.indexOf(row) + 1, message: `"Tidpunkt" saknas` });
      } else if (isNaN(Date.parse(row.time))) {
        errors.push({ row: rows.indexOf(row) + 1, message: `"Tidpunkt" är inte ett giltigt datum och tid` });
      }
      const newEvent = new Event(row.sessionId, new Date(row.time), new Date(row.time));
      const org = await this.organisationRepo.findByOrgNumber(row.orgNumber);
      if(!org) {
        errors.push({ row: rows.indexOf(row) + 1, message: `Organisationsnummer "${row.orgNumber}" hittades inte` });
      }
      newEvent.orgNumber = row.orgNumber;
      const zone = await this.zoneRepo.getZoneByGln(row.gln);
      if (!zone) {
        errors.push({ row: rows.indexOf(row) + 1, message: `Zon "${row.gln}" hittades inte` });
      } else {
        newEvent.setZone(zone);
        if (!(await this.repo.findEvent(newEvent.enteredAt, newEvent.orgNumber, zone.id))) {
          events.push(newEvent);
        } else {
          errors.push({ row: rows.indexOf(row) + 1, message: `Leverans existerar redan med "${row.orgNumber}" med tidpunkt "${row.time}"` });
        }
      }
    }

    if(errors.length > 0) {
      throw new StatusError(400, errors.map((error) => `rad ${error.row}: ${error.message}`).join('|'));
    }

    //@ts-ignore
    return await this.repo.save(events);
  }


  async exportEventsToExcel(events: EventResponseType[]): Promise<WorkBook> {
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

  validateImportPassword(password: string): void {
    if (password !== process.env.IMPORT_PASSWORD) {
      throw new StatusError(401, 'Unauthorized');
    }
  }
}
