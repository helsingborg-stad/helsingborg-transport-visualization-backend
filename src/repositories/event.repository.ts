import { Repository } from 'typeorm';
import { IEvent, Event, FilterTypeResponse } from '@root/entities';
import { buildRepository } from '@root/services/database';
import { FilterQueries } from '@root/domains/event';

export interface IEventRepository {
  findUniqueValues: (columns: string[]) => Promise<FilterTypeResponse>;
  filterEvents: (filter: FilterQueries) => Promise<IEvent[]>;
  save: (event: IEvent) => Promise<IEvent>;
}

export class EventRepository implements IEventRepository {
  constructor(private repo: Repository<IEvent> = buildRepository<IEvent>(Event)) {}

  async findUniqueValues(columns: string[]): Promise<FilterTypeResponse> {
    const result = await this.repo.createQueryBuilder('event').select(columns).distinct(true).getRawMany();

    const response: FilterTypeResponse = {
      organisations: [],
      names: [],
      areas: [],
      addresses: [],
    };

    result.forEach((row) => {
      if (row.orgNumber) {
        response.organisations.push({
          name: null,
          orgNumber: row.orgNumber,
        });
      }
      if (row.name) {
        response.names.push(row.name);
      }
      if (row.area) {
        response.areas.push(row.area);
      }
      if (row.address) {
        response.addresses.push(row.address);
      }
    });

    return response;
  }

  async filterEvents(filter: FilterQueries): Promise<IEvent[]> {
    const query = this.repo.createQueryBuilder('event');

    if (filter.names) {
      query.andWhere('event.name IN (:...names)', { names: filter.names });
    }

    if (filter.orgNumbers) {
      query.andWhere('event.orgNumber IN (:...orgNumbers)', { orgNumbers: filter.orgNumbers });
    }

    if (filter.areas) {
      query.andWhere('event.area IN (:...areas)', { areas: filter.areas });
    }

    if (filter.weekdays) {
      query.andWhere('EXTRACT(DOW FROM event.enteredAt) IN (:...weekdays)', { weekdays: filter.weekdays });
    }

    query.leftJoinAndSelect('event.distributionZone', 'zone').leftJoinAndSelect('zone.organisation', 'organisation');

    return query.getMany();
  }

  async save(event: IEvent): Promise<IEvent> {
    return this.repo.save(event);
  }
}
