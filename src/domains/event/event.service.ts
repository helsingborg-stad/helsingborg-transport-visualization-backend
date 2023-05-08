import { IEvent } from '@root/entities';
import { IEventRepository, EventRepository } from '@root/repositories';
import { FilterQueries } from './types';

export interface IEventService {
  getEvents(filter: FilterQueries): Promise<IEvent[]>;
}

export class EventService implements IEventService {
  constructor(private repo: IEventRepository = new EventRepository()) {}

  async getEvents(filter: FilterQueries): Promise<IEvent[]> {
    return this.repo.filterEvents(filter);
  }
}
