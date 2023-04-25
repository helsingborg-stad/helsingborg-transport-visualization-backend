import { Repository } from 'typeorm';
import { IGeolocation, Geolocation } from '@root/entities';
import { buildRepository } from '@root/services/database';

export interface IGeolocationRepository {
  save: (geolocation: IGeolocation) => Promise<IGeolocation>;
}

export class GeolocationRepository implements IGeolocationRepository {
  constructor(private repo: Repository<IGeolocation> = buildRepository<IGeolocation>(Geolocation)) {}

  async save(geolocation: IGeolocation): Promise<IGeolocation> {
    return this.repo.save(geolocation);
  }
}
