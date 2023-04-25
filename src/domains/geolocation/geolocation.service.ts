import { GeolocationCreateType } from './types';
import { IGeolocationRepository, GeolocationRepository } from '@root/repositories';
import { IGeolocation, Geolocation } from '@root/entities';

export interface IGeolocationService {
  createGeolocation: (userId: number, geolocation: GeolocationCreateType) => Promise<IGeolocation>;
}
export class GeolocationService implements IGeolocationService {
  constructor(private repo: IGeolocationRepository = new GeolocationRepository()) {}

  createGeolocation(userId: number, geolocation: GeolocationCreateType): Promise<IGeolocation> {
    const geolocationEntity = new Geolocation(geolocation.latitude, geolocation.longitude, geolocation.heading);
    geolocationEntity.userId = userId;
    geolocationEntity.registeredAt = geolocation.registeredAt;
    return this.repo.save(geolocationEntity);
  }
}
