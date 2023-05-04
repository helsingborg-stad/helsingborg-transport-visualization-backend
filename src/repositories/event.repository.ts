import { Repository } from 'typeorm';
import { IEvent, Event, FilterTypeResponse } from '@root/entities';
import { buildRepository } from '@root/services/database';

export interface IEventRepository {
  findUniqueValues: (columns: string[]) => Promise<FilterTypeResponse>;
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
}
