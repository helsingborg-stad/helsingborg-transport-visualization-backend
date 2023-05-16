import { Repository } from 'typeorm';
import { IEvent, Event, FilterTypeResponse } from '@root/entities';
import { buildRepository } from '@root/services/database';
import { FilterQueries } from '@root/domains/event';

export interface IEventRepository {
  findFilterValues: () => Promise<FilterTypeResponse>;
  filterEvents: (filter: FilterQueries) => Promise<IEvent[]>;
  save: (event: IEvent) => Promise<IEvent>;
}

export class EventRepository implements IEventRepository {
  constructor(private repo: Repository<IEvent> = buildRepository<IEvent>(Event)) {}

  async findFilterValues(): Promise<FilterTypeResponse> {
    const [uniqueEventData, uniqueDistributors] = await Promise.all([
      this.repo
        .createQueryBuilder('event')
        .select(['"orgNumber"', 'name', 'area', 'address'])
        .distinct(true)
        .getRawMany(),
      this.repo
        .createQueryBuilder('event')
        .leftJoinAndSelect('event.distributionZone', 'distributionZone')
        .leftJoinAndSelect('distributionZone.organisation', 'distributors')
        .select(['"distributors"."name"', '"distributors"."orgNumber"'])
        .where('"distributors"."orgNumber" IS NOT NULL')
        .distinct(true)
        .getRawMany(),
    ]);

    const response: FilterTypeResponse = {
      organisations: [],
      names: [],
      areas: [],
      addresses: [],
      distributors: uniqueDistributors,
    };

    uniqueEventData.forEach((row) => {
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

    if (filter.organisations) {
      query.andWhere('event.orgNumber IN (:...orgNumbers)', { orgNumbers: filter.organisations });
    }

    if (filter.areas) {
      query.andWhere('event.area IN (:...areas)', { areas: filter.areas });
    }

    if (filter.weekdays) {
      query.andWhere('EXTRACT(DOW FROM event.enteredAt) IN (:...weekdays)', { weekdays: filter.weekdays });
    }

    query.leftJoinAndSelect('event.distributionZone', 'zone').leftJoinAndSelect('zone.organisation', 'organisation');

    if (filter.distributors) {
      query.andWhere('organisation.orgNumber IN (:...orgNumbers)', {
        orgNumbers: filter.distributors,
      });
    }

    query.orderBy('event.exitedAt', 'DESC');
    return query.getMany();
  }

  async save(event: IEvent): Promise<IEvent> {
    return this.repo.save(event);
  }
}
